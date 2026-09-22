FROM node:22-alpine AS builder
# Necessário para algumas dependências do Next.js / node-gyp
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalar turbo globalmente
RUN npm install -g turbo

# Copiar todo o monorepo
COPY . .

# Instalar dependências completas
RUN npm ci

# Fazer o build apenas do painel web
RUN turbo run build --filter=@autoequity/web

# Extrair a versão standalone leve
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Utiliza a porta 3001, pois a API já roda na 3000
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

# Criar usuário não root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar os arquivos estáticos
COPY --from=builder /app/apps/web/public ./apps/web/public

# Copiar os artefatos standalone
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3001

# Comando para rodar o Next.js no modo standalone
CMD ["node", "apps/web/server.js"]
