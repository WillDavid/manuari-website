# AGENTS.md — Regras Operacionais do Projeto Manuari

## Stack Real

- **Framework**: Vue 3 (Options API predominante, setup() para composables)
- **Router**: Vue Router 4 (lazy routes, scrollBehavior, route meta dinâmico)
- **Build**: Vite 7 + @vitejs/plugin-vue
- **Backend**: Supabase REST API (sem SDK, fetch direto)
- **CSS**: CSS vanilla (scoped styles por componente) + FontAwesome CDN
- **Deploy**: Vercel (SPA fallback + serverless /api/seo-image.js)

## Gerenciador de Pacotes

- **npm** (verificar `package-lock.json`, não usar yarn/pnpm)

## Comandos

```bash
npm install          # Instalar dependências
npm run dev          # Desenvolvimento (Vite)
npm run build        # Produção (executa prebuild → sitemaps antes)
npm run preview      # Preview do build
```

## Testes e Lint

- **Não há testes configurados** (sem Vitest, Jest, Cypress)
- **Não há ESLint configurado** (sem .eslintrc)
- **Não há Prettier configurado** (sem .prettierrc)

## Padrão Vue

- **Options API** como padrão principal (data, methods, computed, mounted)
- **setup()** usado apenas quando o componente importa composables (usePreferencias, useJsonLd)
- Método híbrido: `setup()` retorna funções, Options API no restante com `export default { setup() { ... }, data() { ... }, ... }`
- Não migrar componente para Composition API pura sem justificativa

## Convenções de Componentes

- **Nome de arquivo**: PascalCase.vue (ex: `CardProduct.vue`, `ProductCarousel.vue`)
- **Nome do componente**: PascalCase (ex: `name: 'CardProduct'`)
- **Props**: type obrigatório, default quando aplicável
- **Estilos**: `<style scoped>` em todos os componentes
- **Single File Components** (.vue com template + script + style)
- Componentes novos em subpastas: `layout/`, `home/`, `products/`, `common/`

## Convenções de Estilos

- CSS vanilla, sem pré-processador
- Cores hardcoded devem ser migradas para tokens CSS (`--color-*`)
- Breakpoints: 768px mobile, 1024px tablet (usar variáveis)
- Usar `rem` para fontes e espaçamentos, `px` apenas para bordas finas
- Imagens com `aspect-ratio` + `object-fit: cover`

## Regras do Supabase

- **NUNCA** executar queries destrutivas contra produção
- **NUNCA** alterar RLS, tabelas, ou policies
- **NUNCA** expor service_role key
- Usar sempre a anon key de `src/constants/config.js`
- Manter o padrão `fetchWithCache()` para consultas GET
- Cache TTL: 5 minutos (configurável em `config.js`)
- Não substituir dados do Supabase por mocks/arrays estáticos

## Proibições

- **Não fazer deploy** sem autorização explícita
- **Não executar push** para GitHub sem autorização
- **Não instalar dependências** sem verificar `package.json` primeiro
- **Não adicionar Tailwind, Pinia, Bootstrap** ou frameworks externos
- **Não criar funcionalidades falsas** (carrinho, login, reviews, estoque)
- **Não remover funcionalidades existentes** sem documentar
- **Não modificar o painel administrativo** sem necessidade
- **Não substituir dados reais por dados fictícios**

## Ao Editar Arquivos

1. Ler o arquivo completo primeiro (`Read` tool)
2. Verificar imports e dependências do componente
3. Pesquisar usos do componente afetado (`Grep` tool)
4. Usar `edit` tool (não reescrever arquivo inteiro)
5. Preservar padrão de código existente (indentação, aspas, nomenclatura)
6. Testar build após alterações (`npm run build`)

## Documentação

- Documento de redesign: `docs/MANUARI_REDESIGN.md`
- Auditoria do redesign: `docs/MANUARI_REDESIGN_AUDIT.md`
- Arquitetura: `docs/ARCHITECTURE.md`
- Design visual: `docs/VISUAL_DESIGN.md`
- Regras de negócio: `docs/RULES.md`
- Índice de arquivos: `docs/FILES_INDEX.md`
- Glossário: `docs/GLOSSARY.md`
