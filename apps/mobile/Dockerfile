FROM node:22-alpine AS builder
# Necessário para algumas dependências
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalar turbo globalmente
RUN npm install -g turbo

# Copiar todo o monorepo
COPY . .

# Instalar dependências completas
RUN npm ci

# Fazer o build apenas do aplicativo principal (Mobile para Web)
RUN turbo run build --filter=mobile

# Estágio de produção usando Nginx para servir os arquivos estáticos
FROM nginx:alpine AS runner

# Remover as configurações default do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar os arquivos construídos do Expo Web (normalmente gerados na pasta dist)
COPY --from=builder /app/apps/mobile/dist /usr/share/nginx/html

# Adicionar configuração do Nginx para roteamento do React/Expo Router
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# A porta padrão do nginx no alpine é 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
