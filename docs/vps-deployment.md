# Guia de Deploy VPS — AutoEquity Apex Capital

Este documento descreve o processo recomendado para implantar o backend (NestJS), banco de dados (PostgreSQL) e cache (Redis) em uma VPS (Virtual Private Server) utilizando Ubuntu 22.04/24.04.

---

## 1. Pré-requisitos

1. Uma VPS com **Ubuntu 22.04 LTS ou 24.04 LTS** (Mínimo recomendado: 2 vCPUs, 4GB RAM).
2. Acesso SSH via terminal à VPS como `root` ou usuário com privilégios `sudo`.
3. Um **domínio** (ex: `api.driveiin.com.br`) apontando para o IP público da sua VPS (Registro A no seu provedor de DNS).

## 2. Preparando o Servidor (Script Automático)

Acesse sua VPS via SSH e execute os comandos abaixo para atualizar o sistema e instalar o Docker, Docker Compose, Nginx e Certbot (para certificados SSL grátis).

```bash
# 1. Atualizar pacotes
sudo apt update && sudo apt upgrade -y

# 2. Instalar dependências básicas, Nginx e Certbot
sudo apt install -y curl git ufw nginx certbot python3-certbot-nginx

# 3. Instalar o Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 4. Configurar firewall (UFW)
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

## 3. Clonando o Projeto e Configurando Variáveis

Crie um diretório para a aplicação e baixe o código fonte:

```bash
mkdir -p /var/www/autoequity
cd /var/www/autoequity

# (Se o código estiver no GitHub, faça o git clone aqui)
# git clone https://github.com/seu-usuario/autoequity.git .

# Copie o arquivo de exemplo das variáveis de ambiente para a API
cp apps/api/.env.example apps/api/.env

# Edite o arquivo .env (especialmente senhas e chaves)
nano apps/api/.env
```

**⚠️ Importante no `.env` de Produção:**
- Mude `NODE_ENV=production`.
- Defina `DB_PASS`, `REDIS_PASSWORD`, `JWT_SECRET` e `JWT_REFRESH_SECRET` para valores fortes.
- Configure `CORS_ORIGINS` com os domínios finais do app web (ex: `https://admin.driveiin.com.br`).

## 4. Iniciando os Serviços com Docker Compose

O projeto já possui um `docker-compose.yml` otimizado na raiz. Ele irá criar 3 containers:
1. `apex_postgres`: Banco de dados relacional.
2. `apex_redis`: Cache e mensageria.
3. `apex_api`: A nossa API NestJS (que será buildada usando o Dockerfile otimizado que criamos).

Na raiz do projeto (`/var/www/autoequity`), execute:

```bash
# Iniciar a compilação (build) da API e subir todos os serviços em background (-d)
docker compose up --build -d

# Verifique se todos estão rodando
docker compose ps
```

Se precisar visualizar os logs da API em tempo real:
```bash
docker compose logs -f api
```

## 5. Configurando o Nginx (Reverse Proxy)

Para que a API fique acessível via porta 80/443 e não a 3000, precisamos do Nginx.

Crie um arquivo de configuração para o seu domínio:
```bash
sudo nano /etc/nginx/sites-available/api.driveiin.com.br
```

Cole o seguinte conteúdo (lembre-se de alterar o `server_name` para o seu domínio real):

```nginx
server {
    listen 80;
    server_name api.driveiin.com.br;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ative a configuração e reinicie o Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/api.driveiin.com.br /etc/nginx/sites-enabled/
sudo nginx -t   # Deve dizer "syntax is ok"
sudo systemctl restart nginx
```

## 6. Habilitando HTTPS / SSL (Certbot)

Com o DNS já propagado, gere o certificado SSL gratuito da Let's Encrypt:

```bash
sudo certbot --nginx -d api.driveiin.com.br
```

O Certbot fará perguntas simples (seu e-mail) e configurará automaticamente o redirecionamento de HTTP para HTTPS no Nginx.

## 7. Migrações do Banco de Dados

Como não deixamos o TypeORM em modo de sincronização automática no ambiente de produção (`DB_SYNC=false`), você precisa rodar as migrações ou forçar a criação das tabelas na primeira vez.

Com os containers rodando, acesse o container da API e rode o script:

```bash
# Entrar no container da API
docker exec -it apex_api sh

# Gerar as tabelas (Se já tiver uma migration escrita, rode: npm run migration:run)
# Como estamos usando TypeORM com entities mapeadas e queremos forçar a criação na primeira vez:
npm run typeorm -- schema:sync -d src/database/data-source.ts
```

## ✅ Pronto!

Sua API do AutoEquity Apex Capital estará disponível segura e publicamente em `https://api.driveiin.com.br/api/v1`. Os WebSockets também funcionarão perfeitamente devido às headers de `Upgrade` configuradas no Nginx!

