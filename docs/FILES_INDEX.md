# FILES_INDEX.md

## Root
- `package.json` — deps: vue, vue-router, vite
- `index.html` — entry HTML
- `vercel.json` — Vercel config

## src/

### main.js
Entry point Vue app

### App.vue
Root component: layout, SEO, session tracking, modal orçamento

### router/index.js
Vue Router config (lazy routes)

### style.css
Global styles (minimal)

## constants/
### config.js
SUPABASE, WHATSAPP, BANNERS, PRODUCT_TYPES, NAV_ITEMS, CACHE_TTL

## services/
### supabaseApi.js
API wrapper: fetch, sessions, events, products

## composables/
### usePreferencias.js
History tracking + recommendations
### useCache.js
Generic cache utilities

## components/

| File | Descrição |
|------|-----------|
| AppHeader.vue | Logo + nav menu (hamburger mobile) |
| AppFooter.vue | Footer 4-col (produtos, infos, atendimento, social) |
| CardProduct.vue | Product card (image hover, tipo, price range) |
| HeroCarousel.vue | Banner carousel (autoplay, shuffle) |
| ProductCarousel.vue | Product slider (auto-scroll, responsive) |
| Breadcrumb.vue | Nav breadcrumb (Início > tipo > produto) |
| Specifications.vue | Product specs by tipo (caneca/xicara/azulejo) |
| WhatsAppFloat.vue | Fixed WA button bottom-right |
| InstagramFloat.vue | Fixed IG button (above WA) |
| ModalOrcamento.vue | Popup orçamento (10s delay, 6h cookie) |
| SkeletonCard.vue | Loading placeholder animation |

## views/

| File | Descrição |
|------|-----------|
| HomeView.vue | Homepage: hero, mais acessados, lançamentos, personalizado |
| ProductsView.vue | Listing: filtros, busca, ordenação, paginação |
| ProductDatailsView.vue | Detalhes: gallery, variações, preço, WA link |
| AboutView.vue | About page |
| B2BView.vue | Landing page corporativa |
| PrivacyPolicyView.vue | Política privacidade |
| DeliveryPolicy.vue | Política entrega |
| OurTermsView.vue | Termos uso |
| NotFoundView.vue | 404 |

## assets/
- manuari-logotipo-300dpi.png
- caneca-colorida-exemplo.png
- vue.svg