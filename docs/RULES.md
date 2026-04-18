# RULES.md

## Produto

- **Variações**: Cada tipo (caneca, xicara, azulejo) tem variações com preços distintos
- **Preço exibido**: Menor preço da variação + faixa (ex: "R$ 34,90 – R$ 46,90")
- **Tipos válidos**: `canecas`, `xicaras`, `azulejos`, `canecas3d`
- **Galeria**: Primeira imagem é a principal; hover alterna para segunda (se existir)
- **Acessos**: Cada visualização detalhada incrementa contador no banco (RPC)

## Navegação

- **Categorias**: Extraídas dinamicamente dos produtos (mín 5 produtos para exibir)
- **Ordenação**: `relevancia` (acessos), `recent` (created_at), `price-asc`, `price-desc`
- **Filtros**: Tipo (URL param) + Categoria (checkbox) + Busca (nome/categoria)
- **Paginação**: 50/100/200 por página (desktop), 50 (mobile)

## Recomendação ("Para Você")

- Usa histórico de visualização (`manuari_historico` no localStorage)
- Exige mínimo 5 produtos na categoria preferida
- Fallback: Tag do dia (aleatória entre tags com 5+ produtos)

## Sessão e Analytics

- **Sessão**: Criada no mount (localStorage `session_id`)
- **Origem**: `direto`, `instagram`, `whatsapp`, `outro` (via document.referrer)
- **Dispositivo**: `mobile` ou `desktop` (userAgent)
- **Eventos**: Page view em cada mudança de rota
- **Finalização**: `beforeunload` → PATCH ended_at

## WhatsApp

- **Fluxo**: Produto → variação → "Pedir no WhatsApp" → link wa.me com msg pré-preenchida
- **Mensagem produto**: `Olá! Quero o produto "X" Opção: Y Valor: R$ Z`
- **Msg B2B**: `Olá! Gostaria de um orçamento para brindes corporativos.`

## Modal Orçamento

- **Disparo**: 10 segundos após mount
- **Cooldown**: Cookie `modal_orcamento` válido por 6 horas
- **Ações**: "Falar com atendente" (WA) ou "Continuar Navegando" (fechar)

## Cache

- **TTL**: 5 minutos (`CACHE_TTL`)
- **Storage**: localStorage (prefixo `cache_`)
- **Invalidação**:manual via `clearCache(pattern)` ou automático (TTL)

## SEO

- **Title**: Route meta `title`
- **Description**: Route meta `description`
- **Update**: Em `updateSEO()` chamado no mount + watch $route

## Responsividade

- **Breakpoints**: 768px (mobile), 1024px (tablet)
- **Grid**: 4 cols (desktop), 3 cols (tablet), 2 cols (mobile)