# Especificação de Telas — AutoEquity Apex Capital

> Documento de referência técnica extraído do Stitch Project `13714073900043782908`.
> Cada tela documenta: objetivo, componentes principais, dados exibidos e comportamentos especiais.

---

## Tela 1 — Garagem: Marketplace de Ativos
**ID:** `e8ac45c499344b4db82ebba432caebc5`  
**Dimensões:** 780 × 4500px (mobile scroll longo)  
**Rota sugerida:** `/garagem`

### Objetivo
Listagem principal de ativos disponíveis para investimento fracionado. É o hub de descoberta da plataforma.

### Componentes Presentes
- **Header fixo** com logo Apex Capital + menu hambúrguer + ícone de notificações
- **Barra de busca** com filtros rápidos (Tipo, Faixa de Preço, Yield, Status)
- **Tabs de categoria:** Todos | IPO | Secundário | Clássicos | Hipercarros
- **Cards de Ativo** em lista vertical:
  - Foto widescreen do veículo
  - Badge de status: `IPO LIVE` (pulsante vermelho) | `CERTIFICADO` | `VENDIDO`
  - Nome do ativo (ex: "Ferrari F40 · 1992")
  - Número de chassi (VIN) em `JetBrains Mono`
  - Preço da fração (ex: R$ 8.500/cota)
  - Barra de progresso de captação (2px, gradiente dourado)
  - Percentual captado + vagas restantes
  - Yield estimado anual (âmbar)
- **Bottom Navigation Bar** com 5 ícones: Garagem | Portfólio | Mercado | Depósito | Perfil

### Comportamentos
- Pull-to-refresh sincroniza preços em tempo real
- Cards de IPO LIVE pulsam e exibem countdown de encerramento
- Filtros persistem via URL query params

---

## Tela 2 — Portfólio: Garagem do Investidor
**ID:** `b015ce7da3fb403f8777af8ae2417a92`  
**Dimensões:** 780 × 4676px  
**Rota sugerida:** `/portfolio`

### Objetivo
Dashboard de patrimônio pessoal do investidor. Consolida todos os ativos em custódia.

### Componentes Presentes
- **Header** com nome do membro + badge "Membro Apex Private" + avatar
- **Ticker de status:** "Custódia Criptográfica Ativa" + badge MULTI-SIG APEX
- **Card Hero — Patrimônio Líquido:**
  - Valor total em reais (`R$ 164.820,00`) em `ticker-lg`
  - Ganho Não Realizado (+R$ 28.430,00 / +20,8%)
  - Rendimentos Acumulados (R$ 3.840,00)
  - Gráfico de área sparkline (12 meses) com seletor 1M / 6M / 1A / MAX
- **Lista de Ativos em Custódia:**
  - Thumbnail do veículo (pequeno)
  - Nome + número de cotas
  - Valor de mercado atual vs. preço de entrada
  - Variação percentual colorida (verde = ganho, vermelho = perda)
  - Botão "Vender no Mercado" (acesso ao Mercado Secundário)
- **Seção de Rendimentos:** histórico de aluguéis para museus e filmagens
- **Bottom Navigation** (mesmo da Garagem)

### Dados Chave Exibidos
```
Patrimônio Total: R$ 164.820,00
Ganho Não Realizado: +R$ 28.430,00 (+20.8%)
Rendimentos Acumulados: R$ 3.840,00
```

---

## Tela 3 — Detalhes do Ativo: Ferrari F40
**ID:** `c37620111ef0406bb130234045e07a4e`  
**Dimensões:** 780 × 3064px  
**Rota sugerida:** `/garagem/ativos/:id`

### Objetivo
Ficha técnica completa de um ativo. Permite análise detalhada e ação de compra de cotas.

### Componentes Presentes
- **Galeria de fotos** do veículo (swipeable, dots de paginação)
- **Badge de proveniência:** "VERIFICADO · ORIG. HISTÓRICA CERTIFICADA"
- **Nome e especificações:** Ferrari F40 · 1992 · Rosso Corsa
- **VIN / Número de Chassi** em `JetBrains Mono`
- **Métricas financeiras:**
  - Preço da fração (ex: R$ 8.500)
  - Total de cotas / cotas disponíveis
  - Barra de progresso de captação
  - Yield estimado: 14,2% a.a.
  - Prazo de investimento: 36 meses
- **Linha do Tempo de Proveniência:** proprietários anteriores, vitórias em competições, laudos
- **Abas de conteúdo:** Ficha Técnica | Documentos | Rentabilidade | Histórico
- **CTA Fixo no Bottom:** "Comprar Cotas — R$ 8.500/cota" (gradiente dourado)

---

## Tela 4 — Mercado: Negociação Secundária
**ID:** `c53293124c004fc2b4084bf2760c2879`  
**Dimensões:** 780 × 3930px  
**Rota sugerida:** `/mercado`

### Objetivo
Bolsa interna de negociação secundária de cotas entre membros Apex.

### Componentes Presentes
- **Header** com seletor de ativo + toggle Comprar/Vender
- **Livro de Ordens** (Order Book):
  - Coluna de Ofertas de Compra (verde)
  - Coluna de Ofertas de Venda (vermelho)
  - Preço médio atual (destacado em ouro)
- **Gráfico de Velas (Candlestick)** — últimas 24h / 7 dias / 30 dias
- **Painel de Ordem:**
  - Tipo: Mercado | Limitada
  - Quantidade de cotas
  - Preço (para ordens limitadas)
  - Valor total estimado
  - Botão de confirmação com autenticação biométrica
- **Histórico de Transações** do ativo (últimas 10 negociações)

---

## Tela 5 — Depósito Seguro: Apex Concierge
**ID:** `aed5edfffeaf4386a07a9b99a3bb9784`  
**Dimensões:** 780 × 3108px  
**Rota sugerida:** `/deposito`

### Objetivo
Gerenciamento de custódia física dos veículos e depósito/retirada de capital.

### Componentes Presentes
- **Saldo disponível** para aporte (em reais)
- **Botões de ação:** Depositar | Retirar | TED/PIX
- **Status de Custódia Física:**
  - Localização atual do veículo (ex: "Cofre Apex São Paulo — Zona Sul")
  - Temperatura e umidade do ambiente
  - Última inspeção (data + assinatura digital)
  - Seguro ativo (valor segurado, apólice)
- **Solicitações Concierge:**
  - Exibição em museus (% de rendimento extra)
  - Filmagens e editoriais (proposta de valor)
  - Manutenção preventiva programada
- **Extrato de movimentações** de capital

---

## Tela 6 — Perfil do Investidor: Membro Apex
**ID:** `5252c223d11546309413c67eb8f62426`  
**Dimensões:** 780 × 3826px  
**Rota sugerida:** `/perfil`

### Objetivo
Central de identidade e configurações do membro Apex Private.

### Componentes Presentes
- **Card de membro** com foto, nome completo, categoria (Apex Private / Apex Select)
- **ID de Membro** em `JetBrains Mono` + badge verificado
- **Métricas do Perfil:**
  - Total investido
  - Rendimento histórico total
  - Nível de acesso (tier do membro)
  - Data de admissão
- **Documentos regulatórios:** Contrato de Custódia, Declaração CVM, DARF
- **Configurações:**
  - Dados pessoais (KYC)
  - Segurança (2FA, biometria, chave de acesso)
  - Notificações (push, email, SMS)
  - Idioma e moeda preferencial
- **Sair / Revogar acesso**

---

## Tela 7 — Login: Terminal Apex Capital
**ID:** `e36a3f99ae704c58814cad4efd6a64e2`  
**Dimensões:** 780 × 2600px  
**Rota sugerida:** `/login`

### Objetivo
Autenticação institucional do membro Apex. Nomeada internamente de "Terminal Apex Capital".

### Componentes Presentes
- **Header** com logo Apex Capital + back button
- **Badges institucionais:** "Protocolo CVM 175 Ativo"
- **Título:** "Autenticação de Membro"
- **Subtítulo:** garagem institucional + custódia segregada
- **Barra de status:** Portfólio Total de membros (R$ 142.850.000)
- **Formulário Apex Key™ Sentinel:**
  - Campo: E-mail Corporativo ou ID de Membro (`#APX-XXXXXX`)
  - Campo: Chave de Segurança / Senha Mestra (com toggle visibilidade)
  - Chip de segurança: `ED25519`
  - Link "Esqueceu a chave?"
  - Checkbox "Lembrar neste dispositivo (30 dias)"
- **Botão CTA:** "Iniciar Sessão no Terminal" (gradiente dourado, ícone fingerprint)
- **Autenticação biométrica** alternativa (Face ID / Touch ID)
- **Link de Cadastro**
- **Footer:** SSL 256-bit · CVM 175 · Dados Segregados

### Lógica de Autenticação
1. Validar e-mail/ID de membro
2. Validar senha (bcrypt)
3. Gerar token JWT (15 min) + refresh token (30 dias)
4. Verificar MFA (TOTP ou biometria)
5. Redirecionar para `/portfolio`

---

## Tela 8 — Cadastro: Admissão de Membro Apex
**ID:** `c327fbd525a64d73990b03644e699273`  
**Dimensões:** 780 × 4812px  
**Rota sugerida:** `/cadastro`

### Objetivo
Fluxo de admissão de novo membro. Multi-etapas com validação KYC.

### Etapas do Fluxo

**Etapa 1 — Credenciais de Acesso**
- Nome completo
- E-mail corporativo
- Senha mestra (+ confirmação + strength meter)

**Etapa 2 — Perfil do Investidor**
- CPF / CNPJ
- Data de nascimento
- Telefone (com DDI)
- Endereço residencial

**Etapa 3 — Declaração de Investidor Qualificado**
- Checkbox CVM: "Declaro ser investidor qualificado"
- Renda anual estimada
- Patrimônio financeiro declarado
- Objetivo de investimento

**Etapa 4 — Verificação de Identidade (KYC)**
- Upload de documento (RG / CNH / Passaporte — frente e verso)
- Selfie com documento (liveness check)
- Comprovante de residência

**Etapa 5 — Revisão e Assinatura**
- Resumo dos dados
- Aceite: Termos de Uso, Política de Privacidade, Contrato de Custódia
- Assinatura digital (input de toque)

---

## Tela 9 — Concierge & Centro de Apoio: Apex Private
**ID:** `7e9093aa672947c6b0b25e55d1e9c2eb`  
**Dimensões:** 780 × 4252px  
**Rota sugerida:** `/concierge`

### Objetivo
Central de suporte VIP e serviços exclusivos para membros Apex Private.

### Componentes Presentes
- **Header** com título "Concierge Apex Private" + badge de nível
- **Gerente de Conta dedicado:**
  - Foto e nome do gerente
  - Cargo (ex: "Diretor de Patrimônio")
  - Botões: Ligar | WhatsApp | E-mail | Agendar Reunião
- **Serviços Concierge:**
  - Exibição em museus e feiras de prestígio
  - Cessão para filmagens e editoriais
  - Transporte especializado para leilões
  - Manutenção preventiva e restauração
  - Seguro internacional Apex Lloyd's
- **Base de Conhecimento:**
  - FAQ sobre custódia, tributação, liquidez
  - Vídeos explicativos
  - Documentos regulatórios para download
- **Chat ao vivo** com suporte 24/7 (badge de status online/offline)
- **Histórico de solicitações**

---

## Assets (Imagens Estáticas)

### Apex Capital Logo
**ID:** `8d8ec5a0a84643c5bad50a10447525b4`  
**Screenshot URL:** `https://lh3.googleusercontent.com/aida/AEtjO1VR9Pr18peqmftIX-nbOUsaQMtux65i...`  
Logo institucional da Apex Capital. Usar como `<img alt="Apex Capital Logo" />` no header.

### Investor Headshot
**ID:** `243edc0175a24454bd9a76eb9d167241`  
Foto de perfil padrão para mock do investidor (homem, 38 anos, terno carvão, fundo bokeh arquitetural).
