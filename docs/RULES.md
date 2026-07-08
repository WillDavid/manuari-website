# RULES.md

## Produto

- **Variações**: Cada tipo (caneca, xicara, azulejo, botton) tem variações com preços distintos
- **Preço exibido**: Menor preço da variação + faixa (ex: "R$ 34,90 – R$ 46,90") ou preço único da variação selecionada
- **Tipos válidos**: `canecas`, `xicaras`, `azulejos`, `bottons`
- **Galeria**: Primeira imagem é a principal; hover alterna para segunda (se existir) em cards
- **Acessos**: Cada visualização detalhada incrementa contador via RPC (`registrar_acesso_vitrine`)
- **Bottons**: Possuem tabela de preço progressiva por quantidade (price tiers) com destaques e observações
- **Slug**: Gerado automaticamente a partir do nome do produto (normalizado, sem acentos)

## Navegação

- **Categorias**: Extraídas dinamicamente dos produtos (mín 5 produtos para exibir como "tag do dia")
- **Ordenação**: `relevancia` (acessos), `recent` (created_at), `price-asc`, `price-desc`
- **Filtros**: Tipo (URL param) + Categoria (checkbox lateral desktop / chips mobile) + Busca (nome/categoria)
- **Paginação**: 50/100/200 por página (desktop), 50 (mobile)
- **Nav dinâmico**: Product types carregados do Supabase e ordenados por TIPO_ORDER

## Recomendação ("Para Você")

- Usa histórico de visualização (`manuari_historico` no localStorage)
- Exige mínimo 5 produtos na categoria preferida
- Fallback: Tag do dia (aleatória entre tags com 5+ produtos)
- Tags aleatórias adicionais exibidas abaixo da tag do dia

## Sessão e Analytics

- **Sessão**: Criada no mount (localStorage `session_id`)
- **Visitor ID**: Hash anônimo para rastreio de acesso (`visitor_id`)
- **Origem**: `direto`, `instagram`, `whatsapp`, `outro` (via document.referrer)
- **Dispositivo**: `mobile` ou `desktop` (userAgent)
- **Navegador**: Chrome, Firefox, Safari, Outro
- **Eventos**: Page view em cada mudança de rota (session_id, page, product_id)
- **Finalização**: `beforeunload` → PATCH ended_at
- **Acessos produto**: RPC com IP hash + dispositivo + fonte

## WhatsApp

- **Fluxo**: Produto → variação → "Pedir no WhatsApp" → link wa.me com msg pré-preenchida
- **Mensagem produto**: `Olá! Quero o produto "X"\nOpção: Y\nValor: R$ Z`
- **Msg B2B**: `Olá! Gostaria de um orçamento para brindes corporativos.`
- **Msg home**: `Olá! Vim pelo site da Manuari e gostaria de mais informações!`
- **Msg orçamento**: `Olá! Quero fazer um orçamento de caneca personalizada ou botton personalizado.`
- **Texto botão**: "Pedir no WhatsApp" (preço definido) ou "Fazer Orçamento" (tabela de preços / kit)

## Modal Orçamento

- **Disparo**: 10 segundos após mount
- **Cooldown**: Cookie `modal_orcamento` válido por 6 horas
- **Ações**: "Falar com atendente" (WA) ou "Continuar Navegando" (fechar)

## Cache

- **TTL**: 5 minutos (`CACHE_TTL`)
- **Storage**: localStorage (prefixo `cache_`)
- **Invalidação**: manual via `clearCache(pattern)` ou automático (TTL)
- **Bypass**: Cache desabilitado em localhost

## SEO

- **Title/Description/Keywords**: Route meta (estático ou função dinâmica por tipo)
- **Canonical URL**: Atualizada via `updateSEO()` no mount + watch $route
- **OG / Twitter Cards**: Atualizados dinamicamente
- **JSON-LD**: Injeção dinâmica via `useJsonLd` (Organization, LocalBusiness, WebSite, Product, CollectionPage)
- **Robots**: `noindex, nofollow` para 404; `index, follow` para demais
- **SEO Image Aliases**: Imagens servidas via `/seo-images/` (path amigável) através de serverless function
- **Sitemaps**: Gerados em prebuild (pages + images)
- **Structured Data**: Organization + LocalBusiness + WebSite fixos no index.html; Product/CollectionPage dinâmicos

## Responsividade

- **Breakpoints**: 768px (mobile), 1024px (tablet)
- **Grid**: 4 cols (desktop), 3 cols (tablet), 2 cols (mobile)
- **Header**: Logo centralizado (desktop) / esquerda (mobile) + hamburger menu
- **Product Details**: Grid 2 col (desktop) / 1 col (mobile) com buy button fixo

## Build

- **Prebuild**: `scripts/generate-sitemap.mjs` executa antes do `vite build`
- **Geração**: sitemap.xml, sitemap-pages.xml, sitemap-images.xml, src/generated/seoImageMap.js
