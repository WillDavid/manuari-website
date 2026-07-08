# VISUAL_DESIGN.md — Guia Visual do Site Manuari

Documento detalhado cobrindo cada aspecto visual do site: layout, cores, tipografia, componentes,
estados, animações, responsividade e interações.

---

## 1. PALETA DE CORES

| Cor | Hex | Uso |
|-----|-----|-----|
| **Vermelho Manuari** | `#e94b35` (var: `--manuari-red`) | Links hover, badges, elementos de destaque |
| **Vermelho CTA** | `#ff4425` | Botões CTA (hero B2B, CTA final), backgrounds de seções CTA, badge |
| **Vermelho botão WA** | `#ff6a2b` | Botão principal do Modal Orçamento |
| **Verde WhatsApp** | `#25d366` | Floating button WA, botão "Pedir no WhatsApp" |
| **Gradiente Instagram** | `#f58529 → #dd2a7b → #8134af` | Floating button Instagram |
| **Preto escuro** | `#111` (var: `--dark`) | Background footer, nav links, tags ativas, botões "Ver Todos" |
| **Preto suave** | `#1c1c1c` (var: `--dark-soft`) | Referenciado mas pouco usado diretamente |
| **Cinza fundo cards** | `#f7f7f7` / `#f3f3f3` / `#f2f2f2` | Background de cards B2B, image wrappers, passos |
| **Texto principal** | `#1A1A1A` | Nav links, textos principais |
| **Texto secundário** | `#666` / `#555` | Descrições, breadcrumbs, contagem de resultados, specs |
| **Texto terciário** | `#bbb` / `#999` | Links footer, copyright |
| **Bordas** | `#eee` / `#ddd` / `#ccc` | Divisórias, inputs, thumbs de galeria |
| **Amarelo badge** | `#FFD700 → #FFA500` (gradiente linear) | Badge "Em Alta" nos cards de produto |

---

## 2. TIPOGRAFIA

- **Família**: `system-ui, Avenir, Helvetica, Arial, sans-serif` (fallback: `system-ui, sans-serif` no App.vue)
- **Peso base**: 400
- **Pesos usados**: 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold)
- **Tamanhos**:
  - Hero B2B: 2.6rem (desktop) → 1.75rem (mobile small)
  - Títulos seção: 1.8rem (CTA) / 1.4rem (semelhantes) / 1rem (specs)
  - Nome produto detail: 1.6rem (desktop) → 1.3rem (mobile)
  - Nome produto card: 0.9rem
  - Preço detail: 2rem (desktop) → 1.8rem (mobile)
  - Preço card: 0.85rem
  - Nav links: 0.95rem (desktop) → 1rem (mobile)
  - Footer: 0.9rem base, 1rem títulos, 0.8rem copyright
  - Breadcrumb: 0.8rem
  - Tipo produto card: 0.7rem
  - Badge "Em Alta": 0.6rem
- **Text transform**: Uppercase nos títulos do footer e no tipo de produto nos cards
- **FontAwesome**: CDN 6.5.1 (ícone star no badge "Em Alta")

---

## 3. BREAKPOINTS RESPONSIVOS

| Breakpoint | Largura | Grid Produtos | Product Carousel | Layout |
|-----------|---------|---------------|-------------------|--------|
| Desktop | > 1024px | 4 colunas | 4 slides | Sidebar + Grid, padding 2rem 12rem |
| Tablet | 768px–1024px | 3 colunas | 3 slides | Sidebar menor, padding 1.5rem |
| Mobile | < 768px | 2 colunas | 2 slides | Full width, padding 1rem, sem sidebar |
| Mobile small | < 520px | — | — | Ajustes B2B hero/CTA |

---

## 4. LAYOUT GLOBAL

### 4.1 App.vue — Layout Raiz

Estrutura flexbox vertical ocupando 100vh:
```
┌─────────────────────────────┐
│         AppHeader           │
├─────────────────────────────┤
│  .container (flex: 1)       │
│  ┌───────────────────────┐  │
│  │    ModalOrcamento     │  │  ← fixo sobreposto
│  │    <router-view />    │  │
│  │    WhatsAppFloat      │  │  ← fixed bottom-right
│  │    InstagramFloat     │  │  ← fixed acima do WA
│  └───────────────────────┘  │
├─────────────────────────────┤
│         AppFooter           │
└─────────────────────────────┘
```

- `.container`: padding `2rem 12rem` (desktop) → `1.5rem` (tablet) → `1rem` (mobile)
- `min-height: 100vh` na `.app-layout`
- Background padrão: branco

### 4.2 style.css — Reset Global

- `margin: 0` e `box-sizing: border-box` no `*`
- `html, body, #app`: `height: 100%`
- Suporte a `prefers-color-scheme: light` (cores padrão claras)

---

## 5. COMPONENTES

### 5.1 AppHeader.vue

```
┌──────────────────────────────────────────────────────────┐
│                  [LOGO MANUARI - 250px]                   │  ← .header (bg white, padding 1.2rem 1rem)
│                                                [☰]      │  ← hamburger (escondido desktop)
├──────────────────────────────────────────────────────────┤
│   Todos │ Canecas │ Xícaras │ Azulejos │ Bottons │ ...   │  ← .submenu (flex, gap 2.5rem)
└──────────────────────────────────────────────────────────┘
```

**Comportamento:**
- **Desktop**: Logo centralizada, menu horizontal abaixo com links do Supabase ordenados por `TIPO_ORDER`
- **Mobile (< 768px)**: Logo alinhada à esquerda (160px), hamburger (☰) à direita, menu é um dropdown vertical que abre/fecha ao clicar
- **Links**: cor `#1A1A1A`, peso 500, underline animado com `::after` pseudo-elemento
  - Hover: cor `#bab0b0`
  - Underline: 2px vermelho Manuari (`#e94b35`), animado de 0 → 100% width com transição 0.25s ease
  - Ativo (router-link-active): underline fixo
- **Logo**: 250px largura (max 70% da tela)
- **Header**: borda inferior 1px `#eee`

### 5.2 AppFooter.vue

```
┌──────────────────────────────────────────────────────────┐
│  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐   │
│  │PRODUTOS │  │INFORMAÇÕES│  │ATENDIMENTO│  │ SOCIAL  │   │
│  │Canecas  │  │Sobre     │  │WhatsApp   │  │ [IG]    │   │
│  │Xícaras  │  │Privacidade│  │Email      │  │ [TikTok]│   │
│  │Azulejos │  │Entrega   │  │Horário    │  │ [WA]    │   │
│  │Bottons  │  │Termos    │  │Sem loja   │  │         │   │
│  │Para Emp.│  │          │  │física     │  │         │   │
│  └─────────┘  └──────────┘  └──────────┘  └─────────┘   │
├──────────────────────────────────────────────────────────┤
│    © 2026 Manuari · CNPJ 61.175.754/0001-77 · Manaus–AM   │
└──────────────────────────────────────────────────────────┘
```

- **Background**: `#111` (preto escuro)
- **Cor texto**: `#eaeaea` (base), links `#bbb`, títulos `#fff`
- **Grid**: `repeat(auto-fit, minmax(220px, 1fr))`, gap 2.5rem
- **Padding**: 3rem 2rem (desktop) → 2rem 1rem (mobile)
- **Títulos h3**: uppercase, 1rem, cor `#fff`
- **Links**: hover → `#e94b35` (vermelho)
- **Social icons**: SVG inline, 42px quadrados, borda 1px `#444`, hover bg `#c9c7c7` + borda `#e94b35`
  - Instagram: SVG path do ícone do Instagram
  - TikTok: SVG path do ícone do TikTok
  - WhatsApp: SVG path do ícone do WhatsApp
- **Info atendimento**: labels `#bbb`, valores `#eee`
- **"Não temos loja física"**: bold, cor `#fff`
- **Copyright**: borda superior 1px `#222`, centralizado, cor `#999`, 0.8rem

### 5.3 WhatsAppFloat.vue

```
              ┌────┐
              │ WA │  ← círculo verde 56x56px
              └────┘
```

- **Posição**: fixed, `bottom: 1.2rem`, `right: 1.2rem`
- **Tamanho**: 56x56px
- **Background**: `#25d366` (verde WhatsApp)
- **Sombra**: `0 6px 16px rgba(0,0,0,0.25)`
- **z-index**: 999
- **SVG**: 28x28px do ícone WhatsApp, cor branca
- **Hover**: `scale(1.08)` com transição 0.2s ease
- **Link**: abre em nova aba com mensagem dinâmica

### 5.4 InstagramFloat.vue

```
              ┌────┐  ← acima do WA
              │ IG │
              └────┘
              ┌────┐
              │ WA │
              └────┘
```

- **Posição**: fixed, `bottom: 5.5rem`, `right: 1.2rem` (acima do WhatsApp)
- **Tamanho**: 56x56px
- **Background**: gradiente linear `45deg, #f58529, #dd2a7b, #8134af`
- **Sombra**: `0 6px 16px rgba(0,0,0,0.25)`
- **z-index**: 999
- **SVG**: 26x26px do ícone Instagram, cor branca
- **Hover**: `scale(1.08)` com transição 0.2s ease

### 5.5 ModalOrcamento.vue

```
┌──────────────────────────────────────┐
│  overlay: rgba(0,0,0,0.55) + blur    │
│  ┌────────────────────────────────┐  │
│  │                          [✕]   │  │ ← botão fechar (canto superior direito)
│  │      [LOGO MANUARI 200px]      │  │
│  │                                │  │
│  │  Que tal uma caneca única      │  │ ← título 21px bold
│  │  ou um botton com sua arte?    │  │
│  │                                │  │
│  │  Um atendente pode criar       │  │ ← texto 14px, cor #666
│  │  do zero personalizado...      │  │
│  │                                │  │
│  │  ┌──────────────────────────┐  │  │
│  │  │  WA  Falar com atendente │  │  │ ← bg #ff6a2b, branco, bold
│  │  └──────────────────────────┘  │  │
│  │  ┌──────────────────────────┐  │  │
│  │  │  Continuar Navegando     │  │  │ ← bg #f4f4f4, texto #ff6a2b
│  │  └──────────────────────────┘  │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

- **Overlay**: fixed inset 0, `rgba(0,0,0,0.55)`, backdrop-filter blur 5px, z-index 9999
- **Modal box**: 380px max-width, padding 34px 28px, border-radius 18px, bg branco, sombra `0 25px 60px rgba(0,0,0,0.18)`
- **Animação entrada**: `modalEnter` 0.35s ease — opacity 0→1 + translateY 25px→0 + scale 0.96→1
- **Logo**: 200px
- **Botão fechar**: ✕, posição absoluta top 12px right 14px, cor #999, hover #333
- **Botão WA**: bg `#ff6a2b`, texto branco, border-radius 12px, padding 15px, peso 600, hover scale(1.03) + sombra `0 10px 20px rgba(255,106,43,0.25)`
- **Botão Continuar**: bg `#f4f4f4`, texto `#ff6a2b`, border-radius 10px, padding 13px
- **Disparo**: 10 segundos após mount
- **Cookie**: 6h cooldown (`modal_orcamento`)

### 5.6 HeroCarousel.vue

```
┌──────────────────────────────────────────────────────────────────────┐
│  ‹                                                  ›               │
│                                                                      │
│              [BANNER IMAGEM - 1920x650 aspect ratio]                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- **Container**: `aspect-ratio: 1920 / 650`
- **Imagem**: `object-fit: cover`, ocupa 100% do container
- **Botões navegação**: `<` esquerda, `>` direita
  - Posição: absoluta, top 50%, traduzido -50%
  - Background: `rgba(0,0,0,0.35)`
  - Tamanho: 42x42px (desktop) → 34x34px (mobile)
  - Fonte: 2rem (desktop) → 1.4rem (mobile), cor branca
  - Border-radius: 8px
- **Autoplay**: 5 segundos
- **Pausa**: hover no carousel
- **Shuffle**: slides embaralhados no mount
- **Links**: internos usam `<RouterLink>`, externos usam `<a target="_blank">`

### 5.7 CardProduct.vue

```
┌─────────────────┐
│ ┌─────────────┐ │
│ │             │ │ ← image-wrapper aspect-ratio 1:1, bg #f3f3f3
│ │   [FOTO]    │ │    hover troca para segunda imagem (se existir)
│ │   [Em Alta] │ │ ← badge canto superior direito (opcional)
│ │             │ │
│ └─────────────┘ │
│   CANECAS       │ ← tipo (uppercase, 0.7rem, opacity 0.6, centralizado)
│   Nome Produto  │ ← nome (0.9rem, peso 600, centralizado)
│   R$ 34,90 –    │ ← preço (0.85rem, peso 500, opacity 0.65, centralizado)
│   R$ 46,90      │
└─────────────────┘
```

- **Card**: flex column, cursor pointer
- **Hover card**: `scale(1.04)` com transição 0.15s ease
- **Image wrapper**: aspect-ratio 1:1, overflow hidden, bg `#f3f3f3`
- **Imagem**: `object-fit: cover`, 100% width/height
- **Badge "Em Alta"**: posição absoluta top 8px right 8px, fundo gradiente `#FFD700 → #FFA500`, texto branco bold 0.6rem, padding 4px 10px, border-radius 20px, sombra `0 2px 12px rgba(255,165,0,0.6)`, animação `pulse-gold` (scale 1 → 1.05 → 1, 2s, infinite)
- **Clique**: navega para `/produtos/:tipo/:slug`

### 5.8 ProductCarousel.vue

```
┌──────────────────────────────────────────────────────────────┐
│  ‹  │ [Card] [Card] [Card] [Card] │  ›                      │
│     │ ← viewport com overflow hidden →    │                  │
└──────────────────────────────────────────────────────────────┘
```

- **Estrutura**: container flex com botões esquerda/direita e viewport central
- **Track**: flex, transição `transform 0.35s ease`, move-se via `translateX(-percent%)`
- **Slides**: flex-basis 25% (desktop) / 33.33% (tablet) / 50% (mobile), padding 0 0.75rem
- **Viewport**: overflow hidden, padding 2rem 0
- **Botões**: `<` e `>`, sem background, 2.4rem (desktop) → 2rem (mobile), cor `#333`
  - Desabilitado: opacity 0.3
- **Autoplay**: delay random 0-2000ms, depois 2000ms entre slides
  - Pausa em hover e touchstart
- **Shuffle**: opcional via prop, embaralha no mount

### 5.9 Breadcrumb.vue

```
Início › Canecas › Nome do Produto
```

- **Fonte**: 0.8rem
- **Links clicáveis**: cor `#000`, cursor pointer, hover underline
- **Item atual**: opacity 0.6
- **Separador**: `›` (espaçado)

### 5.10 Specifications.vue

```
┌──────────────────┬──────────────────┬──────────────────┐
│   DESCRIÇÃO      │ CARACTERÍSTICAS  │     DÚVIDAS      │
│                  │                  │                  │
│ Texto descritivo │ Material: Cer.   │ Posso usar...?   │
│ do tipo de       │ Capacidade: 325  │ Não. Use esponja │
│ produto...       │ Peso: 350g       │                  │
│                  │ Altura: 9.5cm    │ Pode ir micro?   │
│                  │ ...              │ Sim.              │
│                  │                  │                  │
└──────────────────┴──────────────────┴──────────────────┘
```

- **Layout**: grid 3 colunas, gap 1.5rem
  - Mobile (< 768px): 1 coluna, divisórias horizontais
- **Bordas**: top/bottom 1px `#eee` no container
- **Divisórias laterais**: border-left 1px `#eee`, padding-left 1.5rem
- **Títulos h3**: 1rem, peso 600, cor `#222`
- **Texto**: 0.85rem, line-height 1.45, cor `#555`
- **FAQ**: h4 com 0.9rem peso 600 cor `#333`, p com 0.8rem cor `#666`
- **Extra (canecas)**: grid 2 colunas (texto + imagem 360px), descrição do modelo com alça colorida
- **Dados por tipo**: canecas, xicaras, azulejos, bottons — cada um com descrição, características e FAQ específicos

### 5.11 SkeletonCard.vue

```
┌───────────────┐
│               │
│   shimmer     │  ← aspect-ratio 1:1.25
│   animation   │
│               │
└───────────────┘
```

- **Formato**: aspect-ratio 1:1.25, border-radius 6px
- **Background**: gradiente linear `#eee → #f5f5f5 → #eee` (3 stops)
- **Animação**: `shimmer` 1.4s infinite — background-position -400px → 400px
- **Background size**: 400% 100%

---

## 6. VIEWS (PÁGINAS)

### 6.1 HomeView.vue

```
┌──────────────────────────────────────────────────────────┐
│                  HeroCarousel (full width)                │
├──────────────────────────────────────────────────────────┤
│  <h1> (hidden, SEO only)                                 │
├──────────────────────────────────────────────────────────┤
│  ──── Mais Vistos ────  (h2 com border-bottom preta)     │
│  [SkeletonCard ×4] ou [ProductCarousel]                  │
├──────────────────────────────────────────────────────────┤
│  ──── Lançamentos ────                                   │
│  [SkeletonCard ×4] ou [ProductCarousel]                  │
├──────────────────────────────────────────────────────────┤
│  ──── Para Você / Tag do Dia ────                        │
│  [SkeletonCard ×4] ou [ProductCarousel]                  │
├──────────────────────────────────────────────────────────┤
│  ──── Tag Aleatória ──── (se houver)                     │
│  [ProductCarousel]                                       │
├──────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐  │
│  │     Ver todos os produtos — Canecas, Bottons...    │  │ ← botão preto redondo
│  └────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐  │
│  │  Não encontrou o que procura?                      │  │
│  │  Fale direto com a Manuari...                      │  │ ← bg #ff4425
│  │  ┌──────────────────────┐                          │  │
│  │  │  Falar no WhatsApp   │                          │  │ ← botão branco
│  │  └──────────────────────┘                          │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

**Elementos visuais:**
- **h1**: `visually-hidden` (fora da tela, apenas para SEO)
- **h2**: centralizado, padding 1.5rem 0, border-bottom 1px solid black
- **Skeleton row**: grid de 4/3/2 colunas (responsive), gap 1.2rem, margin 1.5rem 0
- **Botão "Ver todos"**: bg `#111`, texto branco, border-radius 30px, padding 0.9rem 2.2rem, peso 600, centralizado
  - Hover: bg `#e94b35` + scale(1.04), transição 0.25s ease
- **CTA Final**: margin-top 2rem, bg `#ff4425`, texto branco, border-radius 24px, padding 2rem 1rem, centralizado
  - h2: 1.8rem, margin-bottom 1rem, sem borda
  - p: max-width 520px, margin auto
  - Botão WhatsApp: bg branco, texto preto, border-radius 10px, padding 1rem 2.5rem, peso 600

### 6.2 ProductsView.vue

```
┌──────┬──────────────────────────────────────────────────┐
│ CAT  │  Breadcrumb                                      │
│      │  ┌────────────────────────────────────────────┐  │
│ Todas│  │ [chip cat1] [chip cat2] ... (mobile only)  │  │
│ Cat1 │  └────────────────────────────────────────────┘  │
│ Cat2 │  ──── Canecas Personalizados ────                │
│ Cat3 │  [Buscar...] [Ordenar ▼] [50 por página ▼]      │
│      │  Mostrando X de Y canecas, bottons e mais        │
│      │  ┌────────────────────────────────────────────┐  │
│      │  │ [Card] [Card] [Card] [Card]                │  │
│      │  │ [Card] [Card] [Card] [Card]               │  │
│      │  │ ...                                        │  │
│      │  └────────────────────────────────────────────┘  │
│      │         ‹ Anterior  1 / 5  Próxima ›             │
│      │         [50 ▼] (mobile only)                     │
└──────┴──────────────────────────────────────────────────┘
```

**Elementos visuais:**
- **Layout**: grid 2 colunas (180px sidebar + 1fr grid) desktop, 1 coluna mobile
- **Sidebar (desktop only)**: 180px (desktop) → 140px (tablet), fonte 0.85rem
  - Título h4: 0.9rem, margin-bottom 0.5rem
  - Itens: cursor pointer, padding 0.3rem 0, opacity 0.75
  - Hover: opacity 1
  - Ativo: peso 600, opacity 1
- **Chips categorias (mobile only)**: flex wrap, gap 0.5rem, margin-bottom 1rem
  - bg `#f0f0f0`, border-radius 20px, padding 0.4rem 0.8rem, 0.8rem
  - Ativo: bg `#111`, cor branca
- **Controls**: margin-bottom 1.5rem
  - Input busca: flex 1, padding 0.6rem 1rem, border 1px `#ddd`, border-radius 8px, 0.9rem
    - Focus: border-color `#e94b35`
  - Selects: padding 0.6rem 1rem, border 1px `#ddd`, border-radius 8px, 0.9rem, bg branco
  - Results count: 0.85rem, cor `#666`
- **Mobile controls**: bg `#f9f9f9`, padding 1rem, border-radius 12px, margin-bottom 1rem
  - Search/sort em coluna (não em linha)
- **Grid produtos**: 4 cols (desktop) / 3 cols (tablet) / 2 cols (mobile), gap 2.2rem (desktop) → 1rem (mobile)
- **Empty state**: centralizado, padding 4rem 2rem
  - p: 1.2rem peso 600
  - span: cor `#666`
  - botão "Limpar filtros": bg `#e94b35`, branco, border-radius 8px, padding 0.6rem 1.5rem
- **Paginação**: flex centralizado, gap 1rem, margin-top 2rem, border-top 1px `#eee`
  - Botões: padding 0.5rem 1rem, border 1px `#ddd`, bg branco, border-radius 6px
  - Desabilitado: opacity 0.5, cursor not-allowed
  - Hover: bg `#f5f5f5`
  - Page info: 0.9rem, cor `#666`

### 6.3 ProductDatailsView.vue

```
┌──────────────────────────────────────────────────────────┐
│  Breadcrumb                                              │
├──────────────────────┬───────────────────────────────────┤
│                      │                                   │
│  ┌────┬───────────┐  │  Nome do Produto (h1)             │
│  │thumb│           │  │                                   │
│  │thumb│  IMAGEM   │  │  Escolha a cor:                   │
│  │thumb│  PRINCIPAL│  │  [var1] [var2] [var3]             │
│  │thumb│  420px    │  │                                   │
│  │     │           │  │  ┌───────────────────────────┐    │
│  └────┴───────────┘  │  │ TABELA DE PREÇOS (bottons) │    │
│                      │  │ Qtd │ 33mm │ 44mm │ 58mm │    │
│                      │  │ 10  │ R$X  │ R$Y  │ R$Z  │    │
│                      │  └───────────────────────────┘    │
│                      │                                   │
│                      │  R$ 34,90 (preço, 2rem)           │
│                      │                                   │
│                      │  ┌───────────────────────────┐    │
│                      │  │ WA  Pedir no WhatsApp     │    │
│                      │  └───────────────────────────┘    │
└──────────────────────┴───────────────────────────────────┘
├──────────────────────────────────────────────────────────┤
│  Specifications (3 colunas)                              │
├──────────────────────────────────────────────────────────┤
│  ──── Produtos Semelhantes ────                           │
│  [ProductCarousel]                                       │
└──────────────────────────────────────────────────────────┘
```

**Elementos visuais:**
- **Layout**: grid 2 colunas (1.2fr + 1fr), gap 2rem, padding 2rem 0
  - Mobile (< 768px): 1 coluna, gap 1.5rem
- **Galeria**: flex row (desktop) / flex column (mobile)
  - **Thumbnails**: coluna vertical 60x60px, gap 0.5rem
    - Mobile: linha horizontal, 48x48px
  - Opacity 0.6, border 1px `#ddd`
  - Ativa: opacity 1, border-color `#000`
  - **Imagem principal**: max-width 420px, `object-fit: contain`
- **Info**:
  - h1: 1.6rem (desktop) → 1.3rem (mobile, centralizado)
  - h4 (rótulo seletor): 0.95rem
  - **Botões variação**: padding 0.45rem 0.9rem, border 1px `#ccc`, bg branco, 0.85rem
    - Selecionado: border-color `#000`, peso 600
    - Mobile: centralizado
  - **Tabela de preços**:
    - Container: margin 1.5rem 0
    - Tabela: border-collapse collapse, border 2px `#111`, border-radius 8px, overflow hidden
    - th: bg `#111`, cor branca, padding 0.6rem, centralizado, peso 600, uppercase, 0.75rem (0.8rem bottons)
    - td: padding 0.7rem 0.5rem, centralizado, border-bottom 1px `#eee`
    - .qty: peso 600, alinhado à esquerda, padding-left 1rem
    - .unit: peso 600, 1rem
    - Asterisco: 0.75rem, peso 700, cor `#e94b35`
    - Nota: margin-top 0.75rem, 0.8rem, cor `#555`
  - **Preço**: 2rem (desktop) → 1.8rem (mobile, centralizado), margin 1.5rem 0
  - **Botão WhatsApp**: display flex, gap 0.5rem, padding 1rem, bg `#25d366`, texto branco, peso 600, border-radius 2px
    - Mobile: fixed bottom 0, full width, border-radius 0, z-index 10
  - Texto do botão: "Pedir no WhatsApp" ou "Fazer Orçamento" (quando sem preço definido)
- **Breadcrumb wrapper**: grid-column 1 / -1, 0.8rem, cor `#777`
- **Semelhantes**: margin-top 3rem, padding-top 2rem, border-top 1px `#eee`
  - h2: 1.4rem (desktop) → 1.2rem (mobile), centralizado, margin-bottom 1rem

### 6.4 AboutView.vue

```
┌──────────────────────────────────────────────────────────┐
│  ──── Sobre a Manuari ────  (h2 com border-bottom)       │
│                                                          │
│  Blocos de parágrafos de texto corrido, peso 400,        │
│  com alguns <strong> para destaque.                      │
│  Último bloco termina com "Manuari.                      │
│  Do seu jeito, para momentos que realmente importam."    │
├──────────────────────────────────────────────────────────┤
│  ──── Leia também sobre ────                             │
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ Política │ │  Nossos  │ │ Política │ │   Para   │   │
│  │   de     │ │  Termos  │ │   de     │ │ Empresas │   │
│  │Privacidade│ │          │ │ Entrega  │ │          │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
└──────────────────────────────────────────────────────────┘
```

- **Título h2**: centralizado, padding 1.5rem 0, border-bottom 1px solid black
- **Texto**: flex column, texto justificado (span)
- **Cards "Leia também"**: flex com `justify-content: space-around`, flex wrap, gap 1rem
  - Links: cor vermelha (`red`), sem decoração
  - Hover: cor `rgb(96, 95, 95)`, transição 0.2s

### 6.5 B2BView.vue

```
┌──────────────────────────────────────────────────────────┐
│  ┌───────────────────────┐  ┌─────────────────────────┐  │
│  │ Brindes corporativos  │  │                         │  │
│  │ personalizados para   │  │   [IMAGEM B2B BANNER]   │  │
│  │ empresas              │  │                         │  │
│  │                       │  └─────────────────────────┘  │
│  │ Canecas, bottons,     │                                │
│  │ xícaras, azulejos...  │                                │
│  │                       │                                │
│  │ ┌───────────────────┐ │                                │
│  │ │ WA Solicitar orç. │ │                                │
│  │ └───────────────────┘ │                                │
│  └───────────────────────┘                                │
├──────────────────────────────────────────────────────────┤
│  O que personalizamos                                    │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌───────┐ │
│  │Canecas │ │Xícaras │ │Azulejos│ │Bottons │ │Sob    │ │
│  │        │ │        │ │        │ │        │ │Medida │ │
│  └────────┘ └────────┘ └────────┘ └────────┘ └───────┘ │
│                                         (destaque vermelho)
├──────────────────────────────────────────────────────────┤
│  ┌───────────────────────┐  ┌─────────────────────────┐  │
│  │  [IMAGEM B2B]         │  │ Por que empresas        │  │
│  │                       │  │ escolhem a Manuari      │  │
│  └───────────────────────┘  │ • Brindes úteis...      │  │
│                              │ • Personalização...    │  │
│                              │ • RH, marketing...     │  │
│                              └─────────────────────────┘  │
├──────────────────────────────────────────────────────────┤
│  Como funciona                                           │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                │
│  │  01  │  │  02  │  │  03  │  │  04  │                │
│  │Entend│  │Defini│  │Propos│  │Produç│                │
│  │emos  │  │mos   │  │ta    │  │ão    │                │
│  └──────┘  └──────┘  └──────┘  └──────┘                │
├──────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────┐  │
│  │  Fale com um especialista em brindes corporativos  │  │
│  │  e bottons personalizados                          │  │
│  │                                                    │  │ ← bg #ff4425
│  │  ┌──────────────────────────────────┐              │  │
│  │  │ WA  Solicitar orçamento agora    │              │  │ ← botão branco
│  │  └──────────────────────────────────┘              │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

**Elementos visuais:**
- **Container**: max-width 1200px, margin auto, padding 3rem 1.5rem (desktop) → 2rem 1rem (mobile)
- **Hero**: grid 1.1fr + 0.9fr (desktop), gap 3rem
  - Mobile (< 1024px): 1 coluna, texto primeiro, imagem depois
  - h1: 2.6rem (desktop) → 2.1rem (mobile < 768px) → 1.75rem (mobile < 520px), line-height 1.2
  - .hero-sub: 1.2rem (desktop) → 1rem (mobile)
  - .hero-desc: cor `#444`, max-width 520px
  - Botão CTA hero: inline-flex, gap 8px, padding 1rem 2.5rem, bg `#ff4425`, texto branco, border-radius 10px, peso 600, margin-top 2rem
  - Imagem: 100% width, border-radius 20px
- **Seção Produtos**: grid `repeat(auto-fit, minmax(240px, 1fr))`, gap 1.5rem
  - Mobile (< 768px): 2 colunas; (< 520px): 1 coluna
  - Cards: padding 1.5rem, border-radius 16px, bg `#f7f7f7`
  - Card destaque (Sob Medida): bg `#ff4425`, texto branco
- **Seção Valor**: grid 0.9fr + 1.1fr (desktop), gap 3rem, margin 6rem 0 (desktop) → 4rem (mobile)
  - Mobile (< 1024px): 1 coluna, imagem primeiro
  - Imagem: 100% width, border-radius 20px
  - Lista: cada `<li>` com margin-bottom 0.8rem
- **Seção Processo (Como funciona)**: grid `repeat(auto-fit, minmax(200px, 1fr))`, gap 1.5rem
  - Mobile (< 768px): 2 colunas; (< 520px): 1 coluna
  - Passos: padding 1.5rem, border-radius 16px, bg `#f2f2f2`
  - Número (span): bold, 1.2rem
- **CTA Final**: margin-top 6rem, padding 4rem 2rem (desktop) → 3rem 1.5rem (mobile), bg `#ff4425`, texto branco, border-radius 24px
  - Alinhamento: left (desktop) → center (mobile < 1024px)
  - h2: 1.6rem (mobile < 520px)
  - Botão: inline-flex, gap 8px, padding 1rem 2.5rem, bg branco, texto preto, border-radius 10px, peso 600

### 6.6 PrivacyPolicyView / DeliveryPolicy / OurTermsView

```
┌──────────────────────────────────────────────────────────┐
│  ──── Título da Política ────  (h2 com border-bottom)    │
│                                                          │
│  Parágrafos e seções com h3, organizados em              │
│  flex column. Texto com alinhamento justificado.         │
│  Listas com bullets (<ul>/<li>).                         │
│  Data de atualização no final.                           │
├──────────────────────────────────────────────────────────┤
│  ──── Leia também sobre ────                             │
│  Cards de navegação (3 cards)                            │
└──────────────────────────────────────────────────────────┘
```

- **Layout**: idêntico ao AboutView — mesmo CSS (`.content-about`, `.content-about-cards`, `.card-links`)
- **h2**: centralizado, padding 1.5rem 0, border-bottom 1px solid black
- **h3**: subseções com margem
- **ul/li**: listas com bullets
- **.legal-update**: data da última atualização
- **Cards finais**: 3 cards (em vez de 4 no AboutView), links vermelhos

### 6.7 NotFoundView.vue

```
          404
  Página não encontrada
```

Mínimo — apenas h1 + p centralizados.

---

## 7. ESTADOS

### 7.1 Loading
- **Skeleton shimmer**: Cards fantasmas com animação de brilho horizontal (gradient 3 stops, background-position animado)
- **Texto "Carregando produto..."**: centralizado na ProductDatailsView
- **Skeleton grids**: 4/3/2 colunas dependendo do breakpoint

### 7.2 Empty State
- **ProductsView**: "Nenhum produto encontrado" + subtítulo + botão "Limpar filtros" (bg `#e94b35`)

### 7.3 Not Found
- **ProductDatailsView**: "Produto não encontrado." centralizado
- **NotFoundView**: "404" + "Página não encontrada"

### 7.4 Hover States
- **Cards produto**: scale(1.04), imagem troca para segunda foto
- **Botões**: scale(1.03) ou scale(1.08) dependendo do componente
- **Nav links**: cor muda para `#bab0b0` + underline animado
- **Links footer**: cor muda para `#e94b35`
- **Tags/chips**: opacity/background muda
- **Botões variação**: border-color muda para `#000`

### 7.5 Active/Selected States
- **Filtros categoria**: peso 600 (desktop) / bg `#111` texto branco (mobile chips)
- **Variação selecionada**: border-color `#000`, peso 600
- **Thumb galeria**: opacity 1, border-color `#000`
- **Nav router-link-active**: underline fixo

### 7.6 Disabled States
- **Botões carousel**: opacity 0.3, cursor default
- **Botões paginação**: opacity 0.5, cursor not-allowed

---

## 8. ANIMAÇÕES E TRANSIÇÕES

| Elemento | Animação | Duração | Timing |
|----------|----------|---------|--------|
| **Modal Orçamento** | opacity + translateY + scale | 0.35s | ease |
| **Badge "Em Alta"** | pulse-gold (scale) | 2s | ease-in-out infinite |
| **Skeleton shimmer** | background-position shift | 1.4s | linear infinite |
| **Card produto hover** | scale | 0.15s | ease |
| **Nav underline** | width 0→100% | 0.25s | ease |
| **ProductCarousel track** | translateX | 0.35s | ease |
| **HeroCarousel slide** | opacity | 0.4s | ease |
| **Floating buttons hover** | scale | 0.2s | ease |
| **Nav link hover** | color | 0.3s | — |
| **Filter chips** | background/color | 0.2s | — |
| **Card links hover** | color | 0.2s | — |
| **Botão "Ver todos" hover** | background + scale | 0.25s | ease |

---

## 9. ACESSIBILIDADE

- `aria-label` nos floating buttons (WhatsApp, Instagram)
- `aria-label` nos slides do HeroCarousel
- `alt` e `title` em todas as imagens de produto e banner
- `loading="lazy"` em imagens de lista/cards (exceto hero: `eager`)
- `fetchpriority="high"` em imagem principal do hero
- `decoding="async"` em todas as imagens
- `visually-hidden` h1 para SEO (HomeView)
- Meta `theme-color`: `#ff4425`
- Meta `mobile-web-app-capable` e `apple-mobile-web-app-capable`

---

## 10. SEO VISUAL

- **Favicon**: `/manuari-logo.png` (também como apple-touch-icon)
- **Open Graph**: site_name, title, description, image (1200x630), url, type, locale
- **Twitter Card**: summary_large_image com imagem, title, description
- **Meta tags**: description, keywords, robots, author, copyright, geo.region, geo.placename
- **Canonical URL**: atualizada dinamicamente via JavaScript
- **JSON-LD estruturado**: Organization, LocalBusiness, WebSite (fixos no HTML) + Product/CollectionPage (dinâmicos via useJsonLd)
