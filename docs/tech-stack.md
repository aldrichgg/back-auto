# Stack Tecnológica — AutoEquity Apex Capital

> Decisões arquiteturais e justificativas para o sistema AutoEquity. Sistema robusto, escalável e regulamentado CVM 175.

---

## Visão Geral da Stack

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                        │
│  React Native (Expo) — Mobile iOS & Android             │
│  Next.js 15 (App Router) — Web Dashboard (Backoffice)   │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                      API LAYER                          │
│  NestJS 11 — REST API + WebSockets (Socket.io)          │
│  GraphQL (Apollo) — Consultas complexas de portfólio    │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                    SERVICE LAYER                        │
│  PostgreSQL 16 — Dados transacionais e regulatórios     │
│  Redis 7 — Cache, sessões, pub/sub de preços            │
│  ClickHouse — Analytics de telemetria e preços          │
│  S3 / GCS — Documentos KYC, contratos, fotos           │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                 BLOCKCHAIN / CUSTODY                    │
│  Hyperledger Fabric — Smart contracts de custódia       │
│  Tokenização ERC-3643 (Permissioned) — Cotas digitais   │
└─────────────────────────────────────────────────────────┘
```

---

## Frontend — Mobile (Principal)

### React Native + Expo SDK 52
**Justificativa:** Mobile-first conforme design (390px canvas). Expo permite build nativo iOS + Android com hot reload e EAS Build para CI/CD.

**Bibliotecas essenciais:**

| Pacote | Versão | Propósito |
|--------|--------|-----------|
| `expo` | ~52.x | Runtime e ferramentas |
| `expo-router` | ~4.x | Navegação baseada em arquivos |
| `react-native-reanimated` | ~3.x | Animações de 60fps |
| `react-native-gesture-handler` | ~2.x | Gestos nativos (swipe, pinch) |
| `react-native-skia` | ~1.x | Canvas para gráficos financeiros (candlestick, sparklines) |
| `react-native-mmkv` | ~3.x | Storage persistente de alta performance |
| `zustand` | ^5.x | Estado global leve |
| `@tanstack/react-query` | ^5.x | Cache e sync de dados do servidor |
| `socket.io-client` | ^4.x | Preços em tempo real |
| `react-hook-form` | ^7.x | Formulários (KYC, ordem de compra) |
| `zod` | ^3.x | Validação de schemas |
| `expo-local-authentication` | ~14.x | Biometria Face ID / Touch ID |
| `expo-secure-store` | ~13.x | Armazenamento seguro de tokens |
| `victory-native` | ^41.x | Gráficos alternativos (fallback) |

**Fontes:**
```bash
npx expo install expo-font @expo-google-fonts/chivo @expo-google-fonts/jetbrains-mono @expo-google-fonts/plus-jakarta-sans
```

---

## Frontend — Web (Backoffice/Admin)

### Next.js 15 (App Router) + TypeScript
**Justificativa:** Dashboard administrativo e área regulatória com SSR para SEO de páginas públicas e RSC para performance.

| Pacote | Propósito |
|--------|-----------|
| `next` ^15 | Framework full-stack |
| `tailwindcss` ^4 | Styling com design tokens do sistema |
| `shadcn/ui` | Componentes UI acessíveis |
| `recharts` | Gráficos do backoffice |
| `@tanstack/react-query` | Data fetching |
| `next-auth` ^5 | Autenticação (OAuth + Credentials) |

---

## Backend — API Principal

### NestJS 11 + TypeScript
**Justificativa:** Arquitetura modular, DI nativa, guards e interceptors para autorização granular (CVM compliance).

**Estrutura de módulos:**

```
src/
├── auth/           # JWT, refresh tokens, MFA, biometria
├── users/          # Perfil de membro, KYC, tier
├── assets/         # Ativos automotivos, proveniência
├── portfolio/      # Custódia, cotas por membro
├── marketplace/    # IPOs, listagens primárias
├── trading/        # Mercado secundário, order book
├── custody/        # Integração com blockchain e cofres físicos
├── concierge/      # Serviços premium, solicitações
├── payments/       # Depósitos PIX/TED, saques
├── notifications/  # Push, email, SMS, WebSocket
├── compliance/     # CVM 175, relatórios, auditoria
└── admin/          # Backoffice administrativo
```

**Bibliotecas principais:**

| Pacote | Propósito |
|--------|-----------|
| `@nestjs/core` | Core NestJS |
| `@nestjs/jwt` | JWT access/refresh tokens |
| `@nestjs/passport` | Estratégias de autenticação |
| `@nestjs/websockets` | WebSockets para preços em tempo real |
| `@nestjs/graphql` | GraphQL endpoint |
| `apollo-server-express` | Apollo Server |
| `typeorm` | ORM para PostgreSQL |
| `pg` | Driver PostgreSQL |
| `ioredis` | Cliente Redis |
| `bullmq` | Filas de jobs (KYC, e-mails, relatórios) |
| `@aws-sdk/client-s3` | Upload de documentos |
| `nodemailer` | Envio de e-mails transacionais |
| `twilio` | SMS para 2FA/OTP |
| `bcrypt` | Hash de senhas |
| `speakeasy` | TOTP para autenticação 2FA |
| `class-validator` | Validação de DTOs |
| `class-transformer` | Serialização de entidades |
| `helmet` | Headers de segurança HTTP |
| `rate-limiter-flexible` | Rate limiting por rota |

---

## Banco de Dados

### PostgreSQL 16 (Primário)
- Dados transacionais, usuários, ativos, ordens, contratos
- Extensão `uuid-ossp` para IDs
- Extensão `pgcrypto` para criptografia em repouso
- Row Level Security (RLS) para isolamento de dados por membro
- Backups automáticos point-in-time

### Redis 7 (Cache & Pub/Sub)
- Cache de sessões JWT
- Cache de preços de mercado (TTL: 5s)
- Pub/Sub para WebSocket de tickers em tempo real
- Rate limiting e throttling
- Job queues (via BullMQ)

### ClickHouse (Analytics)
- Série temporal de preços de ativos
- Histórico de transações para gráficos
- Logs de auditoria de compliance
- Relatórios CVM 175

---

## Autenticação & Segurança

### Fluxo de Auth
```
Membro → [E-mail/ID + Senha] → bcrypt verify → JWT (15min) + Refresh (30d)
                                              → TOTP/Biometria (MFA)
                                              → Apex Key™ Sentinel (ED25519)
```

### Tokens & Criptografia
- **Access Token:** JWT RS256, expiração 15 minutos
- **Refresh Token:** UUID v7, rotação a cada uso, armazenado em httpOnly cookie
- **Senhas:** bcrypt (rounds: 12)
- **2FA:** TOTP (RFC 6238) via Authenticator ou SMS OTP
- **Biometria:** expo-local-authentication + secure-store (chave local, nunca sai do dispositivo)
- **Criptografia em repouso:** AES-256-GCM para documentos KYC
- **Criptografia em trânsito:** TLS 1.3 obrigatório

---

## Blockchain & Tokenização

### Hyperledger Fabric
- Smart contracts (chaincode) para registro imutável de custódia
- Cada transferência de fração registrada on-chain
- Auditoria regulatória completa

### ERC-3643 (Permissioned Token Standard)
- Padrão de segurança digital com whitelist de investidores (KYC on-chain)
- Conformidade com regulamentação de valores mobiliários
- Cada cota = 1 token permissionado

---

## Infraestrutura & DevOps

### Cloud: Google Cloud Platform (GCP)
| Serviço | Uso |
|---------|-----|
| GKE (Kubernetes) | Deploy dos serviços NestJS e Next.js |
| Cloud SQL | PostgreSQL gerenciado |
| Memorystore | Redis gerenciado |
| Cloud Storage | Documentos KYC e fotos de ativos |
| Cloud CDN | Assets de mídia (fotos dos carros) |
| Cloud Armor | WAF e proteção DDoS |
| Firebase Cloud Messaging | Push notifications mobile |
| Cloud Build | CI/CD pipeline |
| Secret Manager | Gerenciamento de secrets |

### Containerização
```dockerfile
# Exemplo: NestJS API
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### CI/CD
- **GitHub Actions** para testes e lint em PRs
- **Cloud Build** para build e push de imagens Docker
- **ArgoCD** para GitOps deploy no GKE
- Ambientes: `development` | `staging` | `production`

---

## Pagamentos

### PIX (Banco Central do Brasil)
- Integração via **Celcoin** ou **Juno** (Conductor)
- QR Code dinâmico para aportes
- Webhook de confirmação de pagamento

### TED
- Integração bancária via DICT para validação de chave
- Comprovante automático por e-mail

### Plataforma de Gestão de Ativos
- Integração com **B3** para registro de CRA/CRI (futuro)
- Integração com **escriturador CVM** para tokens ERC-3643

---

## Monitoramento & Observabilidade

| Ferramenta | Uso |
|-----------|-----|
| **Datadog** | APM, logs, métricas, alertas |
| **Sentry** | Error tracking (frontend e backend) |
| **Grafana** | Dashboards de métricas de negócio |
| **PagerDuty** | On-call e incidentes críticos |
| **Uptime Robot** | Health checks externos |

---

## Compliance & Regulatório

### CVM 175
- Limite de investidor qualificado: R$ 1M em ativos financeiros ou certificado CGA/CFP
- Relatórios mensais de custódia
- Segregação patrimonial (SPE por ativo)
- DARF automático para IR sobre ganho de capital

### LGPD
- Consentimento explícito no cadastro
- Direito ao esquecimento implementado
- DPO (Data Protection Officer) designado
- Criptografia de dados pessoais em repouso

### Anti-Lavagem de Dinheiro (AML)
- Monitoramento de transações acima de R$ 10.000
- Integração com **COAF** para reportes obrigatórios
- KYC reforçado (PEP screening, OFAC, BACEN)
