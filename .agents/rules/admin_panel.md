---
name: admin_panel_rules
description: Regras e diretrizes estritas para a implementação do Admin Master Panel da AutoEquity.
---

# Regras de Desenvolvimento: Admin Master Panel

Ao atuar em tarefas relacionadas ao **Painel de Administração Master da Apex Capital (AutoEquity)**, você **DEVE** aderir estritamente às seguintes diretrizes. Este é um sistema interno crítico com acesso a ativos financeiros de alto valor, compliance CVM 175 e gestão de liquidez.

## 1. Fonte de Verdade de Design

Os designs e o layout original do painel Admin foram exportados via Stitch (Google) e os códigos HTML de referência encontram-se no diretório `/docs/admin-designs/`. 
Você deve:
- **Sempre extrair estilos e marcações (CSS/HTML)** diretamente destes arquivos de referência ao construir as telas do frontend.
- Respeitar a identidade visual de "Mesa de Operações" (painel com contraste acentuado, cores escuras/dark mode de alta performance se houver no design, tipografia premium).

As telas mapeadas são:
1. `1-gestao-de-drops.html` (Gestão de Drops & Tokenização)
2. `2-terminal-operacoes.html` (Terminal de Operações & Telemetria)
3. `3-mesa-compliance.html` (Mesa de Compliance & CVM 175)
4. `4-custodia-fisica.html` (Custódia Física & Bunkers)
5. `5-catalogo-carros.html` (Catálogo & Gestão de Carros)
6. `6-gestao-usuarios.html` (Gestão de Usuários & Acessos)
7. `7-painel-master-geral.html` (Painel Master Geral)
8. `8-controle-lucros.html` (Controle de Lucros & Taxas)

Leia também a documentação base em `/docs/admin-master-panel.md`.

## 2. Padrões de Segurança do Backend

Todas as chamadas à API voltadas para o painel de administração devem estar no **NestJS** (Backend):
- Devem estar em sub-rotas protegidas (ex: `/admin/*` ou módulos com Role Guard).
- **Nunca exponha endpoints do Admin publicamente.** Você deve sempre adicionar o `@UseGuards(JwtAuthGuard, RolesGuard)` com a verificação de Roles (`SUPER_ADMIN` ou `ADMIN`).
- Funções como aprovar liquidações, enviar drops ao mercado primário ou banir usuários exigem registros de **Auditoria (AuditLog)**.
- Nunca retorne informações sensíveis sem paginação (limite de itens por requisição para evitar travamento da API ou dumping de dados).

## 3. Integração do Frontend

- Utilize **React** (via Next.js se aplicável) construindo componentes encapsulados e reaproveitáveis (ex: `DataGrid`, `StatusBadge`, `ActionModal`).
- Para requisições de dados, use o padrão de State Management atual do projeto (ex: Axios + SWR ou React Query) consumindo os endpoints Rest API.
- Todo dado de valor financeiro deve ser exibido com precisão de duas casas decimais e tipificação forte em TypeScript no front e no back.

## 4. O Que Fazer ao Modificar o Admin
Se for instruído a implementar uma nova tela do Admin:
1. **Leia** o arquivo HTML base que está em `/docs/admin-designs/`.
2. **Identifique** os endpoints necessários e construa a camada de serviços REST no NestJS primeiro.
3. **Desenvolva** a interface limpa e idêntica à referência, sem usar UI libraries (como MaterialUI ou AntD) se isso quebrar as cores e CSS do HTML original.
4. Teste permissões, simulando um usuário sem a Role `ADMIN` sendo rejeitado com `403 Forbidden`.
