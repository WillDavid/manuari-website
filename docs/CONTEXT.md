# CONTEXT.md

## Propósito do Sistema
E-commerce de produtos personalizados (canecas, xícaras, azulejos, bottons) baseado em Manaus/AM. A venda é feita exclusivamente via WhatsApp, com gerenciamento de dados e analytics através do Supabase.

## Fluxo Principal
1. Usuário acessa o site → sessão criada automaticamente
2. Navega por produtos (carousel, lista, detalhes)
3. Seleciona variação (cor, tamanho, modelo) e preço atualizado
4. Visualiza tabela de preços por quantidade (bottons) ou preço fixo
5. Clica "Pedir no WhatsApp" → redirecionado com mensagem pré-preenchida
6. Atendente finaliza venda via WhatsApp
7. Page views registrados no Supabase

## Regras de Negócio
- Todo produto tem variações com preços diferentes
- Bottons têm tabela de preço progressiva por quantidade
- Checkout realizado exclusivamente via WhatsApp
- Sessão rastreia origem (direto, Instagram, WhatsApp)
- Histórico de visualização usado para recomendação ("Para Você")
- Modal de orçamento exibido após 10 segundos (6h cooldown via cookie)
- Cache de 5 minutos para API Supabase (bypass em localhost)
- Imagens servidas via aliases SEO-friendly (serverless function)
- Sitemaps e SEO image map gerados em prebuild

## Limitações
- Sem sistema de pagamento integrado
- Sem painel administrativo no frontend
- Sem carrinho de compras
- Apenas delivery em Manaus (com exceções sob consulta)
