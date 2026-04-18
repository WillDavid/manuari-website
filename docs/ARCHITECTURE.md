# ARCHITECTURE.md

## Visão Geral
SPA Vue 3 + Vue Router + Supabase REST API. Sem backend próprio — dados e analytics via Supabase.

## Stack
- Vue 3 (Composition API / Options API misto)
- Vue Router 4
- Supabase REST API
- Vite (build)
- LocalStorage (cache + preferências)

## Módulos

### src/main.js
Ponto de entrada. Monta App com Router.

### src/App.vue
- Layout base (Header, Footer, Floating buttons)
- Inicialização de sessão (criarSessao, registrarEvento, finalizarSessao)
- SEOdinâmico (title, meta description)
- ModalOrcamento global

### src/router/index.js
Rotas:
- `/` → HomeView
- `/produtos` → ProductsView (todos)
- `/produtos/:tipo` → ProductsView (filtro)
- `/produto/:id` → ProductDatailsView
- `/sobre` → AboutView
- `/para-empresas` → B2BView
- `/politica-privacidade` → PrivacyPolicyView
- `/politica-entrega` → DeliveryPolicy
- `/nossos-termos` → OurTermsView
- `/:pathMatch(.*)*` → NotFoundView

### src/services/supabaseApi.js
Wrapper para API Supabase:
- `fetchWithCache()` — GET com cache localStorage (5min TTL)
- `fetchProducts()` — todos produtos
- `fetchProductById(id)` — produto único
- `fetchProductsByType(tipo)` — filtro por tipo
- `fetchMaisAcessados()` — top 6 por acessos
- `incrementarAcessos(id)` — RPC call
- `criarSessao()` — POST /sessions
- `registrarEvento()` — POST /events (pageviews)
- `finalizarSessao()` — PATCH sessão (on unload)

### src/composables/usePreferencias.js
Histórico de visualização:
- `adicionarVisualizacao(produto)` — armazena tipo + categorias
- `getCategoriasPreferidas()` — categorias mais visualizadas
- `getTiposPreferidos()` — tipos mais visualizados
- `getPreferenciaPrincipal()` — categoria #1
- `limparHistorico()`

### src/composables/useCache.js
Utilitário para cache genérico:
- `get(key)`, `set(key, data)`, `remove(key)`, `clear()`
- `fetchWithCache(key, fetcher, ttl)` — padrão com TTL

### src/constants/config.js
Configs centralizadas:
- SUPABASE (url, key)
- WHATSAPP (phone, messages)
- BANNERS (hero, b2b)
- PRODUCT_TYPES (variações + preços)
- NAV_ITEMS
- CACHE_TTL (5min)

## Comunicação
- Views → supabaseApi → Supabase REST
- Views → config → Constantes
- App.vue → composables → usePreferencias
- Componentes compartilhados: Header, Footer, CardProduct, Carousels, Modals