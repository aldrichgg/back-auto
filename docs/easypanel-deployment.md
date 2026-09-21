# Guia de Deploy VPS com Easypanel — AutoEquity Apex Capital

O **Easypanel** é um painel de controle incrível (baseado em Docker) que simplifica a implantação de aplicativos, gerencia SSL automaticamente e possui templates prontos para bancos de dados. 

Como o nosso projeto já possui um `Dockerfile` e utiliza PostgreSQL e Redis, o deploy pelo Easypanel será muito fluido.

---

## 1. Configurando o Projeto e Banco de Dados

1. Acesse o painel do seu Easypanel.
2. Na aba **Projects**, crie um novo projeto (ex: `autoequity`).
3. Entre no projeto criado.

### Criando o PostgreSQL
1. Clique no botão **"+ Service"** e escolha a aba **Templates**.
2. Busque por **PostgreSQL** e clique em criar.
3. Nas configurações do serviço criado (aba **Env**), você verá as credenciais geradas automaticamente pelo Easypanel (como `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`). **Copie e guarde essas credenciais.**

### Criando o Redis
1. Volte ao projeto, clique em **"+ Service"** -> **Templates**.
2. Busque por **Redis** e clique em criar.
3. A senha do Redis também será gerada automaticamente na aba **Env** (geralmente como `REDIS_PASSWORD`). **Copie e guarde essa senha.**

*(Dica: Serviços dentro do mesmo projeto no Easypanel podem se comunicar via nome do serviço. Se o nome do serviço PostgreSQL for `autoequity-db`, este será o host).*

---

## 2. Implantando a API (NestJS)

1. No seu projeto do Easypanel, clique em **"+ Service"** -> aba **App** (este é um serviço genérico para código).
2. Dê um nome para a aplicação (ex: `api`).

### Configurando o Código Fonte (Source)
Na aba **Source**:
- Conecte o repositório do **GitHub / GitLab** onde o código da AutoEquity está hospedado.
- Selecione o branch que deseja colocar em produção (ex: `main` ou `master`).

### Configurando a Build
Na aba **Build**:
- O Easypanel suporta Nixpacks, Heroku Buildpacks e Dockerfile. Como o nosso monorepo usa Turborepo, vamos usar o Dockerfile que já criamos e é focado em produção.
- Selecione a opção **Dockerfile**.
- **Dockerfile Path:** `apps/api/Dockerfile` *(Isso é muito importante, informa ao Easypanel onde está o arquivo no monorepo).*

### Configurando as Variáveis de Ambiente (Env)
Na aba **Env**, cole as variáveis que a API precisa para funcionar. Atualize os valores do banco de dados com os que você copiou no passo 1.

```env
NODE_ENV=production
PORT=3000
API_PREFIX=api/v1
CORS_ORIGINS=https://admin.apexcapital.com.br,https://app.apexcapital.com.br

# Banco de Dados (Use o nome do serviço Postgres criado no Easypanel como Host)
DB_HOST=nome_do_servico_postgres
DB_PORT=5432
DB_USER=seu_usuario_gerado
DB_PASS=sua_senha_gerada
DB_NAME=seu_db_gerado
DB_SYNC=false
DB_LOGGING=false

# Redis (Use o nome do serviço Redis criado no Easypanel como Host)
REDIS_HOST=nome_do_servico_redis
REDIS_PORT=6379
REDIS_PASSWORD=sua_senha_gerada
REDIS_DB=0

# Segurança (Gere chaves seguras para produção)
JWT_SECRET=super_chave_segura_jwt_secreta_aqui_64_bytes
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=super_chave_segura_refresh_aqui_64_bytes
JWT_REFRESH_EXPIRES_IN=30d
BCRYPT_ROUNDS=12
```

### Configurando os Domínios (Domains)
Na aba **Domains**:
- Adicione o domínio que você quer usar na API (ex: `api.apexcapital.com.br`).
- Aponte o registro **A** ou **CNAME** no provedor do seu domínio (Cloudflare, Registro.br, etc.) para o IP da sua VPS.
- Marque a opção **"Issue Let's Encrypt Certificate"** para gerar o SSL automaticamente.
- Defina o **Port** como `3000` (que é a porta exposta pelo nosso Dockerfile).

### Realizando o Deploy
Com tudo configurado, clique no botão azul **Deploy** no canto superior direito da tela do serviço `api`.
O Easypanel fará o clone do monorepo, rodará o Dockerfile em *multi-stage* e levantará a aplicação! Você pode acompanhar o progresso na aba **Deployments** clicando em **Logs**.

---

## 3. Rodando as Migrations (Primeira vez)

Como desativamos o `DB_SYNC` para não criar tabelas automaticamente no banco de produção por segurança, precisamos instruir o TypeORM a criar a estrutura do esquema na primeira vez.

Com o deploy da `api` bem-sucedido e o serviço rodando:
1. No serviço `api` dentro do Easypanel, vá até a aba **Console**.
2. Essa aba abre um terminal root diretamente dentro do container Docker rodando a aplicação.
3. No terminal aberto, digite o seguinte comando e aperte *Enter*:

```bash
npm run typeorm -- schema:sync -d src/database/data-source.ts
```

Se o banco de dados foi configurado corretamente, o TypeORM irá conectar no PostgreSQL e criar as tabelas `users`, `assets`, `holdings`, `orders`, `transactions`, etc.

## ✅ Conclusão

Sua API da AutoEquity Apex Capital já deve estar acessível de forma segura, respondendo via HTTPS em `https://api.apexcapital.com.br/api/v1/health`. 

Toda vez que você enviar um código novo para a branch do GitHub, o Easypanel (se estiver configurado com Webhooks) fará o rebuild e deploy do novo código com *Zero Downtime*.
