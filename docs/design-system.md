# Design System — Monza Apex Capital

> Extraído do Stitch Project `13714073900043782908`. Este documento é a fonte de verdade para todos os tokens de design do projeto.

---

## Identidade Visual

O design system **Monza Apex Capital** estabelece uma ponte entre a engenharia de precisão do automobilismo de alta performance e a sofisticação do private banking contemporâneo. A linguagem combina **Minimalismo Estrutural** e **Glassmorphism Tátil**.

---

## Paleta de Cores

### Cores Base & Superfícies

| Token | Hex | Uso |
|-------|-----|-----|
| `background` / `surface` / `surface-dim` | `#111318` | Canvas base, cor de fundo principal |
| `surface-container-lowest` | `#0c0e13` | Preto carbono — camada mais profunda |
| `surface-container-low` | `#1a1b21` | Chassi grafite |
| `surface-container` | `#1e2025` | Cards e containers padrão |
| `surface-container-high` | `#282a2f` | Cards elevados, modais |
| `surface-container-highest` | `#33353a` | Superfície mais elevada |
| `surface-bright` | `#37393f` | Destaque de superfície |
| `surface-variant` | `#33353a` | Variante de superfície |
| `surface-tint` | `#e9c349` | Tint de superfície |

### Acentos Primários (Ouro Titânio Champanhe)

| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#f2ca50` | Ações primárias, CTAs, destaques principais |
| `on-primary` | `#3c2f00` | Texto sobre fundo primary |
| `primary-container` | `#d4af37` | Containers com destaque dourado |
| `on-primary-container` | `#554300` | Texto sobre primary-container |
| `primary-fixed` | `#ffe088` | Primary fixo claro |
| `primary-fixed-dim` | `#e9c349` | Primary fixo médio |
| `inverse-primary` | `#735c00` | Primary invertido |

### Acentos Secundários (Vermelho Rosso Corsa — Performance)

| Token | Hex | Uso |
|-------|-----|-----|
| `secondary` | `#ffb3b6` | Indicadores de alta volatilidade, saídas de capital |
| `on-secondary` | `#68001a` | Texto sobre fundo secondary |
| `secondary-container` | `#cc003c` | IPO Live, alertas críticos de liquidez |
| `on-secondary-container` | `#ffdcdc` | Texto sobre secondary-container |

### Acentos Terciários (Âmbar Telemetria)

| Token | Hex | Uso |
|-------|-----|-----|
| `tertiary` | `#ffc37b` | Yields estimados, status em captação |
| `on-tertiary` | `#472a00` | Texto sobre fundo tertiary |
| `tertiary-container` | `#f7a00f` | Alertas de lance, ordens limitadas |
| `tertiary-fixed-dim` | `#ffb95f` | Âmbar fixo médio |

### Estados & Feedback

| Token | Hex | Uso |
|-------|-----|-----|
| `error` | `#ffb4ab` | Erros de validação |
| `on-error` | `#690005` | Texto sobre erro |
| `error-container` | `#93000a` | Container de erro |

### Texto & Contorno

| Token | Hex | Uso |
|-------|-----|-----|
| `on-surface` | `#e2e2e9` | Texto primário (Platina Puro) |
| `on-surface-variant` | `#d0c5af` | Texto secundário (Alumínio Polido) |
| `on-background` | `#e2e2e9` | Texto sobre fundo |
| `outline` | `#99907c` | Bordas e separadores |
| `outline-variant` | `#4d4635` | Bordas sutis |

### Cores Semânticas Adicionais (Extensão da Paleta)

| Cor | Hex | Semântica |
|-----|-----|-----------|
| Verde Liquidação | `#10B981` | Valorização, ganho realizado |
| Platina Puro | `#F8FAFC` | Texto de máximo contraste |
| Alumínio Polido | `#94A3B8` | Metadados secundários |
| Aço Frio | `#64748B` | Tickers, metadados terciários |

---

## Tipografia

### Famílias de Fonte

| Família | Papel | Uso |
|---------|-------|-----|
| **Chivo** | Títulos e Destaques | Headlines, display, nomes de ativos |
| **Plus Jakarta Sans** | Corpo e UI | Descrições técnicas, formulários, labels de UI |
| **JetBrains Mono** | Telemetria e Finanças | Valores monetários, VINs, percentuais, tickers |

### Escala Tipográfica

| Token | Família | Tamanho | Peso | Line Height | Letter Spacing |
|-------|---------|---------|------|-------------|----------------|
| `display-lg` | Chivo | 48px | 800 | 56px | -0.03em |
| `display-lg-mobile` | Chivo | 34px | 800 | 40px | -0.02em |
| `headline-lg` | Chivo | 32px | 700 | 38px | -0.02em |
| `headline-lg-mobile` | Chivo | 26px | 700 | 32px | -0.01em |
| `headline-md` | Chivo | 22px | 600 | 28px | -0.01em |
| `headline-sm` | Chivo | 18px | 600 | 24px | 0em |
| `body-lg` | Plus Jakarta Sans | 16px | 400 | 24px | 0em |
| `body-md` | Plus Jakarta Sans | 14px | 400 | 20px | 0.01em |
| `body-sm` | Plus Jakarta Sans | 12px | 400 | 16px | 0.01em |
| `ticker-lg` | JetBrains Mono | 24px | 700 | 28px | -0.02em |
| `ticker-md` | JetBrains Mono | 15px | 600 | 20px | -0.01em |
| `label-caps` | JetBrains Mono | 11px | 600 | 14px | 0.08em |

> **Regra crítica:** `JetBrains Mono` deve sempre usar `font-variant-numeric: tabular-nums` em valores financeiros para garantir estabilidade espacial em atualizações em tempo real.

---

## Espaçamento

| Token | Valor | Equivalente rem |
|-------|-------|-----------------|
| `space-xs` | 4px | 0.25rem |
| `space-sm` | 8px | 0.5rem |
| `space-md` | 16px | 1rem |
| `space-lg` | 24px | 1.5rem |
| `space-xl` | 40px | 2.5rem |
| `gutter` (mobile) | 20px | 1.25rem |
| `margin` (mobile) | 24px | 1.5rem |
| `gutter-desktop` | 32px | 2rem |
| `margin-desktop` | 48px | 3rem |

---

## Bordas & Arredondamento

| Token | Valor | Uso |
|-------|-------|-----|
| `rounded-sm` / DEFAULT | 2px / 4px | Elementos de controle primários (botões, inputs, tags) |
| `rounded-lg` | 4px / 8px | Cards, painéis de investimento |
| `rounded-xl` | 8px / 12px | Modais, sheets, superfícies amplas |
| `rounded-full` | 12px / 9999px | Avatares, badges de status |

> **Proibido:** Formas totalmente arredondadas no estilo pílula (exceto avatares). O corte deve ser sóbrio e tecnológico.

---

## Elevação & Profundidade

### Camadas de Superfície (Tonal Layers)

| Nível | Cor Base | Regra |
|-------|----------|-------|
| Nível 0 — Canvas | `#0B0D11` | Fundo base, sem ruído |
| Nível 1 — Módulos | `#111318` | Borda `1px rgba(255,255,255,0.05)` |
| Nível 2 — Cards | `#181B22` @ 85% | `backdrop-filter: blur(16px)` + realce topo |
| Nível 3 — Modais | `#222631` @ 95% | Bordas superiores `1px rgba(212,175,55,0.3)` |

### Sombras

```css
/* Sombra padrão de elevação */
box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.08);

/* Alerta de liquidez (vermelho) */
box-shadow: 0 0 20px -6px rgba(225, 29, 72, 0.3);

/* Glow dourado (primary ativo) */
box-shadow: 0 0 8px rgba(242, 202, 80, 0.8);
```

---

## Componentes

### Botões

```
Primário (Aporte / Comprar Cotas):
  background: linear-gradient(#D4AF37, #B89326)
  color: #0B0D11
  font-weight: 700
  border-radius: 4px

Secundário (Cockpit / Telemetria):
  background: transparent
  border: 1px solid rgba(255,255,255,0.15)
  color: #F8FAFC
  hover: glow vermelho suave

Destrutivo (Saída de Posição):
  background: #181B22
  border: 1px solid #E11D48
  color: #E11D48
  font-family: JetBrains Mono
```

### Cards de Ativo

- Proporção widescreen cinematográfica para foto do modelo
- Rodapé com: Rendimento Alvo (âmbar/verde), Preço da Fração (mono), Barra de Progresso (2px, brilho metálico)

### Badges de Proveniência & Status

- `label-caps` (JetBrains Mono) em caixa alta
- **Verified Provenance:** fundo `#181B22`, borda ouro champanhe + ícone escudo
- **IPO Live:** indicador pulsante `#E11D48` + texto "CAPTAÇÃO ABERTA"

### Input Fields

```css
background: #0B0D11;
border: 1px solid #222631; /* outline-variant */
border-radius: 4px;
font-family: JetBrains Mono;
color: #e2e2e9;

:focus {
  border-color: #D4AF37;
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.15);
}
```

---

## Grid & Layout

| Breakpoint | Colunas | Margin | Gutter | Contenção |
|-----------|---------|--------|--------|-----------|
| Mobile (< 768px) | 4 fluidas | 1.5rem | 1.25rem | 100% |
| Tablet (768–1199px) | 8 fluidas | 1.5rem | 1.5rem | 100% |
| Desktop (≥ 1200px) | 12 colunas | 3rem | 2rem | 1440px |

### Divisão do Painel (Desktop)
- **7 colunas:** Módulo visual do ativo (galeria, vídeo, histórico)
- **5 colunas:** Livro de ordens + Ficha de proveniência

---

## Google Fonts — Import

```html
<link href="https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,600;0,700;0,800;1,600&family=JetBrains+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
```
