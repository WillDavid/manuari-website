# Manuari Website

E-commerce de produtos personalizados (canecas, xícaras, azulejos, bottons) baseado em Manaus/AM.

**Stack:** Vue 3 + Vue Router + Supabase REST API + Vite + Vercel

**Vendas:** Exclusivamente via WhatsApp

## Setup

```bash
npm install
npm run dev     # Desenvolvimento
npm run build   # Produção (executa prebuild → sitemaps + SEO images)
```

## Estrutura

- `/src` — Aplicação Vue 3 (components, views, composables, services, router)
- `/docs` — Documentação (ARCHITECTURE, CONTEXT, FILES_INDEX, GLOSSARY, RULES)
- `/api` — Serverless function (SEO image proxy)
- `/scripts` — Prebuild scripts (sitemap + SEO image map generation)
- `/public` — Sitemaps, robots.txt, favicon

## Documentação

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — Arquitetura do sistema
- [CONTEXT.md](docs/CONTEXT.md) — Contexto de negócio
- [FILES_INDEX.md](docs/FILES_INDEX.md) — Índice completo de arquivos
- [GLOSSARY.md](docs/GLOSSARY.md) — Glossário de termos
- [RULES.md](docs/RULES.md) — Regras de negócio e técnicas
