FROM node:22-alpine AS builder
WORKDIR /app

# Instalar turbo globalmente
RUN npm install -g turbo

# Copiar todo o monorepo
COPY . .

# Instalar dependências completas para o build
RUN npm ci

# Fazer o build do projeto api
RUN turbo run build --filter=@autoequity/api

# Limpar as dependências de desenvolvimento para deixar a imagem mais leve
RUN npm ci --omit=dev && npm cache clean --force

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copiar os arquivos compilados e os node_modules (somente produção)
COPY --from=builder /app .

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost:3000/health || exit 1

WORKDIR /app/apps/api
CMD ["node", "dist/main"]
