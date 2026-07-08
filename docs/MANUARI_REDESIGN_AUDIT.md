# MANUARI_REDESIGN_AUDIT.md — Auditoria Completa

> Gerado em: 2026-07-08 | Fase 1 do Redesign

---

## 1. RESUMO DA ARQUITETURA

- **Stack**: Vue 3 (Options API + setup() para composables) + Vue Router 4 + Vite 7 + Supabase REST API
- **Gerenciador de pacotes**: npm (package-lock.json presente)
- **Build**: vite build com prebuild script (generate-sitemap.mjs)
- **Deploy**: Vercel (SPA fallback + serverless function /api/seo-image.js)
- **CSS**: style.css global + scoped styles por componente (sem pré-processador)
- **Estado**: Sem store (Pinia/Vuex). Estado via composables (usePreferencias) + localStorage
- **Ícones**: FontAwesome CDN 6.5.1 + SVGs inline (WhatsApp no footer/floats)
- **Testes**: Nenhum encontrado
- **Lint**: Nenhuma configuração encontrada
- **SEO**: Meta tags dinâmicas + JSON-LD + sitemap + canonical

---

## 2. FLUXO ATUAL DE DADOS

```
Supabase REST API
    │
    ▼
src/services/supabaseApi.js  (fetchWithCache + normalizeProduct + normalizeVariation)
    │
    ├──► Views (HomeView, ProductsView, ProductDatailsView)
    │       │
    │       ├──► Componentes (CardProduct, ProductCarousel, HeroCarousel, Breadcrumb, Specifications)
    │       │
    │       └──► Composables (usePreferencias, useJsonLd)
    │
    ├──► App.vue (session tracking + SEO dinâmico)
    │
    └──► AppHeader / AppFooter (fetchProductTypes para nav dinâmico)

LocalStorage:
  - cache_* (cache API com TTL 5min)
  - session_id (UUID sessão)
  - visitor_id (hash anônimo)
  - manuari_historico (preferências de navegação)
```

**Consulta crítica**: `fetchProducts()` carrega **todos** os produtos com variações e preços aninhados. HomeView e ProductsView compartilham essa consulta sem cache entre rotas.

---

## 3. LISTA DE PÁGINAS

| Rota | View | Componentes |
|------|------|-------------|
| `/` | HomeView | HeroCarousel, ProductCarousel (×4), SkeletonCard, JSON-Ld |
| `/produtos` | ProductsView | Breadcrumb, CardProduct, SkeletonCard, filtros inline, paginação, JSON-Ld |
| `/produtos/:tipo` | ProductsView | (mesmo, com filtro de tipo) |
| `/produtos/:tipo/:slug` | ProductDatailsView | Breadcrumb, Specifications, ProductCarousel, JSON-Ld |
| `/produto/:id` | ProductDatailsView | (legacy redirect para slug) |
| `/sobre` | AboutView | Cards de navegação |
| `/para-empresas` | B2BView | — |
| `/politica-privacidade` | PrivacyPolicyView | Cards de navegação |
| `/politica-entrega` | DeliveryPolicy | Cards de navegação |
| `/nossos-termos` | OurTermsView | Cards de navegação |
| `/:pathMatch(.*)*` | NotFoundView | — |
| `/seo-images/*` | Serverless function | Proxy de imagem |

---

## 4. PROBLEMAS ENCONTRADOS

### 4.1 CSS Duplicado (ALTO IMPACTO)

- **AboutView, PrivacyPolicyView, DeliveryPolicyView, OurTermsView** compartilham CSS idêntico no bloco `<style scoped>`:
  ```css
  .content-about { display: flex; flex-direction: column; }
  h2 { text-align: center; padding: 1.5rem 0; border-bottom: 1px solid black; }
  .content-about-cards { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 1rem; }
  a { text-decoration: none; color: red; }
  .card-links { display: flex; justify-content: center; text-align: center; align-items: center; }
  .card-links:hover { color: rgb(96, 95, 95); transition: 0.2s; }
  ```
  → Extrair para componente `ContentPage.vue` ou `PolicyPage.vue`

### 4.2 Valores Hardcoded (MÉDIO IMPACTO)

| Valor | Arquivos afetados | Propósito |
|-------|-------------------|-----------|
| `#e94b35` | AppHeader, AppFooter, HomeView, ProductsView, ProductDatailsView | Cor primária/variável --manuari-red |
| `#ff4425` | HomeView, B2BView, ModalOrcamento, index.html | Cor CTA |
| `#111` / `#1c1c1c` | AppHeader, AppFooter, HomeView | Preto escuro |
| `#25d366` | WhatsAppFloat, ProductDatailsView | Verde WhatsApp |
| `768px` | AppHeader, AppFooter, ProductsView, ProductDatailsView, B2BView, HeroCarousel, ModalOrcamento | Breakpoint mobile |
| `1024px` | ProductsView, B2BView, ProductCarousel, App.vue | Breakpoint tablet |
| `2rem 12rem` | App.vue | Container padding desktop |

### 4.3 Consultas Repetidas (ALTO IMPACTO)

- `fetchProducts()` carrega **TODOS** os produtos com relações aninhadas em HomeView e ProductsView
- `fetchMaisAcessados()` faz query separada (limit 6), mas os mesmos dados já vêm em fetchProducts
- `fetchProductTypes()` é chamado **duas vezes** (AppHeader + AppFooter), com cache mas sem compartilhamento de estado
- Cada ProductDatailsView detalhe dispara `registrarAcesso()` (RPC) + página anterior pode não ter terminado

### 4.4 Problemas de Responsividade (MÉDIO IMPACTO)

- `.container` no App.vue usa `padding: 2rem 12rem` — quebra em telas menores que ~1600px
- WhatsAppFloat + InstagramFloat podem sobrepor o botão fixo de compra em mobile (ProductDatailsView)
- ProductCarousel navegação por touch não tem suporte a swipe, apenas botões
- Breadcrumb pode quebrar com nomes longos de produto (sem truncamento)
- B2BView: `.passos` grid usa `minmax(200px, 1fr)` — em telas de 320px, 200px ultrapassa

### 4.5 Seções Vazias / Espaços Excessivos (ALTO IMPACTO)

- **HomeView**: "Tag do Dia" e "Tags Aleatórias" podem não renderizar, mas o `<h2>` condicional já trata. Porém `skeleton-row` sempre aparece 4× antes do loading terminar
- **HomeView**: `products` carrega todos produtos mas `lancamentos` ordena client-side — desperdício de dados
- **HomeView**: `margin-top: 4rem` no footer (AppFooter) cria espaço excessivo
- **AppHeader**: `.submenu` ocupa altura mesmo sem tipos carregados

### 4.6 Problemas de Ícones (MÉDIO IMPACTO)

- AppFooter: SVGs inline muito grandes (WhatsApp 24×24 path, Instagram 24×24 path, TikTok 32×32 path)
- WhatsAppFloat: SVG WhatsApp path duplicado (mesmo path no footer, ModalOrcamento, B2BView, ProductDatailsView)
- InstagramFloat: SVG Instagram path inline de 24×24
- **Sem estados de fallback** para FontAwesome CDN indisponível

### 4.7 Componentes com Comportamento Vazio (MÉDIO IMPACTO)

- **Breadcrumb**: sempre renderiza `› nomeProduto` mesmo quando `nomeProduto` é string vazia
- **ProductCarousel**: `shuffledProducts` pode ser array vazio sem empty state
- **CardProduct**: se `image[0]` estiver vazio/indisponível, `getSeoImageUrl` retorna undefined e `<img>` fica sem src

### 4.8 Separação de Responsabilidades (MÉDIO IMPACTO)

- `App.vue` contém lógica de SEO, sessão, eventos e layout — 200+ linhas com múltiplas responsabilidades
- `supabaseApi.js` contém fetch + normalização + analytics + cache — 380 linhas, múltiplos domínios
- `ProductDatailsView.vue` — 860+ linhas, componente mais complexo do sistema

### 4.9 Performance (MÉDIO IMPACTO)

- Consultas sem debounce na busca da ProductsView
- `fetchProducts()` sem limit/offset — sempre carrega todos
- `ProductDatailsView` faz `fetchProductsByType()` para carregar semelhantes (outra consulta completa)
- Cache localStorage com 5min TTL, mas sem invalidação seletiva por produto

---

## 5. RISCOS

| Risco | Gravidade | Mitigação |
|-------|-----------|-----------|
| Quebrar rotas existentes (SEO indexado) | **Alto** | Manter redirects, testar todas as rotas |
| Alterar dados do Supabase de produção | **Alto** | Nunca executar SQL/RPC destrutivo |
| Quebrar cache do localStorage (chave mudar) | **Baixo** | Prefixo `cache_` consistente, documentar |
| Remover funcionalidade do botton (tabela de preços) | **Médio** | Não modificar lógica de preço/variação |
| CSS conflitar entre componentes | **Médio** | Usar scoped styles, evitar globais sem escopo |
| Quebrar JSON-LD estruturado (impacto SEO) | **Alto** | Testar com Google Rich Results |
| Site funcionar sem JavaScript | **Não suportado** | SPA Vue, SEO via meta tags estáticas no HTML |

---

## 6. COMPONENTES A REUTILIZAR

| Componente | Estado | Ação |
|------------|--------|------|
| `CardProduct.vue` | Funcional, precisa de melhorias | Refatorar: fallback de imagem, altura consistente, badge condicional |
| `ProductCarousel.vue` | Funcional | Refatorar como opção do ProductSection genérico |
| `HeroCarousel.vue` | Funcional | Refatorar para aceitar banners reais + composição hero grid (desktop) |
| `Breadcrumb.vue` | Funcional | Refatorar: não renderizar seções vazias |
| `Specifications.vue` | Funcional | Extrair dados para constantes separadas |
| `SkeletonCard.vue` | Funcional | Transformar em ProductCardSkeleton com nome semântico |
| `usePreferencias.js` | Funcional | Manter como está |
| `useCache.js` | Funcional | Manter como está |
| `useJsonLd.js` | Funcional | Manter como está |
| `supabaseApi.js` | Funcional | Refatorar: separar em módulos (products, analytics, utils) |
| `seoImage.js` | Funcional | Manter como está |

---

## 7. COMPONENTES A REFATORAR (CRIAR OU SUBSTITUIR)

| Atual | Novo | Motivo |
|-------|------|--------|
| `AppHeader.vue` | `layout/TopBar.vue` + `layout/MainHeader.vue` + `layout/CategoryNav.vue` | Separar barra informativa, busca/logo/CTA, e navegação de categorias |
| `AppFooter.vue` | `layout/MainFooter.vue` | Corrigir ícones, reduzir duplicação de SVG, melhorar contraste |
| `WhatsAppFloat.vue` + `InstagramFloat.vue` | `common/FloatingButtons.vue` | Unificar em um componente com props |
| View duplicatas CSS | `views/ContentPage.vue` | Unificar About+Privacy+Delivery+Terms |
| `ModalOrcamento.vue` | `common/AppModal.vue` + slot | Tornar reutilizável para outros modais |
| — | `home/BenefitsStrip.vue` | Faixa de benefícios (produção rápida, personalização, etc.) |
| — | `home/CategoryShowcase.vue` | Grid de categorias visuais com imagens |
| — | `home/ProductSection.vue` | Seção reutilizável com título, grid/carousel, viewAll link |
| — | `home/HeroGrid.vue` | Grid hero desktop com banner principal + 2 secundários |
| — | `common/AppButton.vue` | Botão reutilizável (CTA, outline, ghost variants) |
| — | `common/SectionHeader.vue` | Título + subtítulo + viewAll link padronizado |
| — | `common/EmptyState.vue` | Estado vazio reutilizável |
| — | `common/ErrorState.vue` | Estado de erro reutilizável |
| — | `products/ProductCardSkeleton.vue` | Renomeado de SkeletonCard |

---

## 8. PLANO DE EXECUÇÃO

### Fase 1 (atual) — Auditoria + AGENTS.md
- [x] Auditoria do código
- [x] MANUARI_REDESIGN_AUDIT.md
- [ ] AGENTS.md

### Fase 2 — Design System
- [ ] `src/styles/tokens.css` — variáveis CSS semânticas
- [ ] `src/styles/base.css` — reset + tipografia base + container responsivo
- [ ] `src/styles/utilities.css` — classes utilitárias mínimas
- [ ] Atualizar `src/style.css` para importar os novos arquivos
- [ ] Atualizar `index.html` com referência de cores novas (theme-color)

### Fase 3 — Componentes Base
- [ ] `src/components/common/AppButton.vue`
- [ ] `src/components/common/SectionHeader.vue`
- [ ] `src/components/common/EmptyState.vue`
- [ ] `src/components/common/ErrorState.vue`
- [ ] `src/components/common/FloatingButtons.vue` (substitui WhatsAppFloat + InstagramFloat)
- [ ] `src/components/products/ProductCardSkeleton.vue` (renomear SkeletonCard)
- [ ] Refatorar Breadcrumb (não renderizar seções vazias)
- [ ] Refatorar CardProduct (fallback de imagem, `line-clamp` no nome, altura consistente)

### Fase 4 — Layout Compartilhado
- [ ] `src/components/layout/TopBar.vue`
- [ ] `src/components/layout/MainHeader.vue`
- [ ] `src/components/layout/CategoryNav.vue`
- [ ] `src/components/layout/MainFooter.vue`
- [ ] `src/components/layout/MobileNavigation.vue`
- [ ] Atualizar `App.vue` para usar novos componentes de layout
- [ ] Criar `views/ContentPage.vue` para páginas institucionais

### Fase 5 — Home (próxima etapa)
- [ ] `src/components/home/HeroGrid.vue`
- [ ] `src/components/home/BenefitsStrip.vue`
- [ ] `src/components/home/CategoryShowcase.vue`
- [ ] `src/components/home/ProductSection.vue`
- [ ] `src/components/home/PromoBanner.vue`
- [ ] `src/components/home/HowItWorks.vue`
- [ ] `src/components/home/FinalCta.vue`
- [ ] Refatorar `HomeView.vue`

### Fase 6 — Catálogo + Produto (próxima etapa)
- [ ] `src/components/products/ProductFilters.vue` (sidebar + mobile drawer)
- [ ] `src/components/products/ActiveFilters.vue` (chips removíveis)
- [ ] `src/components/products/ProductSort.vue`
- [ ] `src/components/products/ProductGrid.vue`
- [ ] `src/components/products/ProductGallery.vue`
- [ ] `src/components/products/MobileFilterDrawer.vue`
- [ ] Refatorar `ProductsView.vue`
- [ ] Refatorar `ProductDatailsView.vue`

### Fase 7 — Validação Final (próxima etapa)
- [ ] Testes de todas as rotas
- [ ] Verificação de responsividade
- [ ] Verificação de SEO
- [ ] Build de produção

---

## 9. DEPENDÊNCIAS QUE PODEM SER NECESSÁRIAS

| Biblioteca | Justificativa | Necessária? |
|------------|---------------|-------------|
| **Nenhuma adicional** | O projeto atual não tem complexidade suficiente para justificar novas dependências | — |
| Tailwind CSS | Redesign pede tokens, mas o projeto tem 12 componentes. Adicionar Tailwind seria excessivo para este escopo. | **Não** |
| Pinia | Projeto usa composables + localStorage. Só faria sentido se múltiplas rotas precisassem de estado compartilhado reativo. | **Não agora** |
| Headless UI / Radix | Modais e drawers acessíveis. Projeto tem 1 modal simples. | **Não** |
| Swiper.js / Splide | Carrosséis. Implementação atual com CSS + JS é suficiente. | **Não** |

---

## 10. ARQUIVOS ESTIMADOS POR FASE

| Fase | Arquivos criados | Arquivos alterados |
|------|-----------------|-------------------|
| 1 (auditoria) | 2 (AGENTS.md, MANUARI_REDESIGN_AUDIT.md) | 0 |
| 2 (design system) | 3 (tokens.css, base.css, utilities.css) | 2 (style.css, index.html) |
| 3 (componentes base) | 6 (5 common + 1 skeleton) | 5 (CardProduct, Breadcrumb, SkeletonCard, WhatsAppFloat, InstagramFloat, App.vue) |
| 4 (layout) | 5 (TopBar, MainHeader, CategoryNav, MainFooter, MobileNavigation) + 1 (ContentPage.vue) | 2 (App.vue, AppHeader→remover, AppFooter→remover) |
| 5-6 (home + catálogo) | ~12 componentes | 3 views (Home, Products, ProductDetails) |

---

## 11. NOTAS DE IMPLEMENTAÇÃO

1. O projeto usa **Options API** como padrão principal. Manter este padrão.
2. `setup()` é usado apenas nos componentes que importam composables (HomeView, ProductsView, ProductDatailsView). Preservar este padrão híbrido.
3. Há **3 fontes de estilos**: style.css global, App.vue scoped, e cada componente scoped. O design system deve unificar tokens sem quebrar o escopo.
4. A **chave do Supabase** está hardcoded em `config.js`. Não extrair para .env nesta etapa para evitar quebrar o build.
5. O **prebuild script** (`generate-sitemap.mjs`) importa `config.js` diretamente via ESM. Alterações no config devem manter compatibilidade.
6. As **imagens no Supabase Storage** são acessadas via URL pública. Não há transformação server-side.
7. O **modal orçamento** usa cookie com `document.cookie`. Funciona, mas é frágil. Pode ser movido para localStorage.
8. A **responsividade atual** usa `@media (max-width: ...)` em cada componente. O design system deve definir breakpoints como tokens.

---

## 12. PENDÊNCIAS IDENTIFICADAS PARA ETAPAS FUTURAS

1. Extrair `supabaseApi.js` em módulos menores (products.js, analytics.js, sessions.js)
2. Implementar debounce na busca da ProductsView
3. Cache entre rotas (evitar re-fetch de produtos ao navegar Home → Products)
4. Fallback de imagem (placeholder quando Supabase Storage falha)
5. Melhorar ProductDatailsView — separar galeria e info em subcomponentes
6. URLs sincronizadas com filtros/busca na ProductsView
7. Virtual scroll ou load-more na ProductsView para catálogos grandes
8. Testes unitários (Vitest)
9. ESLint + Prettier
