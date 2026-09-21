# Apex Capital - Painel Admin Master (Mesa de Operações)

> Documentação oficial de arquitetura, acesso e fluxo das telas de administração (Admin Master Panel) da AutoEquity.

---

## 1. Visão Geral

O Painel Master é o sistema restrito de backoffice destinado à equipe interna da Apex Capital e operadores autorizados. Ele permite a gestão completa do ecossistema AutoEquity, englobando compliance (CVM 175), custódia física de ativos, aprovação de usuários, tokenização (drops), controle de lucros e monitoramento em tempo real do mercado secundário.

Os códigos HTML base das telas de design encontram-se no diretório `docs/admin-designs/`.

---

## 2. Telas e Mapeamento

Foram mapeadas as seguintes 8 telas críticas para operação do painel:

| ID | Módulo | Descrição Resumida | Arquivo Design |
|----|--------|--------------------|----------------|
| 1 | **Gestão de Drops & Tokenização** | Criação de novas ofertas primárias, definição de supply (tokens) e cronograma de captação. | `1-gestao-de-drops.html` |
| 2 | **Terminal de Operações & Telemetria** | Dashboard em tempo real do mercado secundário, livros de ofertas (orderbook) e volume financeiro. | `2-terminal-operacoes.html` |
| 3 | **Mesa de Compliance & CVM 175** | Relatórios regulatórios, KYC/AML, relatórios de auditabilidade e adequação de investidores. | `3-mesa-compliance.html` |
| 4 | **Custódia Física & Bunkers** | Rastreabilidade de veículos, localização, telemetria de GPS, manutenções e documentação do ativo físico. | `4-custodia-fisica.html` |
| 5 | **Catálogo & Gestão de Carros** | CRUD completo dos carros tokenizados, gestão de fotos, especificações técnicas e valuation atualizado. | `5-catalogo-carros.html` |
| 6 | **Gestão de Usuários & Acessos** | Listagem de investidores, níveis de permissão (Tier 1/2/3), bloqueios preventivos e verificação de identidade. | `6-gestao-usuarios.html` |
| 7 | **Painel Master Geral** | Visão macro de negócio (KPIs): AUM (Assets Under Management), usuários ativos, captação total, liquidez. | `7-painel-master-geral.html` |
| 8 | **Controle de Lucros & Taxas** | Gestão de spread, taxas de corretagem, performance de carteira, repasses e dividendos aos acionistas. | `8-controle-lucros.html` |

---

## 3. Controle de Acesso e Segurança (RBAC)

O acesso ao Painel Admin é **estritamente controlado**.
A API (NestJS) expõe estes endpoints sob o prefixo `/admin` e eles são protegidos por múltiplos fatores de segurança:

1. **Role-Based Access Control (RBAC):**
   - Somente usuários com a role `ADMIN` ou `SUPER_ADMIN` podem requisitar esses endpoints.
2. **Multi-Factor Authentication (MFA):**
   - Ações críticas (como aprovação de Drops ou movimentação de custódia) exigem revalidação via código TOTP.
3. **Audit Logging:**
   - Todas as ações realizadas no painel Master ficam registradas na tabela `AuditLogs` com timestamp, IP de origem e ID do operador.

### Exemplo de Proteção no Backend

```typescript
import { UseGuards, SetMetadata } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@SetMetadata('roles', ['SUPER_ADMIN', 'ADMIN_OPERATOR'])
export class AdminController {
  // Rotas da mesa de operações
}
```

---

## 4. Integração Frontend (Web App)

A implementação do frontend baseia-se nos arquivos HTML extraídos via Stitch MCP.
A arquitetura de UI para o Admin deverá seguir as seguintes diretrizes:
- **Framework:** Next.js (App Router) ou React puro com Vite.
- **Estilização:** CSS Vanilla ou Tailwind (com base no setup do repositório) convertido diretamente do HTML do Stitch.
- **Gestão de Estado:** React Query para consumo das rotas `/admin/*` do NestJS.
- **Componentização:** O layout deve usar uma "Sidebar" persistente com a navegação entre os 8 módulos citados acima.

---

## 5. Próximos Passos de Implementação

1. **Mapear Modelos no Banco de Dados:**
   - Garantir que as entidades do TypeORM (ex: `Asset`, `User`, `Transaction`, `Order`) possuam todos os dados exibidos nos designs HTML.
2. **Criar Controladores e Serviços (`apps/api/src/modules/admin`):**
   - Implementar a agregação de dados para os dashboards (KPIs).
3. **Desenvolvimento Frontend (`apps/admin-web`):**
   - Parsear o HTML limpo e transformar as 8 views em componentes React funcionais.
   - Conectar as rotas ao backend seguro.
