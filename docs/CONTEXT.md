# CONTEXT.md

## Propósito do Sistema
E-commerce de produtos personalizados (canecas, xícaras, azulejos) baseado em Manaus/AM.用户提供自定义产品（马克杯、杯子、瓷砖）。主要通过WhatsApp进行销售，通过Supabase进行数据管理和分析。

## Fluxo Principal
1. Usuário acessa o site → sessão criada automaticamente
2. Navega por produtos (carousel, lista, detalhes)
3. Seleciona variação (cor, tamanho) e preço atualizado
4. Clica "Pedir no WhatsApp" → redirecionado com mensagem pré-preenchida
5. Atendente finaliza venda via WhatsApp
6. Page views registrados no Supabase

## Regras de Negócio
- Todo produto tem variações com preços diferentes
- Checkout realizado exclusivamente via WhatsApp
- Sessão rastrear origem (direto, Instagram, WhatsApp)
- Histórico de visualização usado para recomendação ("Para Você")
- Modal de orçamento exibido após 10 segundos (6h cooldown)
- Cache de 5 minutos para API Supabase

## Limitações
- Sem sistema de pagamento integrado
- Sem painel administrativo no frontend
- Sem carrinho de compras
- Apenas delivery em Manaus