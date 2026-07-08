# Redesign do e-commerce Manuari

## 1. Contexto do projeto

A Manuari é uma empresa de presentes e produtos personalizados localizada em Manaus-AM.

O site atual é um catálogo virtual desenvolvido em Vue 3, Vite e Supabase. O projeto possui páginas públicas, catálogo, página de detalhes dos produtos, área institucional, página B2B e área administrativa para gerenciamento de produtos, categorias, variações, imagens, destaques e lançamentos.

Produtos comercializados:

- Canecas personalizadas.
- Xícaras personalizadas.
- Azulejos personalizados.
- Bottons personalizados.
- Acessórios.
- Presentes personalizados.
- Produtos e pedidos para empresas.

O fechamento comercial atualmente é realizado principalmente pelo WhatsApp. Não adicionar carrinho, login, checkout ou funcionalidades falsas caso elas ainda não existam no projeto.

O objetivo não é reconstruir todo o sistema do zero. O objetivo é modernizar a interface pública, melhorar a experiência de descoberta de produtos, aumentar a confiança do cliente e tornar a navegação mais comercial e profissional, preservando as integrações existentes.

---

## 2. Referências visuais

Existem duas referências principais em:

- `docs/references/brandname-marketplace.png`
- `docs/references/megamart-marketplace.png`

Utilizar as referências da seguinte maneira:

### MegaMart

Usar como inspiração para:

- Organização geral da página.
- Cabeçalho com busca em destaque.
- Menu de categorias.
- Banner principal.
- Seções comerciais compactas.
- Categorias visuais.
- Vitrines de produtos.
- Links “Ver todos”.
- Rodapé visualmente forte.
- Hierarquia clara entre as seções.

### Brandname Marketplace

Usar como inspiração para:

- Densidade comercial.
- Organização de muitos produtos em pouco espaço.
- Blocos promocionais.
- Área para pedidos de fornecedores ou empresas.
- Navegação por categorias.
- Combinação de banners com produtos.
- Apresentação B2B.

Não copiar literalmente:

- Logos.
- Imagens.
- Marcas.
- Textos.
- Produtos.
- Ícones proprietários.
- Paleta azul completa.
- Layout pixel a pixel.
- Estrutura específica de eletrônicos ou supermercado.

Criar uma interpretação própria para a Manuari.

---

## 3. Direção estratégica

O site deve deixar de parecer apenas uma galeria de imagens e passar a parecer uma loja virtual estruturada, confiável e especializada em produtos personalizados.

A direção desejada é:

“Estrutura comercial de marketplace, com a identidade afetiva, criativa, regional e personalizada da Manuari.”

O site deve transmitir:

- Facilidade.
- Confiança.
- Criatividade.
- Personalização.
- Produção local.
- Organização.
- Variedade.
- Qualidade.
- Atendimento humano.
- Rapidez.

Não transformar a Manuari em uma loja genérica de eletrônicos.

---

## 4. Identidade visual

O vermelho ou laranja forte da identidade atual não deve dominar toda a interface. Pode continuar aparecendo na logo, em pequenos detalhes, badges ou CTAs secundários, mas deve ser equilibrado por cores mais confortáveis.

Criar um sistema de tokens semânticos em CSS.

Sugestões de direção:

- Fundo geral: off-white ou cinza muito claro.
- Superfícies: branco.
- Texto principal: grafite, azul-marinho ou quase preto.
- Texto secundário: cinza médio com contraste adequado.
- Cor principal: tom confortável e confiável.
- Cor afetiva secundária: rosa suave, coral suave ou tom inspirado no boto-cor-de-rosa.
- Cor regional complementar: verde amazônico moderado.
- Cor de destaque comercial: laranja ou coral apenas em detalhes.
- Bordas: cinza claro.
- Sombras: discretas.
- Cantos: arredondados, preferencialmente entre 10 e 16 px.

Não escolher cores apenas por aparência. Garantir contraste compatível com WCAG AA.

Criar ou centralizar tokens como:

- `--color-primary`
- `--color-primary-hover`
- `--color-secondary`
- `--color-accent`
- `--color-success`
- `--color-background`
- `--color-surface`
- `--color-text`
- `--color-text-muted`
- `--color-border`
- `--shadow-sm`
- `--shadow-md`
- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--container-width`
- `--header-height`

Não espalhar valores de cor arbitrários pelos componentes.

---

## 5. Princípios de UX

### 5.1 Clareza

O usuário deve entender rapidamente:

- O que a Manuari vende.
- Que os produtos podem ser personalizados.
- Como enviar a arte ou foto.
- Quanto custa.
- Quanto tempo demora.
- Como receber o pedido.
- Como falar com a empresa.

### 5.2 Descoberta de produtos

O site possui muitos produtos. A busca e as categorias devem ser elementos principais da navegação.

### 5.3 Conversão

Sempre deve existir um próximo passo claro:

- Ver produto.
- Ver opções.
- Personalizar.
- Enviar arte.
- Solicitar orçamento.
- Falar no WhatsApp.

### 5.4 Confiança

Destacar:

- Produção em Manaus.
- Prazo de produção.
- Retirada.
- Entrega por aplicativo quando aplicável.
- Envio por Correios.
- Atendimento humano.
- Pagamento.
- Informações para empresas.
- Processo de aprovação da arte, caso realmente exista.

Não criar garantias, avaliações, prazos, descontos ou informações que não estejam confirmadas no projeto.

### 5.5 Densidade equilibrada

Evitar:

- Grandes áreas vazias.
- Títulos centralizados ocupando espaço excessivo.
- Seções sem conteúdo.
- Carrosséis com apenas poucos produtos.
- Cards pequenos demais.
- Rodapé isolado por grandes espaços em branco.
- Blocos com altura fixa desnecessária.
- Uso excessivo de `min-height` ou `100vh`.

---

## 6. Cabeçalho

Criar um cabeçalho em três níveis.

### 6.1 Barra informativa superior

Apresentar mensagens curtas, condicionadas às informações reais da empresa.

Exemplos:

- Produção rápida.
- Retirada em Manaus.
- Entregas por Uber/99 solicitadas pelo cliente.
- Enviamos para todo o Brasil.
- Atendimento de segunda a sábado.

No celular, reduzir o número de informações ou transformar em uma mensagem rotativa acessível, sem animação rápida.

### 6.2 Cabeçalho principal

Conter:

- Logo da Manuari.
- Campo de busca em destaque.
- Botão ou link para WhatsApp.
- Botão “Solicitar orçamento” ou “Para empresas”, se fizer sentido.
- Menu mobile.
- Ícones com rótulos acessíveis.

Placeholder sugerido da busca:

“O que você deseja personalizar?”

A busca deve pesquisar produtos, categorias, temas e palavras-chave utilizando a estrutura de dados já existente.

Não adicionar:

- Carrinho falso.
- Login falso.
- Favoritos sem funcionalidade.
- Rastreamento de pedidos sem backend correspondente.

### 6.3 Navegação de categorias

Categorias principais:

- Todos.
- Canecas.
- Xícaras.
- Azulejos.
- Bottons.
- Acessórios.
- Envie sua arte.
- Para empresas.

No desktop:

- Menu horizontal.
- Possibilidade de dropdown somente se houver necessidade real.

No mobile:

- Drawer lateral ou menu expansível.
- Busca facilmente acessível.
- Itens com área de toque de pelo menos 44 px.

O cabeçalho pode ser sticky, desde que não ocupe espaço excessivo.

---

## 7. Home page

A nova home deve seguir a seguinte ordem.

### 7.1 Cabeçalho

Usar o novo cabeçalho compartilhado.

### 7.2 Hero comercial

No desktop, criar composição aproximada:

- Banner principal: 65% a 70% da largura.
- Dois banners menores: 30% a 35% da largura.

No tablet e celular:

- Empilhar os banners.
- Ou apresentar o principal seguido por cards promocionais horizontais.

Sugestões de mensagens:

Banner principal:

“Transforme momentos em presentes únicos”

Subtítulo:

“Canecas, bottons e personalizados feitos em Manaus com sua foto, nome ou arte.”

CTAs:

- “Ver produtos”
- “Criar meu presente”

Banner secundário 1:

“Envie sua arte”

Banner secundário 2:

“Pedidos para empresas”

Os banners devem utilizar conteúdo real, imagens existentes e configurações do banco quando disponíveis.

Não codificar banners sazonais expirados de forma fixa.

Se o sistema possuir datas de início e fim, respeitar essas datas.

### 7.3 Faixa de benefícios

Criar uma faixa compacta com ícones e textos.

Possíveis benefícios, desde que confirmados:

- Produção rápida.
- Personalização com foto, nome ou arte.
- Atendimento em Manaus.
- Retirada ou envio.
- Pagamento via Pix e cartão.
- Condições para empresas.

No mobile, permitir scroll horizontal acessível ou grid de duas colunas.

### 7.4 Categorias visuais

Exibir entre 6 e 10 categorias prioritárias em cards circulares ou pequenos cards arredondados.

Exemplos:

- Canecas.
- Xícaras.
- Bottons.
- Azulejos.
- Presentes.
- Manaus e Amazônia.
- Profissões.
- Para empresas.

Usar imagens reais representativas.

Cada categoria deve ser clicável e levar ao catálogo com filtro aplicado.

### 7.5 Mais vendidos

Criar uma seção reutilizável de produtos.

Estrutura:

- Título alinhado à esquerda.
- Descrição curta opcional.
- Link “Ver todos” alinhado à direita.
- Grid de produtos no desktop.
- Scroll horizontal ou carrossel controlável no mobile.

Não esconder todos os produtos atrás de um carrossel no desktop.

### 7.6 Banner “Envie sua arte”

Criar um bloco promocional destacando que o cliente pode enviar:

- Foto.
- Nome.
- Frase.
- Logo.
- Arte pronta.
- Ideia.

CTA:

“Enviar minha ideia”

O CTA deve abrir a rota adequada ou o WhatsApp com mensagem predefinida.

### 7.7 Lançamentos

Usar o mesmo componente reutilizável de seção de produtos.

Mostrar apenas produtos realmente marcados como lançamento.

Se não houver produtos, não renderizar uma seção vazia.

### 7.8 Coleções ou ocasiões

Apresentar coleções comerciais com conteúdo real.

Exemplos possíveis:

- Presentes para aniversário.
- Presentes românticos.
- Manaus e Amazônia.
- Profissões.
- Frases engraçadas.
- Cultura pop.
- Futebol.
- Empresas e eventos.

Não deixar campanhas sazonais antigas permanentemente na home.

### 7.9 Para empresas

Criar seção visualmente distinta para clientes B2B.

Conteúdo:

- Bottons para eventos.
- Canecas corporativas.
- Brindes personalizados.
- Pedidos em quantidade.
- Personalização com logomarca.
- Solicitação de orçamento.

CTA:

“Solicitar orçamento”

Não inventar descontos progressivos que não estejam cadastrados.

### 7.10 Como funciona

Criar seção com quatro ou cinco etapas.

Exemplo:

1. Escolha o produto.
2. Envie sua foto, nome ou ideia.
3. Receba ou aprove a arte, caso esse processo exista.
4. A Manuari produz o pedido.
5. Retire ou solicite envio.

Utilizar linguagem simples.

### 7.11 Avaliações

Somente implementar avaliações se existirem avaliações reais no banco ou em fonte confiável do projeto.

Não criar:

- Depoimentos falsos.
- Nomes fictícios.
- Notas inventadas.
- Quantidade de avaliações inexistente.

Caso não existam avaliações, criar o componente preparado, mas não renderizá-lo.

### 7.12 Instagram ou produção real

Caso existam fotos reais no projeto, criar uma seção de bastidores, produção ou Instagram.

Não implementar integração externa instável sem necessidade.

É aceitável usar imagens locais e um CTA para abrir o Instagram.

### 7.13 CTA final

Criar uma seção de conversão:

“Não encontrou o que procura?”

Texto:

“Conte sua ideia para a Manuari e receba ajuda para criar um presente personalizado.”

CTA principal:

“Falar no WhatsApp”

CTA secundário:

“Ver todos os produtos”

### 7.14 Rodapé

Criar um rodapé forte, compacto e integrado visualmente.

Conteúdo:

- Logo.
- Resumo da Manuari.
- Categorias.
- Informações institucionais.
- Políticas.
- WhatsApp.
- E-mail.
- Horários.
- Informação sobre loja física.
- Instagram.
- CNPJ.
- Manaus-AM.
- Formas de pagamento, se houver ícones ou dados reais.

Utilizar fundo contrastante.

Garantir que os ícones sejam carregados corretamente. Não permitir círculos vazios sem identificação.

---

## 8. Cards de produto

Criar um componente único e reutilizável `ProductCard`.

O card deve suportar:

- Imagem.
- Badge.
- Categoria.
- Nome.
- Texto curto opcional.
- Preço inicial.
- Preço final, quando necessário.
- Preço promocional real.
- CTA.
- Estado de loading.
- Estado de imagem quebrada.
- Produto indisponível, caso exista essa condição.

### Estrutura visual

1. Área de imagem com proporção fixa.
2. Badge posicionado sem cobrir o produto.
3. Categoria discreta.
4. Nome com no máximo duas linhas.
5. Informação sobre personalização, quando aplicável.
6. Preço.
7. CTA.

Usar `line-clamp` no nome.

Manter os cards da mesma altura dentro de cada grid.

### Preços

Evitar exibir apenas:

`R$ 35,90 - R$ 46,90`

Preferir:

`A partir de R$ 35,90`

Na página de detalhes, explicar que o preço varia conforme modelo, cor, tamanho ou opção.

Para bottons:

- `A partir de R$ 2,00 por unidade`
- ou `Kit com 3 a partir de R$ 10,00`

Usar somente quando essas informações forem verdadeiras.

### CTAs

Possíveis textos:

- Ver opções.
- Personalizar.
- Ver produto.
- Solicitar orçamento.

Não colocar vários CTAs concorrentes no mesmo card.

### Imagens

- Usar `aspect-ratio`.
- Usar `object-fit`.
- Usar lazy loading fora da primeira dobra.
- Utilizar `srcset` ou transformação de imagem quando a estrutura existente permitir.
- Evitar layout shift.
- Exibir fallback adequado.

---

## 9. Catálogo

O catálogo atual possui busca, ordenação, paginação e muitas categorias, porém deve ganhar estrutura de loja moderna.

### 9.1 Cabeçalho do catálogo

Apresentar:

- Breadcrumb.
- Título.
- Descrição curta.
- Quantidade de produtos encontrados.
- Ordenação.
- Botão de filtros no mobile.

Exemplo:

“Canecas, bottons e presentes personalizados”

“139 produtos encontrados”

### 9.2 Busca

A busca deve:

- Sincronizar com a URL.
- Manter o termo ao navegar e voltar.
- Possuir botão para limpar.
- Ter debounce quando consultar banco.
- Exibir estado sem resultados.
- Não consultar o banco a cada tecla sem controle.

### 9.3 Filtros

Possíveis filtros, conforme dados existentes:

- Tipo de produto.
- Categoria.
- Tema.
- Faixa de preço.
- Cor.
- Tamanho.
- Personalizável.
- Com nome.
- Com foto.
- Para empresas.
- Lançamentos.
- Destaques.
- Mais vendidos.

Não criar filtros que não possam ser alimentados pelos dados atuais.

### 9.4 Desktop

- Sidebar de filtros.
- Sidebar sticky somente quando não prejudicar a navegação.
- Filtros agrupados.
- Grupos recolhíveis quando houver muitas opções.
- Quantidade de itens por grupo quando disponível.
- Grid ocupando o restante da tela.

### 9.5 Mobile

- Botão “Filtrar”.
- Filtros em drawer ou bottom sheet.
- Botões “Aplicar filtros” e “Limpar”.
- Não renderizar uma sidebar estreita ao lado do grid.

### 9.6 Filtros ativos

Apresentar chips removíveis.

Exemplo:

- `Canecas ×`
- `Manaus ×`
- `Até R$ 50 ×`

Adicionar opção:

“Limpar filtros”

### 9.7 Ordenação

Opções:

- Mais relevantes.
- Mais vendidos.
- Lançamentos.
- Menor preço.
- Maior preço.

Não apresentar ordenações sem implementação real.

### 9.8 Paginação

Manter paginação ou implementar carregamento incremental conforme arquitetura existente.

Evitar carregar todos os produtos de uma vez.

O padrão pode ser entre 20 e 24 produtos por página, desde que não prejudique a consulta atual.

Manter a página atual na URL.

### 9.9 Estados

Implementar:

- Skeleton.
- Loading.
- Erro de consulta.
- Nenhum resultado.
- Filtros sem opções.
- Imagem indisponível.
- Página inválida.

A seção de catálogo não deve saltar de tamanho durante o carregamento.

---

## 10. Página de produto

Modernizar a página de detalhes preservando integrações existentes.

### Estrutura

- Breadcrumb.
- Galeria de imagens.
- Título.
- Categoria.
- Badge real.
- Preço a partir de.
- Seletores de variações.
- Descrição.
- Explicação sobre personalização.
- Informações sobre prazo.
- Informações sobre entrega.
- CTA principal.
- Produtos relacionados.

### Galeria

- Imagem principal.
- Miniaturas.
- Controle por teclado.
- Imagens com proporção consistente.
- Swipe no mobile, quando possível.
- Zoom apenas se realmente útil.

### Variações

Exibir variações reais, como:

- Cor.
- Modelo.
- Tamanho.
- Com ou sem pires.
- Quantidade.
- Diâmetro do botton.

Atualizar preço quando a variação alterar o valor.

Não duplicar lógica de preço no componente. Utilizar funções ou serviços compartilhados.

### Personalização

Explicar:

- O que pode ser enviado.
- Formatos aceitos, se confirmados.
- Como o cliente envia o conteúdo.
- Se haverá aprovação da arte.
- Limitações de produção.

### WhatsApp

O CTA deve gerar mensagem contextual com:

- Nome do produto.
- Variação escolhida.
- Quantidade.
- URL atual.
- Intenção de personalização.

Exemplo:

“Olá, gostaria de personalizar o produto [nome]. Selecionei [variação]. Link: [URL].”

Codificar corretamente os parâmetros da URL.

---

## 11. Responsividade

Testar pelo menos:

- 320 px.
- 360 px.
- 390 px.
- 768 px.
- 1024 px.
- 1280 px.
- 1366 px.
- 1440 px.

Requisitos:

- Nenhum scroll horizontal acidental.
- Nenhum texto cortado sem tratamento.
- Nenhum botão fora da tela.
- Imagens sem distorção.
- Menu funcional por teclado e toque.
- Cards legíveis.
- Espaçamento confortável.
- Cabeçalho não deve ocupar metade da tela.
- Busca deve continuar visível e utilizável.
- Filtros devem abrir e fechar corretamente.
- Elementos flutuantes não devem cobrir CTAs ou paginação.

Sugestão de grid:

- Mobile pequeno: uma coluna ou cards horizontais específicos.
- Mobile: duas colunas quando o conteúdo permanecer legível.
- Tablet: três colunas.
- Desktop: quatro ou cinco colunas.
- Desktop amplo: até cinco colunas, evitando cards pequenos demais.

A decisão final deve considerar a largura real do container.

---

## 12. Acessibilidade

Garantir:

- HTML semântico.
- Apenas um `h1` principal por página.
- Hierarquia correta de títulos.
- Navegação por teclado.
- `focus-visible`.
- `aria-label` em ícones.
- Texto alternativo em imagens.
- Botões implementados como `<button>`.
- Links implementados como `<a>` ou `RouterLink`.
- Não usar `div` clicável sem semântica.
- Contraste WCAG AA.
- Área de toque mínima aproximada de 44 px.
- Respeitar `prefers-reduced-motion`.
- Não usar autoplay agressivo.
- Carrosséis com controles acessíveis.
- Mensagens de erro compreensíveis.
- Indicadores de loading anunciáveis quando necessário.

---

## 13. Performance

Não prejudicar a velocidade do site.

Requisitos:

- Lazy loading de imagens fora da primeira dobra.
- Não carregar os 139 produtos na home.
- Consultas separadas e limitadas por seção.
- Não executar consultas duplicadas.
- Reutilizar dados quando apropriado.
- Evitar dependências grandes apenas por pequenos componentes.
- Evitar bibliotecas de carrossel se a implementação atual ou CSS resolver.
- Fazer code splitting por rota quando aplicável.
- Manter imagens com dimensões declaradas.
- Evitar mudanças de layout durante o carregamento.
- Remover listeners ao desmontar componentes.
- Debounce em busca.
- Cancelar ou ignorar consultas antigas quando necessário.
- Não incluir assets enormes sem otimização.

Se já existir uma biblioteca válida no projeto, reutilizá-la.

Não adicionar Tailwind, Pinia, Bootstrap ou outra estrutura apenas para este redesign sem justificativa técnica.

---

## 14. SEO

Preservar e melhorar o SEO local e comercial.

Termos importantes:

- Caneca personalizada em Manaus.
- Canecas personalizadas em Manaus.
- Bottons personalizados em Manaus.
- Presentes personalizados em Manaus.
- Xícaras personalizadas.
- Azulejos personalizados.
- Brindes personalizados para empresas.

Requisitos:

- Título e descrição únicos por rota.
- Canonical.
- Open Graph.
- Twitter Card.
- URLs legíveis.
- Breadcrumbs.
- Sitemap.
- Robots.
- Dados estruturados apenas com informações verdadeiras.
- `Product` quando houver dados suficientes.
- `Organization` ou `LocalBusiness` quando apropriado.
- Não adicionar avaliações estruturadas inexistentes.
- Não adicionar estoque falso.
- Não adicionar preços que não correspondam ao banco.

Preservar o título principal existente quando adequado:

“Caneca Personalizada em Manaus | Manuari”

---

## 15. Vue e arquitetura

O projeto utiliza Vue 3 e Vite.

Antes de modificar:

1. Ler `package.json`.
2. Identificar o gerenciador de pacotes.
3. Identificar o padrão atual de componentes.
4. Verificar se o projeto usa Options API ou Composition API.
5. Preservar o padrão predominante.
6. Verificar router.
7. Verificar store.
8. Verificar serviços do Supabase.
9. Verificar estilos globais.
10. Verificar testes existentes.
11. Verificar convenções de nomenclatura.

Preferir Options API quando esse for o padrão do projeto.

Não misturar APIs sem necessidade.

Estrutura sugerida, adaptando ao projeto existente:

components/
  layout/
    TopBar.vue
    MainHeader.vue
    CategoryNav.vue
    MobileNavigation.vue
    MainFooter.vue

  home/
    HeroGrid.vue
    BenefitsStrip.vue
    CategoryShowcase.vue
    ProductSection.vue
    PromoBanner.vue
    HowItWorks.vue
    BusinessBanner.vue
    FinalCta.vue

  products/
    ProductCard.vue
    ProductGrid.vue
    ProductCardSkeleton.vue
    ProductFilters.vue
    MobileFilterDrawer.vue
    ActiveFilters.vue
    ProductSort.vue
    ProductGallery.vue
    ProductVariants.vue
    ProductPrice.vue

  common/
    AppButton.vue
    AppIcon.vue
    EmptyState.vue
    ErrorState.vue
    SectionHeader.vue

A estrutura é uma sugestão. Não duplicar componentes existentes que já cumpram essas funções.

Criar um componente genérico de seção de produtos com propriedades equivalentes a:

- `title`
- `subtitle`
- `products`
- `viewAllLink`
- `loading`
- `layout`
- `emptyBehavior`
- `trackingContext`

Não criar um componente diferente para cada vitrine.

---

## 16. Supabase e segurança

Preservar:

- Queries existentes.
- RLS.
- Tabelas.
- Storage.
- Autenticação administrativa.
- CRUD.
- Rotas administrativas.
- Regras de negócio.
- Ordenação.
- Destaque.
- Lançamento.
- Imagens múltiplas.
- Categorias.
- Variações.

Não executar:

- Exclusão de tabela.
- Alteração destrutiva.
- Limpeza de dados.
- Mudança de RLS.
- Migration irreversível.
- Modificação de produção.

Não expor:

- Service role key.
- Senhas.
- Tokens privados.
- Segredos.
- Variáveis não destinadas ao frontend.

Se alguma alteração de banco for realmente necessária:

1. Documentar.
2. Criar migration separada.
3. Não executar contra produção.
4. Informar claramente o motivo.
5. Aguardar aprovação quando houver risco.

Não substituir dados reais do Supabase por arrays estáticos apenas para facilitar a interface.

---

## 17. Regras de implementação

- Não reescrever o projeto inteiro sem necessidade.
- Não apagar funcionalidades existentes.
- Não alterar o painel administrativo, exceto quando necessário para compatibilidade.
- Não modificar rotas públicas sem redirecionamento.
- Não quebrar links compartilhados.
- Não substituir componentes funcionais sem analisar dependências.
- Não instalar pacotes sem justificar.
- Não fazer deploy.
- Não executar push.
- Não alterar variáveis de produção.
- Não usar dados falsos como se fossem reais.
- Não criar promoções fictícias.
- Não criar reviews fictícios.
- Não criar estoque fictício.
- Não deixar TODOs críticos sem relatar.
- Não deixar erros no console.
- Não silenciar erros apenas para o build passar.

Antes de editar, pesquisar usos dos componentes afetados.

---

## 18. Critérios de aceitação

O trabalho será considerado concluído quando:

- O projeto compilar sem erros.
- A home tiver densidade comercial melhor.
- O cabeçalho possuir busca funcional e CTA claro.
- As categorias estiverem fáceis de descobrir.
- As vitrines utilizarem componentes reutilizáveis.
- O desktop não depender exclusivamente de carrosséis.
- Seções vazias não forem renderizadas.
- Cards tiverem altura e imagens consistentes.
- Preços estiverem mais claros.
- O catálogo possuir filtros organizados.
- Filtros funcionarem no mobile.
- Filtros e paginação estiverem sincronizados com a URL.
- A página de produto explicar melhor a personalização.
- O WhatsApp receber contexto do produto.
- O rodapé estiver visualmente integrado.
- Não houver overflow horizontal entre 320 px e 1440 px.
- Não houver erros de console.
- As consultas do Supabase continuarem funcionando.
- O painel administrativo continuar funcionando.
- As rotas existentes continuarem acessíveis.
- O build de produção finalizar com sucesso.
- Testes existentes passarem.
- A interface respeitar acessibilidade básica.
- O resultado não for uma cópia literal das referências.

---

## 19. Entrega de cada etapa

Ao final de cada etapa:

1. Informar o que foi analisado.
2. Informar os arquivos alterados.
3. Informar componentes criados.
4. Informar componentes reaproveitados.
5. Informar dependências adicionadas.
6. Informar comandos executados.
7. Informar resultado do lint.
8. Informar resultado dos testes.
9. Informar resultado do build.
10. Informar pendências.
11. Informar riscos.
12. Apresentar screenshots quando houver ferramenta disponível.
13. Não declarar algo como validado sem realmente validar.