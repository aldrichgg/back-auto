# Arquitetura do Sistema — AutoEquity Apex Capital

---

## Estrutura de Monorepo

```
autoequity/
├── README.md
├── package.json                  # Workspaces root
├── turbo.json                    # Turborepo config
├── .github/
│   └── workflows/
│       ├── ci.yml                # Tests & lint em PRs
│       └── deploy.yml            # Deploy automático
│
├── apps/
│   ├── mobile/                   # React Native (Expo)
│   │   ├── app/                  # expo-router: arquivo = rota
│   │   │   ├── (auth)/
│   │   │   │   ├── login.tsx         # /login
│   │   │   │   └── cadastro.tsx      # /cadastro
│   │   │   ├── (main)/
│   │   │   │   ├── _layout.tsx       # Bottom tab navigator
│   │   │   │   ├── garagem/
│   │   │   │   │   ├── index.tsx     # /garagem (marketplace)
│   │   │   │   │   └── [id].tsx      # /garagem/ativos/:id
│   │   │   │   ├── portfolio.tsx     # /portfolio
│   │   │   │   ├── mercado.tsx       # /mercado
│   │   │   │   ├── deposito.tsx      # /deposito
│   │   │   │   ├── perfil.tsx        # /perfil
│   │   │   │   └── concierge.tsx     # /concierge
│   │   │   └── _layout.tsx           # Root layout
│   │   ├── components/
│   │   │   ├── ui/                   # Design System components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── ProgressBar.tsx
│   │   │   │   └── Typography.tsx
│   │   │   ├── assets/               # Componentes específicos de ativo
│   │   │   │   ├── AssetCard.tsx
│   │   │   │   ├── AssetGallery.tsx
│   │   │   │   ├── ProvenanceTimeline.tsx
│   │   │   │   └── CaptacaoProgress.tsx
│   │   │   ├── portfolio/
│   │   │   │   ├── EquityHeroCard.tsx
│   │   │   │   ├── SparklineChart.tsx
│   │   │   │   └── HoldingItem.tsx
│   │   │   ├── trading/
│   │   │   │   ├── OrderBook.tsx
│   │   │   │   ├── CandlestickChart.tsx
│   │   │   │   └── OrderForm.tsx
│   │   │   └── navigation/
│   │   │       ├── BottomTabBar.tsx
│   │   │       └── Header.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── usePortfolio.ts
│   │   │   ├── useMarketData.ts
│   │   │   └── useWebSocket.ts
│   │   ├── stores/
│   │   │   ├── authStore.ts          # Zustand: autenticação
│   │   │   ├── portfolioStore.ts     # Zustand: portfólio
│   │   │   └── marketStore.ts        # Zustand: dados de mercado
│   │   ├── services/
│   │   │   ├── api.ts                # Axios client configurado
│   │   │   ├── auth.service.ts
│   │   │   ├── assets.service.ts
│   │   │   ├── portfolio.service.ts
│   │   │   └── trading.service.ts
│   │   ├── constants/
│   │   │   ├── colors.ts             # Tokens de cor do design system
│   │   │   ├── typography.ts         # Estilos de tipografia
│   │   │   └── spacing.ts            # Tokens de espaçamento
│   │   └── utils/
│   │       ├── currency.ts           # Formatação BRL/USD
│   │       ├── date.ts               # Formatação de datas
│   │       └── validators.ts         # CPF, CNPJ, VIN
│   │
│   ├── web/                          # Next.js 15 (Backoffice)
│   │   ├── app/
│   │   │   ├── (admin)/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── ativos/
│   │   │   │   ├── membros/
│   │   │   │   ├── compliance/
│   │   │   │   └── relatorios/
│   │   │   └── (auth)/
│   │   └── components/
│   │
│   └── api/                          # NestJS 11
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── auth/
│       │   │   ├── auth.module.ts
│       │   │   ├── auth.service.ts
│       │   │   ├── auth.controller.ts
│       │   │   ├── strategies/
│       │   │   │   ├── jwt.strategy.ts
│       │   │   │   └── local.strategy.ts
│       │   │   ├── guards/
│       │   │   │   ├── jwt-auth.guard.ts
│       │   │   │   ├── roles.guard.ts
│       │   │   │   └── mfa.guard.ts
│       │   │   └── dto/
│       │   │       ├── login.dto.ts
│       │   │       └── register.dto.ts
│       │   ├── users/
│       │   │   ├── users.module.ts
│       │   │   ├── users.service.ts
│       │   │   ├── users.controller.ts
│       │   │   └── entities/
│       │   │       └── user.entity.ts
│       │   ├── assets/
│       │   ├── portfolio/
│       │   ├── marketplace/
│       │   ├── trading/
│       │   ├── custody/
│       │   ├── payments/
│       │   ├── concierge/
│       │   ├── notifications/
│       │   ├── compliance/
│       │   └── admin/
│       └── test/
│
└── packages/
    ├── ui/                           # Componentes compartilhados (design tokens)
    │   ├── src/
    │   │   ├── tokens/
    │   │   │   ├── colors.ts
    │   │   │   ├── typography.ts
    │   │   │   └── spacing.ts
    │   │   └── index.ts
    │   └── package.json
    ├── types/                        # TypeScript types compartilhados
    │   ├── src/
    │   │   ├── api/
    │   │   │   ├── auth.types.ts
    │   │   │   ├── asset.types.ts
    │   │   │   ├── portfolio.types.ts
    │   │   │   └── trading.types.ts
    │   │   └── index.ts
    │   └── package.json
    ├── utils/                        # Utilitários compartilhados
    │   ├── src/
    │   │   ├── currency.ts
    │   │   ├── validators.ts
    │   │   └── date.ts
    │   └── package.json
    └── config/                       # Configurações compartilhadas (ESLint, tsconfig)
        ├── eslint-preset.js
        └── tsconfig.base.json
```

---

## Diagrama de Fluxo de Dados

```
┌────────────────────────────────────────────────────────────────┐
│                         MOBILE APP                             │
│  [Garagem] [Portfolio] [Mercado] [Depósito] [Perfil]           │
└────────────────────────┬───────────────────────────────────────┘
                         │ HTTPS + WSS
                         ▼
┌────────────────────────────────────────────────────────────────┐
│                    API GATEWAY (NestJS)                        │
│  /api/v1/* — REST  │  /graphql — GraphQL  │  /ws — WebSocket  │
│                                                                │
│  Auth Guard ──► Role Guard ──► MFA Guard ──► Rate Limiter     │
└──────┬─────────────────┬────────────────────────┬─────────────┘
       │                 │                        │
       ▼                 ▼                        ▼
┌─────────────┐  ┌──────────────────┐  ┌──────────────────────┐
│  PostgreSQL │  │     Redis        │  │   BullMQ (Jobs)      │
│  (TypeORM)  │  │  Cache/Pub-Sub   │  │  KYC | Email | Notif │
└─────────────┘  └──────────────────┘  └──────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│              SERVIÇOS EXTERNOS                               │
│  Celcoin (PIX) │ Twilio (SMS) │ SendGrid (Email)            │
│  Firebase (Push) │ S3 (Docs) │ Hyperledger (Blockchain)     │
│  BACEN/COAF (AML) │ B3 (Registro)                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Módulos do Backend — Detalhamento

### Auth Module
```typescript
// Endpoints
POST   /api/v1/auth/login           # Login com e-mail/senha
POST   /api/v1/auth/register        # Cadastro de novo membro
POST   /api/v1/auth/refresh         # Refresh de access token
POST   /api/v1/auth/logout          # Revogação de tokens
POST   /api/v1/auth/mfa/enable      # Habilitar TOTP
POST   /api/v1/auth/mfa/verify      # Verificar código TOTP
POST   /api/v1/auth/biometric       # Autenticação biométrica

// Guards aplicados em todas as rotas protegidas:
@UseGuards(JwtAuthGuard, MfaGuard, RolesGuard)
```

### Assets Module
```typescript
// Endpoints
GET    /api/v1/assets               # Listar ativos (paginado, filtrado)
GET    /api/v1/assets/:id           # Detalhe de um ativo
GET    /api/v1/assets/:id/provenance # Linha do tempo de proveniência
GET    /api/v1/assets/:id/documents  # Documentos (laudos, contratos)
POST   /api/v1/assets               # [ADMIN] Criar novo ativo
PATCH  /api/v1/assets/:id           # [ADMIN] Atualizar ativo
```

### Portfolio Module
```typescript
// Endpoints
GET    /api/v1/portfolio            # Portfólio do membro autenticado
GET    /api/v1/portfolio/holdings   # Lista de cotas em custódia
GET    /api/v1/portfolio/performance # Histórico de rentabilidade
GET    /api/v1/portfolio/income     # Rendimentos (museus, filmagens)
```

### Trading Module (Mercado Secundário)
```typescript
// Endpoints (REST)
GET    /api/v1/trading/orderbook/:assetId  # Livro de ordens
POST   /api/v1/trading/orders              # Criar ordem (compra/venda)
DELETE /api/v1/trading/orders/:id          # Cancelar ordem
GET    /api/v1/trading/orders/history      # Histórico de ordens

// WebSocket (Socket.io)
// Room: 'market:{assetId}'
// Eventos:
// → 'orderbook:update'  — Atualização do livro de ordens
// → 'trade:executed'    — Negócio fechado
// → 'price:tick'        — Novo preço (a cada 5s)
```

### Payments Module
```typescript
// Endpoints
POST   /api/v1/payments/deposit/pix   # Gerar QR Code PIX
POST   /api/v1/payments/deposit/ted   # Registrar TED esperado
POST   /api/v1/payments/withdraw      # Solicitar saque
GET    /api/v1/payments/history       # Extrato de movimentações
POST   /api/v1/payments/webhooks/pix  # Webhook Celcoin (interno)
```

---

## Tabelas do Banco de Dados (Schema Resumido)

```sql
-- Membros
CREATE TABLE users (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id    VARCHAR(12) UNIQUE, -- ex: APX-882190
  email        VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name    VARCHAR(255) NOT NULL,
  cpf          VARCHAR(14) UNIQUE,
  tier         ENUM('select', 'private', 'ultra') DEFAULT 'select',
  kyc_status   ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  mfa_enabled  BOOLEAN DEFAULT FALSE,
  mfa_secret   TEXT, -- Criptografado
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ativos Automotivos
CREATE TABLE assets (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vin             VARCHAR(17) UNIQUE NOT NULL, -- Número de chassi
  name            VARCHAR(255) NOT NULL, -- ex: "Ferrari F40"
  year            INTEGER NOT NULL,
  color           VARCHAR(100),
  status          ENUM('draft', 'ipo', 'secondary', 'sold') DEFAULT 'draft',
  total_fractions INTEGER NOT NULL,
  fraction_price  DECIMAL(15,2) NOT NULL,
  yield_target    DECIMAL(5,2), -- % a.a.
  investment_term INTEGER, -- meses
  custody_location VARCHAR(255),
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cotas em Custódia
CREATE TABLE holdings (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  asset_id    UUID REFERENCES assets(id),
  quantity    INTEGER NOT NULL,
  avg_cost    DECIMAL(15,2) NOT NULL, -- Preço médio de aquisição
  acquired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, asset_id)
);

-- Ordens de Mercado Secundário
CREATE TABLE orders (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES users(id),
  asset_id    UUID REFERENCES assets(id),
  type        ENUM('buy', 'sell') NOT NULL,
  order_type  ENUM('market', 'limit') NOT NULL,
  quantity    INTEGER NOT NULL,
  price       DECIMAL(15,2), -- NULL para ordens a mercado
  status      ENUM('open', 'filled', 'partial', 'cancelled') DEFAULT 'open',
  filled_qty  INTEGER DEFAULT 0,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at  TIMESTAMP WITH TIME ZONE
);

-- Transações Executadas
CREATE TABLE trades (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buy_order_id  UUID REFERENCES orders(id),
  sell_order_id UUID REFERENCES orders(id),
  asset_id     UUID REFERENCES assets(id),
  quantity     INTEGER NOT NULL,
  price        DECIMAL(15,2) NOT NULL,
  executed_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Movimentações Financeiras
CREATE TABLE transactions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES users(id),
  type        ENUM('deposit', 'withdrawal', 'purchase', 'sale', 'income') NOT NULL,
  amount      DECIMAL(15,2) NOT NULL,
  currency    CHAR(3) DEFAULT 'BRL',
  status      ENUM('pending', 'confirmed', 'failed') DEFAULT 'pending',
  reference   VARCHAR(255), -- ID do PIX, TED, etc.
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Variáveis de Ambiente

```env
# API
NODE_ENV=production
PORT=3000
API_URL=https://api.apexcapital.com.br

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/autoequity
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=<ed25519-private-key>
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=30d

# AWS / GCS
S3_BUCKET=apex-kyc-documents
S3_REGION=sa-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# Payments
CELCOIN_CLIENT_ID=
CELCOIN_CLIENT_SECRET=
CELCOIN_WEBHOOK_SECRET=

# Communications
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
SENDGRID_API_KEY=

# Firebase
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=

# Blockchain
HYPERLEDGER_CHANNEL=apex-custody
HYPERLEDGER_CHAINCODE=asset-custody
```
