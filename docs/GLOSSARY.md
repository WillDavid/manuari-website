# GLOSSARY.md

## Termos Técnicos

| Termo | Significado |
|-------|-------------|
| **Supabase** | Backend-as-a-Service (BaaS) — PostgreSQL + REST API + Storage |
| **REST API** | Interface HTTP para banco Supabase (GET/POST/PATCH) |
| **Session** | Registro de visita: dispositivo, navegador, origem, user_agent |
| **Event** | Page view registrado: session_id, page, product_id |
| **RPC** | Remote Procedure Call — função server-side (ex: `increment_acessos`) |
| **TTL** | Time To Live — tempo de validade do cache |
| **Lazy Route** | Import dinâmico de componente (code splitting) |
| **Composition API** | API Vue 3 para lógica reutilizável |
| **Options API** | API Vue 2 (este projeto usa misto) |

## Termos de Domínio

| Termo | Significado |
|-------|-------------|
| **Variação** | Opção de produto (ex: "Total Branca" vs "Alça e Interior Preto") |
| **Tipo** | Categoria macro: `canecas`, `xicaras`, `azulejos`, `canecas3d` |
| **Categoria** | Tag produto (ex: "Aniversário", "Mãe", "Casamento") |
| **Acessos** | Contador visualizações (incrementa em detalhes produto) |
| **Mais acessados** | Top 6 produtos por acessos (ordenação default) |
| **Preço range** | Faixa de preço entre menor e maior variação |

## Termos Técnicos (Code)

| Termo | Significado |
|-------|-------------|
| **Composables** | Funções Vue com estado/ lógica (useX) |
| **FetchWithCache** | GET com cache localStorage + TTL |
| **Session ID** | UUIDsessão no localStorage (`session_id`) |
| **Route meta** | Dados extras da rota (title, description) |
| **Skeleton** | Placeholder shimmer durante loading |
| **Carousel** | Slider automático de produtos/banners |
| **Breadcrumb** | Nav trail Início > Tipo > Produto |

## URLs e Endpoints

| URL | Destino |
|-----|---------|
| `/` | Home |
| `/produtos` | Catálogo geral |
| `/produtos/:tipo` | Filtro por tipo |
| `/produto/:id` | Detalhes produto |
| `/para-empresas` | Landing B2B |