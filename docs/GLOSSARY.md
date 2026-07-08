# GLOSSARY.md

## Termos Técnicos

| Termo | Significado |
|-------|-------------|
| **Supabase** | Backend-as-a-Service (BaaS) — PostgreSQL + REST API + Storage |
| **REST API** | Interface HTTP para banco Supabase (GET/POST/PATCH) |
| **Session** | Registro de visita: dispositivo, navegador, origem, user_agent |
| **Event** | Page view registrado: session_id, page, product_id |
| **RPC** | Remote Procedure Call — função server-side (ex: `registrar_acesso_vitrine`) |
| **TTL** | Time To Live — tempo de validade do cache (5min) |
| **Lazy Route** | Import dinâmico de componente (code splitting) |
| **Composition API** | API Vue 3 para lógica reutilizável (useX) |
| **Options API** | API Vue 2 (este projeto usa misto) |
| **JSON-LD** | Structured data format para SEO (injeção dinâmica via useJsonLd) |
| **Serverless Function** | Função Vercel (api/seo-image.js) para proxy de imagens |
| **SEO Image Alias** | URL amigável para imagens de produto (/seo-images/canecas/nome-1.jpg) |
| **Prebuild** | Script executado antes do build (gera sitemaps + seoImageMap.js) |

## Termos de Domínio

| Termo | Significado |
|-------|-------------|
| **Variação** | Opção de produto (ex: "Total Branca", "Alça e Interior Preto", "33mm") |
| **Tipo** | Categoria macro: `canecas`, `xicaras`, `azulejos`, `bottons` |
| **Categoria** | Tag produto (ex: "Aniversário", "Mãe", "Casamento") |
| **Acessos** | Contador visualizações (incrementa em detalhes produto via RPC) |
| **Mais acessados** | Top 6 produtos por acessos (ordenação default) |
| **Preço range** | Faixa de preço entre menor e maior variação |
| **Tabela de preços** | Grade de preços progressivos por quantidade (bottons) |
| **Price Tier** | Faixa de preço por quantidade mínima |
| **Tag do dia** | Categoria aleatória com 5+ produtos para recomendação |
| **Botton** | Produto do tipo `bottons` — botton personalizado 33mm/44mm/58mm |
| **Kit** | Lote de bottons vendido em conjunto (ex: "Kit 10") |

## Termos Técnicos (Code)

| Termo | Significado |
|-------|-------------|
| **Composables** | Funções Vue com estado/lógica (usePreferencias, useCache, useJsonLd) |
| **FetchWithCache** | GET com cache localStorage + TTL |
| **Session ID** | UUID sessão no localStorage (`session_id`) |
| **Visitor ID** | Hash anônimo para rastreio de acesso (`visitor_id`) |
| **Route meta** | Dados extras da rota (title, description, keywords) |
| **Skeleton** | Placeholder shimmer durante loading |
| **Carousel** | Slider automático de produtos/banners |
| **Breadcrumb** | Nav trail Início > Tipo > Produto |
| **normalizeProduct** | Função que transforma dados brutos do Supabase em formato padronizado |
| **slugify** | Gera URL slug a partir do nome do produto |

## URLs e Endpoints

| URL | Destino |
|-----|---------|
| `/` | Home |
| `/produtos` | Catálogo geral |
| `/produtos/:tipo` | Filtro por tipo |
| `/produtos/:tipo/:slug` | Detalhes produto (canonical) |
| `/produto/:id` | Detalhes produto (legacy) |
| `/para-empresas` | Landing B2B |
| `/sobre` | Sobre |
| `/politica-privacidade` | Política privacidade |
| `/politica-entrega` | Política entrega |
| `/nossos-termos` | Termos uso |
| `/seo-images/*` | SEO image alias (serverless function) |
