# Contratos de API — AutoEquity Apex Capital

> Referência de todos os endpoints REST + WebSocket + tipos TypeScript compartilhados.

---

## Base URL

```
Production:  https://api.apexcapital.com.br/api/v1
Staging:     https://staging-api.apexcapital.com.br/api/v1
Development: http://localhost:3000/api/v1
```

## Autenticação

Todas as rotas protegidas requerem o header:
```
Authorization: Bearer <access_token>
```

---

## Tipos TypeScript Compartilhados

```typescript
// packages/types/src/api/auth.types.ts

export interface LoginDto {
  email: string;        // e-mail corporativo ou ID ex: #APX-882190
  password: string;     // senha mestra
  mfaCode?: string;     // código TOTP (6 dígitos) se MFA ativo
}

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  tier?: 'select' | 'private';
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;      // segundos (900 = 15min)
  member: MemberProfile;
}

export interface MemberProfile {
  id: string;
  memberId: string;       // ex: APX-882190
  email: string;
  fullName: string;
  tier: 'select' | 'private' | 'ultra';
  kycStatus: 'pending' | 'approved' | 'rejected';
  mfaEnabled: boolean;
  avatarUrl?: string;
  createdAt: string;
}
```

```typescript
// packages/types/src/api/asset.types.ts

export type AssetStatus = 'draft' | 'ipo' | 'secondary' | 'sold';

export interface Asset {
  id: string;
  vin: string;              // Número de chassi (17 caracteres)
  name: string;             // ex: "Ferrari F40"
  year: number;
  color: string;            // ex: "Rosso Corsa"
  status: AssetStatus;
  totalFractions: number;
  availableFractions: number;
  fractionPrice: number;    // em BRL
  yieldTarget: number;      // % a.a.
  investmentTermMonths: number;
  capturedPercent: number;  // 0–100
  custodyLocation: string;
  photos: string[];         // URLs
  thumbnailUrl: string;
  provenance: ProvenanceEntry[];
  documents: AssetDocument[];
  createdAt: string;
  ipoExpiresAt?: string;    // Para ativos em IPO
}

export interface ProvenanceEntry {
  year: number;
  event: string;            // ex: "Comprado por Enzo Ferrari"
  owner?: string;
  location?: string;
  verified: boolean;
  documentUrl?: string;
}

export interface AssetDocument {
  type: 'evaluation' | 'insurance' | 'custody' | 'provenance' | 'prospectus';
  title: string;
  url: string;
  issuedAt: string;
  issuer: string;
}
```

```typescript
// packages/types/src/api/portfolio.types.ts

export interface Portfolio {
  totalEquity: number;          // R$
  unrealizedGain: number;       // R$
  unrealizedGainPercent: number;// %
  accumulatedIncome: number;    // R$
  holdings: Holding[];
  performanceHistory: PerformancePoint[];
}

export interface Holding {
  id: string;
  asset: Pick<Asset, 'id' | 'name' | 'vin' | 'thumbnailUrl' | 'status'>;
  quantity: number;
  avgCost: number;              // Preço médio de aquisição (R$)
  currentPrice: number;         // Preço atual de mercado (R$)
  currentValue: number;         // quantity × currentPrice
  unrealizedGain: number;
  unrealizedGainPercent: number;
  acquiredAt: string;
}

export interface PerformancePoint {
  date: string;                 // ISO 8601
  value: number;                // Valor do portfólio em R$
}
```

```typescript
// packages/types/src/api/trading.types.ts

export type OrderSide = 'buy' | 'sell';
export type OrderType = 'market' | 'limit';
export type OrderStatus = 'open' | 'filled' | 'partial' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  assetId: string;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  price?: number;               // null para orders a mercado
  status: OrderStatus;
  filledQuantity: number;
  createdAt: string;
  expiresAt?: string;
}

export interface CreateOrderDto {
  assetId: string;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  price?: number;               // Obrigatório para 'limit'
}

export interface OrderBook {
  assetId: string;
  lastPrice: number;
  bids: OrderBookLevel[];       // Compras (decrescente por preço)
  asks: OrderBookLevel[];       // Vendas (crescente por preço)
  lastUpdatedAt: string;
}

export interface OrderBookLevel {
  price: number;
  quantity: number;
  orderCount: number;
}

export interface Trade {
  id: string;
  assetId: string;
  quantity: number;
  price: number;
  executedAt: string;
}
```

---

## Endpoints REST

### Auth

```yaml
POST /auth/login
  body: LoginDto
  response: AuthResponse
  errors:
    401: Credenciais inválidas
    403: MFA requerido (quando mfaCode não enviado)
    423: Conta bloqueada (muitas tentativas)

POST /auth/register
  body: RegisterDto
  response: { message: string, memberId: string }
  notes: KYC análise assíncrona após cadastro

POST /auth/refresh
  body: { refreshToken: string }
  response: { accessToken: string, expiresIn: number }

POST /auth/logout
  headers: Authorization: Bearer <token>
  body: { refreshToken: string }
  response: 204 No Content

POST /auth/mfa/enable
  headers: Authorization: Bearer <token>
  response: { qrCodeUrl: string, secret: string }

POST /auth/mfa/verify
  headers: Authorization: Bearer <token>
  body: { code: string }
  response: { confirmed: boolean }
```

### Assets

```yaml
GET /assets
  query:
    status?: AssetStatus
    page?: number (default: 1)
    limit?: number (default: 20, max: 100)
    sort?: 'yield_desc' | 'price_asc' | 'capture_desc' | 'created_at'
    search?: string (busca por nome ou VIN)
  response:
    data: Asset[]
    meta: { total, page, limit, totalPages }

GET /assets/:id
  response: Asset (com todos os campos)

GET /assets/:id/provenance
  response: ProvenanceEntry[]

GET /assets/:id/documents
  response: AssetDocument[]

GET /assets/:id/price-history
  query:
    period: '24h' | '7d' | '30d' | '1y' | 'all'
  response: PerformancePoint[]
```

### Portfolio

```yaml
GET /portfolio
  headers: Authorization: Bearer <token>
  response: Portfolio

GET /portfolio/holdings
  headers: Authorization: Bearer <token>
  response: Holding[]

GET /portfolio/income
  headers: Authorization: Bearer <token>
  query:
    year?: number
  response:
    total: number
    distributions: Array<{
      assetId: string
      assetName: string
      amount: number
      distributedAt: string
    }>
```

### Marketplace (IPO / Compra Primária)

```yaml
POST /marketplace/subscribe
  headers: Authorization: Bearer <token>
  body:
    assetId: string
    quantity: number
    paymentMethod: 'pix' | 'ted'
  response:
    subscriptionId: string
    totalAmount: number
    paymentDeadline: string
    pixQrCode?: string        # Se paymentMethod === 'pix'
    tedInstructions?: object  # Se paymentMethod === 'ted'

GET /marketplace/subscriptions
  headers: Authorization: Bearer <token>
  response: Subscription[]

DELETE /marketplace/subscriptions/:id
  notes: Cancelamento (apenas se pagamento ainda não confirmado)
```

### Trading (Mercado Secundário)

```yaml
GET /trading/orderbook/:assetId
  response: OrderBook

POST /trading/orders
  headers: Authorization: Bearer <token>
  body: CreateOrderDto
  response: Order

DELETE /trading/orders/:id
  headers: Authorization: Bearer <token>
  response: 204 No Content

GET /trading/orders
  headers: Authorization: Bearer <token>
  query:
    status?: OrderStatus
    assetId?: string
    page?: number
    limit?: number
  response:
    data: Order[]
    meta: { total, page, limit }

GET /trading/trades/:assetId
  query:
    limit?: number (default: 20)
  response: Trade[]
```

### Payments

```yaml
POST /payments/deposit/pix
  headers: Authorization: Bearer <token>
  body:
    amount: number
  response:
    transactionId: string
    pixQrCode: string         # base64
    pixCopyPaste: string      # chave PIX copia e cola
    expiresAt: string

POST /payments/deposit/ted
  headers: Authorization: Bearer <token>
  body:
    amount: number
  response:
    transactionId: string
    bankInfo:
      bank: string
      agency: string
      account: string
      accountType: string
      holder: string
      cnpj: string

POST /payments/withdraw
  headers: Authorization: Bearer <token>
  body:
    amount: number
  response:
    transactionId: string
    estimatedAt: string       # Data estimada de crédito

GET /payments/history
  headers: Authorization: Bearer <token>
  query:
    page?: number
    limit?: number
    type?: 'deposit' | 'withdrawal' | 'purchase' | 'sale' | 'income'
  response:
    data: Transaction[]
    meta: { total, page, limit }

GET /payments/balance
  headers: Authorization: Bearer <token>
  response:
    available: number
    reserved: number          # Em ordens abertas ou liquidação pendente
    total: number
```

### Profile

```yaml
GET /profile
  headers: Authorization: Bearer <token>
  response: MemberProfile (estendido com documentos e config)

PATCH /profile
  headers: Authorization: Bearer <token>
  body:
    fullName?: string
    phone?: string
    avatarUrl?: string
  response: MemberProfile

POST /profile/kyc/upload
  headers: Authorization: Bearer <token>
  body: multipart/form-data
    documentType: 'rg_front' | 'rg_back' | 'cnh_front' | 'cnh_back' | 'selfie' | 'proof_of_address'
    file: File
  response:
    uploadId: string
    status: 'pending_review'

GET /profile/documents
  headers: Authorization: Bearer <token>
  response: UserDocument[]   # Contratos assinados, DARF, declarações CVM
```

### Concierge

```yaml
GET /concierge/services
  headers: Authorization: Bearer <token>
  response: ConciergeService[]

POST /concierge/requests
  headers: Authorization: Bearer <token>
  body:
    serviceType: 'museum' | 'filming' | 'transport' | 'maintenance' | 'insurance'
    assetId: string
    details: string
    preferredDate?: string
  response:
    requestId: string
    status: 'pending'

GET /concierge/requests
  headers: Authorization: Bearer <token>
  response: ConciergeRequest[]

GET /concierge/manager
  headers: Authorization: Bearer <token>
  response:
    name: string
    title: string
    photoUrl: string
    whatsapp: string
    email: string
    calendlyUrl: string
```

---

## WebSocket (Socket.io)

### Conexão

```typescript
import { io } from 'socket.io-client';

const socket = io('wss://api.apexcapital.com.br', {
  auth: { token: accessToken },
  transports: ['websocket'],
});
```

### Rooms & Eventos

```typescript
// Entrar no room de um ativo específico
socket.emit('join:market', { assetId: 'uuid' });

// Receber atualizações do order book
socket.on('orderbook:update', (data: OrderBook) => { ... });

// Receber trades executados
socket.on('trade:executed', (data: Trade) => { ... });

// Receber ticks de preço (a cada 5s)
socket.on('price:tick', (data: {
  assetId: string;
  lastPrice: number;
  change24h: number;
  changePercent24h: number;
}) => { ... });

// Notificações pessoais do membro
socket.on('notification', (data: {
  type: 'order_filled' | 'income_distributed' | 'kyc_approved' | 'ipo_closing';
  title: string;
  body: string;
  metadata?: Record<string, unknown>;
}) => { ... });

// Sair do room
socket.emit('leave:market', { assetId: 'uuid' });
```

---

## Padrão de Resposta de Erro

```typescript
interface ApiError {
  statusCode: number;
  error: string;      // ex: "Unauthorized"
  message: string;    // Mensagem legível
  details?: Record<string, string[]>; // Erros de validação por campo
  timestamp: string;
  path: string;
}

// Exemplo: erro de validação
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "details": {
    "email": ["E-mail inválido"],
    "cpf": ["CPF deve ter 11 dígitos"]
  },
  "timestamp": "2026-09-21T19:00:00.000Z",
  "path": "/api/v1/auth/register"
}
```

---

## Paginação

Todas as listagens seguem o padrão:

```typescript
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;       // Total de itens
    page: number;        // Página atual (base 1)
    limit: number;       // Itens por página
    totalPages: number;  // Total de páginas
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```
