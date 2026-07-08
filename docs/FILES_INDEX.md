# FILES_INDEX.md

## Root
- `package.json` — deps: vue, vue-router, vite; scripts: dev, build, prebuild (sitemap)
- `index.html` — entry HTML com meta tags, OG, Twitter Card, JSON-LD, FontAwesome
- `vite.config.js` — Vite config (plugin-vue)
- `vercel.json` — Vercel routes (serverless function + SPA fallback)
- `supabase-ajustes-vitrine.sql` — SQL adjustments for vitrine table
- `supabase-rpc-acesso.sql` — RPC function for access tracking

## src/

### main.js
Entry point Vue app

### App.vue
Root component: layout, SEO dinâmico (title, meta, og, twitter, canonical, keywords, robots), session tracking, modal orçamento

### router/index.js
Vue Router config (lazy routes, route meta dinâmico, scrollBehavior)

### style.css
Global styles (minimal)

## constants/
### config.js
SUPABASE, WHATSAPP, BANNERS, TIPO_ORDER, formatTipoLabel, STATIC_NAV_ITEMS, FOOTER_NAV_ITEM, CACHE_TTL

## services/
### supabaseApi.js
API wrapper: fetchWithCache, products, sessions, events, access tracking, normalization

## composables/
### usePreferencias.js
History tracking + recommendations (localStorage manuari_historico)
### useCache.js
Generic cache utilities (localStorage com TTL)
### useJsonLd.js
Dynamic JSON-LD structured data injection

## utils/
### seoImage.js
SEO-friendly image URL alias mapping

## generated/
### seoImageMap.js
Auto-generated map (original ↔ alias) via prebuild script

## components/

| File | Descrição |
|------|-----------|
| AppHeader.vue | Logo + nav menu dinâmico (product types do Supabase) + hamburger mobile |
| AppFooter.vue | Footer 4-col (produtos, informações, atendimento, social) com SVG icons |
| CardProduct.vue | Product card (image hover swap, tipo, price range, "Em Alta" badge) |
| HeroCarousel.vue | Banner carousel (autoplay 5s, shuffle on mount, hover pause) |
| ProductCarousel.vue | Product slider (autoplay 2s, responsive 4/3/2 per view, nav buttons) |
| Breadcrumb.vue | Nav breadcrumb (Início > tipo > produto) |
| Specifications.vue | Product specs by tipo (caneca/xicara/azulejo/botton) com FAQ |
| WhatsAppFloat.vue | Fixed WA button bottom-right |
| InstagramFloat.vue | Fixed IG button (above WA, gradient background) |
| ModalOrcamento.vue | Popup orçamento (10s delay, 6h cookie cooldown) |
| SkeletonCard.vue | Loading placeholder shimmer animation |

## views/

| File | Descrição |
|------|-----------|
| HomeView.vue | Homepage: hero carousel, mais vistos, lançamentos, "Para Você" / tag do dia, tags aleatórias, CTA final |
| ProductsView.vue | Listing: filtros (categoria), busca, ordenação, paginação (50/100/200), breadcrumb |
| ProductDatailsView.vue | Detalhes: gallery (thumbs + main), variações, preço, tabela bottons, WhatsApp link, semelhantes carousel |
| AboutView.vue | About page com história da Manuari |
| B2BView.vue | Landing page corporativa |
| PrivacyPolicyView.vue | Política privacidade |
| DeliveryPolicy.vue | Política entrega |
| OurTermsView.vue | Termos uso |
| NotFoundView.vue | 404 |

## assets/
- manuari-logotipo-300dpi.png
- caneca-colorida-exemplo.png
- vue.svg

## scripts/
### generate-sitemap.mjs
Prebuild script: busca produtos do Supabase, gera sitemap-pages.xml, sitemap-images.xml, sitemap.xml, seoImageMap.js

## api/
### seo-image.js
Vercel serverless function que serve imagens via aliases SEO-friendly

## public/
- robots.txt
- sitemap.xml, sitemap-pages.xml, sitemap-images.xml
- manuari-logo.png (favicon)
- vite.svg
