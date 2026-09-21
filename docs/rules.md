# Regras de Negócio — AutoEquity Apex Capital

> Regras funcionais, restrições regulatórias e comportamentos esperados do sistema.

---

## 1. Regras de Acesso & Membros

### 1.1 Tiers de Membros

| Tier | Critério de Admissão | Limite de Aporte | Acesso |
|------|---------------------|------------------|--------|
| **Apex Select** | Investidor qualificado (R$ 1M+ em ativos) | Até R$ 300.000/mês | Garagem básica, IPOs |
| **Apex Private** | R$ 5M+ em ativos + entrevista com gerente | Até R$ 1.000.000/mês | Tudo + Concierge VIP |
| **Apex Ultra** | R$ 20M+ + aprovação do comitê | Ilimitado | Tudo + acesso antecipado a IPOs |

### 1.2 KYC Obrigatório
- **Nenhuma operação financeira** é permitida antes da aprovação do KYC completo
- O prazo de análise de KYC é de até **3 dias úteis**
- KYC rejeitado bloqueia conta e notifica o membro por e-mail + SMS
- KYC deve ser refeito a cada **24 meses** (renovação periódica)

### 1.3 Autenticação
- **MFA é obrigatório** para qualquer operação de valor > R$ 10.000
- Sessões expiram após **15 minutos** de inatividade
- Máximo de **3 dispositivos** simultâneos por membro
- Após **5 tentativas falhas** de login → conta bloqueada por 30 minutos
- Revogação total de sessões disponível via "Sair de todos os dispositivos"

---

## 2. Regras de Ativos

### 2.1 Criação de Ativo (IPO)
- Cada ativo deve ter no mínimo **10 cotas** e no máximo **10.000 cotas**
- O **preço mínimo por cota** é R$ 1.000
- Todo ativo deve ter:
  - Laudo de avaliação de terceiros (empresa certificada)
  - Contrato de custódia física assinado
  - Apólice de seguro ativa (mínimo: valor total do ativo)
  - Documentação de proveniência (cadeia de proprietários)
  - VIN (número de chassi) único e verificado
- Ativos em IPO ficam **abertos por no máximo 90 dias**
- Se a captação não atingir 70% em 90 dias → **IPO cancelado**, aportes devolvidos

### 2.2 Proveniência
- A linha do tempo de proveniência deve incluir todos os proprietários documentados
- Vitórias em competições históricas devem ter comprovação documental
- Qualquer alteração de proveniência deve ser aprovada por 2 membros do time de compliance

### 2.3 Custódia Física
- Todos os ativos ficam em **cofres Apex** sob monitoramento 24/7
- Temperatura de armazenamento: **18°C ± 2°C**
- Umidade relativa: **45–55%**
- Auditoria física semestral obrigatória por empresa terceira
- Relatório de custódia disponível no app para todos os coproprietários

---

## 3. Regras de Investimento

### 3.1 Compra de Cotas (IPO)
- Membro pode comprar no mínimo **1 cota** e no máximo **20% do total de cotas** de um ativo
- O investimento mínimo é determinado pelo preço da fração do ativo
- Compras em IPO são **irrevogáveis** após confirmação
- Pagamento deve ser confirmado em **até 24 horas** após a reserva (via PIX ou TED)
- Reservas sem pagamento expiram automaticamente e as cotas retornam ao pool

### 3.2 Rendimentos
- Rendimentos de cessão (museus, filmagens, editoriais) são distribuídos **mensalmente**
- Distribuição proporcional ao número de cotas detidas na data de corte (último dia útil do mês)
- Rendimentos são creditados na **carteira virtual** do membro no app
- IR sobre rendimentos: 15% retido na fonte (IRRF) conforme tabela regressiva

### 3.3 Prazo de Investimento
- Cada ativo tem um **prazo definido de investimento** (ex: 36 meses)
- Antes do prazo, liquidez somente via **Mercado Secundário**
- Ao término do prazo, o ativo vai a leilão e o valor líquido é distribuído proporcionalmente

---

## 4. Regras do Mercado Secundário

### 4.1 Elegibilidade
- Cotas só podem ser negociadas no mercado secundário após **90 dias** da data de compra (lock-up)
- O membro deve ter **saldo livre** para criar ordens de compra
- O membro só pode vender cotas que **realmente possui** em custódia

### 4.2 Ordens
- **Ordem a Mercado:** executada imediatamente ao melhor preço disponível
- **Ordem Limitada:** fica no livro por até **30 dias corridos**, após isso é cancelada automaticamente
- Ordens abertas **não podem ser modificadas** — devem ser canceladas e recriadas
- Taxa de corretagem: **1,5%** sobre o valor total da transação (split: 1% Apex + 0,5% escriturador)

### 4.3 Liquidação
- Transações são liquidadas em **D+1** (próximo dia útil)
- Os valores ficam **retidos** até a liquidação — não podem ser usados para outras operações

### 4.4 Formação de Preço
- O preço de referência do mercado secundário é o **último preço negociado**
- O spread máximo entre bid e ask é monitorado — spreads acima de **25%** acionam alerta do compliance
- Não há formador de mercado oficial — preço é livre entre compradores e vendedores membros

---

## 5. Regras de Pagamento

### 5.1 Depósitos
- **PIX:** confirmado em até 10 minutos (webhook Celcoin)
- **TED:** confirmado em até 1 dia útil após crédito na conta escrow
- Depósitos mínimos: R$ 1.000
- Depósitos acima de R$ 10.000 por dia requerem declaração de origem
- Conta bancária de depósito deve ser a mesma conta cadastrada no KYC (titularidade)

### 5.2 Saques
- Saques disponíveis apenas para a conta bancária cadastrada no KYC
- Prazo de processamento: **1 dia útil**
- Saque mínimo: R$ 500
- Saque máximo diário: conforme tier (Select: R$ 100k, Private: R$ 500k, Ultra: ilimitado)
- Saques acima de R$ 50.000 requerem aprovação adicional (confirmação por e-mail + SMS)

---

## 6. Regras de Compliance & Regulatório

### 6.1 CVM 175
- A plataforma é registrada como **Plataforma de Investimento Participativo** (equity crowdfunding regulamentada)
- Todas as ofertas de cotas são tratadas como valores mobiliários
- Prospecto simplificado obrigatório para cada oferta (IPO de ativo)
- Limite de captação por oferta: sem limite (investidores qualificados)

### 6.2 Anti-Lavagem de Dinheiro (PLD/FT)
- Transações individuais > R$ 10.000 são reportadas ao **COAF** automaticamente
- Transações suspeitas (padrão incomum) são sinalizadas para análise manual
- PEP (Pessoa Exposta Politicamente): requer aprovação manual e monitoramento contínuo
- OFAC/BACEN screening obrigatório no cadastro e a cada 6 meses

### 6.3 LGPD
- Dados pessoais coletados apenas com consentimento explícito
- Finalidades declaradas: KYC, compliance regulatório, comunicações de serviço
- Direito de portabilidade: exportação de dados em até **15 dias úteis** após solicitação
- Direito ao esquecimento: encerramento de conta anonimiza dados em **30 dias** (exceto dados de transações, retidos por 10 anos por obrigação legal)
- DPO: privacidade@driveiin.com.br

### 6.4 Tributação (Investidor)
- **Ganho de capital na venda de cotas:** alíquota de 15% (regressive table conforme prazo)
  - Até 180 dias: 22,5%
  - 181 a 360 dias: 20%
  - 361 a 720 dias: 17,5%
  - Acima de 720 dias: 15%
- **Rendimentos (aluguéis):** 15% IRRF retido na fonte
- **DARF:** gerado automaticamente e disponível para download no perfil

---

## 7. Regras de Notificações

### 7.1 Notificações Obrigatórias (não podem ser desativadas)
- Confirmação de aporte ou saque
- Execução de ordem no mercado secundário
- Distribuição de rendimentos
- Vencimento próximo do IPO (7 dias antes)
- Alteração de dados cadastrais ou senha

### 7.2 Notificações Opcionais
- Novos IPOs disponíveis
- Ativos de interesse com variação de preço > 5%
- Newsletters e relatórios de mercado
- Solicitações de concierge aprovadas/concluídas

---

## 8. Regras de UI/UX (Front-End)

### 8.1 Valores Monetários
- **Sempre** exibir em `BRL (R$)` como padrão
- Usar `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })` para formatação
- Valores em `JetBrains Mono` com `font-variant-numeric: tabular-nums`
- Variações positivas: verde `#10B981` com prefixo `+`
- Variações negativas: vermelho `#E11D48` com prefixo `-`
- Variação zero: `#94A3B8`

### 8.2 Estados de Loading
- Skeleton screens (nunca spinners isolados) para carregamento inicial de dados
- Optimistic updates para ações de alta frequência (toggle de favorito)
- Toast notifications para confirmações de ação (duração: 3s)
- Bottom sheet para confirmações de ação destrutiva ou irreversível

### 8.3 Tratamento de Erros
- Erros de rede: "Sem conexão. Tentando reconectar..." com retry automático (exponential backoff)
- Erros de validação: inline abaixo do campo, cor `#ffb4ab`
- Erros de autorização (401): redirect automático para `/login`
- Erros de permissão (403): toast "Acesso não permitido para o seu nível de membro"
- Erros internos (500): "Algo deu errado. Nossa equipe foi notificada." + botão de retry

### 8.4 Acessibilidade
- Contraste mínimo de 4.5:1 para texto padrão (WCAG AA)
- Touch targets mínimo de 44×44px
- Labels `aria-*` em todos os elementos interativos
- Suporte a `prefers-reduced-motion` (desabilitar animações pesadas)
- Suporte a Dynamic Type (iOS) e Text Scaling (Android)

