# ARCHITECTURE.md

## Visão Geral
SPA Vue 3 + Vue Router + Supabase REST API. Sem backend próprio — dados e analytics via Supabase.

## Stack
- Vue 3 (Composition API / Options API misto)
- Vue Router 4 (lazy routes, scrollBehavior)
- Supabase REST API
- Vite (build)
- LocalStorage (cache + preferências + sessão)
- Vercel (deploy + serverless function para SEO images)

## Módulos

### src/main.js
Ponto de entrada. Monta App com Router.

### src/App.vue
- Layout base (Header, Footer, Floating buttons)
- Inicialização de sessão (criarSessao, registrarEvento, finalizarSessao)
- SEO dinâmico (title, meta, og:image, twitter, canonical, keywords, robots)
- ModalOrcamento global

### src/router/index.js
Rotas (todas lazy):
- `/` → HomeView
- `/produtos` → ProductsView
- `/produtos/:tipo` → ProductsView (filtro por tipo)
- `/produtos/:tipo/:slug` → ProductDatailsView
- `/produto/:id` → ProductDatailsView (legacy)
- `/sobre` → AboutView
- `/para-empresas` → B2BView
- `/politica-privacidade` → PrivacyPolicyView
- `/politica-entrega` → DeliveryPolicy
- `/nossos-termos` → OurTermsView
- `/:pathMatch(.*)*` → NotFoundView
Route meta inclui title, description, keywords dinâmicos (inclusive por tipo de produto).

### src/services/supabaseApi.js
Wrapper para API Supabase:
- `fetchWithCache()` — GET com cache localStorage (5min TTL, bypass em localhost)
- `clearCache(pattern)` — invalidação seletiva
- `fetchProducts()` — todos produtos com variações e preços
- `fetchProductById(id)` — produto por ID
- `fetchProductsByType(tipo)` — filtro por tipo
- `fetchProductBySlug(tipo, slug)` — busca por slug no tipo
- `fetchProductsByCategory(categoria)` — filtro por categoria
- `fetchProductTypes()` — lista tipos únicos
- `fetchMaisAcessados()` — top 6 por acessos
- `registrarAcesso(id)` — RPC call com IP hash + dispositivo + origem
- `criarSessao()` — POST /sessions
- `registrarEvento()` — POST /events (pageviews)
- `finalizarSessao()` — PATCH sessão (on beforeunload)

Funções auxiliares: normalizeProduct, normalizeVariation, formatPrice, slugify, getDevice, getBrowser, getOrigin, getVisitorId.

### src/composables/usePreferencias.js
Histórico de visualização (localStorage `manuari_historico`):
- `adicionarVisualizacao(produto)` — armazena tipo + categorias
- `getCategoriasPreferidas()` — categorias mais visualizadas
- `getTiposPreferidos()` — tipos mais visualizados
- `getPreferenciaPrincipal()` — categoria #1
- `limparHistorico()`

### src/composables/useCache.js
Utilitário para cache genérico:
- `get(key)`, `set(key, data)`, `remove(key)`, `clear()`
- `fetchWithCache(key, fetcher, ttl)` — padrão com TTL

### src/composables/useJsonLd.js
Injeção dinâmica de JSON-LD structured data:
- `inject(key, data)` — substitui script ld+json no head
- `remove()` — remove script atual

### src/constants/config.js
Configs centralizadas:
- SUPABASE (url, key)
- WHATSAPP (phone, messages)
- BANNERS (hero, b2b)
- TIPO_ORDER, formatTipoLabel, STATIC_NAV_ITEMS, FOOTER_NAV_ITEM
- CACHE_TTL (5min)

### src/utils/seoImage.js
Utilitário para mapear imagens para aliases SEO-friendly:
- `getSeoImageUrl(url)` — converte URL original para alias local
- `getSeoImageUrls(urls)` — bulk

### src/generated/seoImageMap.js
Mapeamento gerado automaticamente por `scripts/generate-sitemap.mjs`:
- `SEO_IMAGE_BY_ORIGINAL` — original → alias
- `SEO_IMAGE_BY_ALIAS` — alias → original

### api/seo-image.js
Serverless function (Vercel) que serve imagens via alias SEO-friendly.

### scripts/generate-sitemap.mjs
Script de prebuild que:
- Busca produtos do Supabase
- Gera sitemap-pages.xml, sitemap-images.xml, sitemap.xml
- Gera seoImageMap.js com aliases de imagem

## Comunicação
- Views → supabaseApi → Supabase REST
- Views → config → Constantes
- Views → useJsonLd → JSON-LD injection
- App.vue → supabaseApi (session/events)
- App.vue → router meta (SEO dinâmico)
- Componentes compartilhados: Header, Footer, CardProduct, Carousels, Modals, Skeleton, Breadcrumb, Specifications
