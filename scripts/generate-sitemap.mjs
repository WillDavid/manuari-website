import { mkdir, writeFile } from 'node:fs/promises'
import { SUPABASE, BANNERS } from '../src/constants/config.js'

const SITE_URL = 'https://manuari.com.br'
const TODAY = new Date().toISOString().slice(0, 10)
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/produtos', priority: '0.9', changefreq: 'weekly' },
  { path: '/produtos/canecas', priority: '1.0', changefreq: 'weekly' },
  { path: '/produtos/xicaras', priority: '0.8', changefreq: 'weekly' },
  { path: '/produtos/azulejos', priority: '0.8', changefreq: 'weekly' },
  { path: '/produtos/bottons', priority: '0.9', changefreq: 'weekly' },
  { path: '/para-empresas', priority: '0.8', changefreq: 'monthly' },
  { path: '/sobre', priority: '0.6', changefreq: 'monthly' },
  { path: '/politica-privacidade', priority: '0.3', changefreq: 'yearly' },
  { path: '/politica-entrega', priority: '0.3', changefreq: 'yearly' },
  { path: '/nossos-termos', priority: '0.3', changefreq: 'yearly' }
]

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function slugify(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function inferExtension(imageUrl) {
  try {
    const pathname = new URL(imageUrl).pathname
    const match = pathname.match(/\.([a-zA-Z0-9]+)$/)
    return match ? match[1].toLowerCase() : 'jpg'
  } catch {
    return 'jpg'
  }
}

function getProductPath(product) {
  return `/produtos/${product.tipo}/${slugify(product.name)}`
}

function getProductPriority(tipo) {
  if (tipo === 'canecas') return '0.9'
  if (tipo === 'bottons') return '0.7'
  return '0.6'
}

function buildStaticUrl(route) {
  return `  <url>\n    <loc>${SITE_URL}${route.path}</loc>\n    <priority>${route.priority}</priority>\n    <changefreq>${route.changefreq}</changefreq>\n    <lastmod>${TODAY}</lastmod>\n  </url>`
}

function buildPageUrl(product) {
  const lastmod = String(product.created_at || TODAY).slice(0, 10)

  return `  <url>\n    <loc>${SITE_URL}${getProductPath(product)}</loc>\n    <priority>${getProductPriority(product.tipo)}</priority>\n    <changefreq>weekly</changefreq>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n  </url>`
}

function buildImageEntry(entry) {
  return `  <url>\n    <loc>${SITE_URL}${entry.pagePath}</loc>\n    <image:image>\n      <image:loc>${SITE_URL}${entry.aliasPath}</image:loc>\n      <image:title>${escapeXml(entry.title)}</image:title>\n      <image:caption>${escapeXml(entry.caption)}</image:caption>\n    </image:image>\n  </url>`
}

async function fetchProducts() {
  const endpoint = `${SUPABASE.url}/rest/v1/vitrine?select=id,name,tipo,images,created_at&order=created_at.desc`
  const response = await fetch(endpoint, {
    headers: {
      apikey: SUPABASE.key,
      Authorization: `Bearer ${SUPABASE.key}`
    }
  })

  if (!response.ok) {
    throw new Error(`Falha ao carregar produtos para sitemap: ${response.status}`)
  }

  return response.json()
}

function buildAliasEntries(products) {
  const entries = []

  products.forEach((product) => {
    const pagePath = getProductPath(product)
    const imageUrls = Array.isArray(product.images) ? product.images.filter(Boolean).slice(0, 10) : []

    imageUrls.forEach((imageUrl, index) => {
      const extension = inferExtension(imageUrl)
      const aliasPath = `/seo-images/${product.tipo}/${slugify(product.name)}-${index + 1}.${extension}`
      const tipoLabel = product.tipo === 'canecas'
        ? 'caneca personalizada'
        : product.tipo === 'xicaras'
          ? 'xícara personalizada'
          : product.tipo === 'azulejos'
            ? 'azulejo personalizado'
            : 'botton personalizado'

      entries.push({
        aliasPath,
        originalUrl: imageUrl,
        pagePath,
        title: product.name,
        caption: `${product.name} - ${tipoLabel} da Manuari em Manaus`
      })
    })
  })

  BANNERS.hero.forEach((banner, index) => {
    const extension = inferExtension(banner.image)
    entries.push({
      aliasPath: `/seo-images/banners/manuari-banner-${index + 1}.${extension}`,
      originalUrl: banner.image,
      pagePath: typeof banner.link === 'string' && banner.link.startsWith('/') ? banner.link : '/',
      title: `Banner Manuari ${index + 1}`,
      caption: 'Imagem institucional da Manuari para canecas e produtos personalizados em Manaus'
    })
  })

  return entries
}

function uniqueByAlias(entries) {
  const seen = new Map()
  entries.forEach((entry) => {
    if (!seen.has(entry.aliasPath)) {
      seen.set(entry.aliasPath, entry)
    }
  })
  return [...seen.values()]
}

async function writeSeoImageMap(entries) {
  const byOriginal = Object.fromEntries(entries.map((entry) => [entry.originalUrl, entry.aliasPath]))
  const byAlias = Object.fromEntries(entries.map((entry) => [entry.aliasPath.replace(/^\//, ''), entry.originalUrl]))

  const fileContent = `export const SEO_IMAGE_BY_ORIGINAL = ${JSON.stringify(byOriginal, null, 2)}\n\nexport const SEO_IMAGE_BY_ALIAS = ${JSON.stringify(byAlias, null, 2)}\n`

  await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true })
  await writeFile(new URL('../src/generated/seoImageMap.js', import.meta.url), fileContent, 'utf8')
}

async function writeSitemaps(products, imageEntries) {
  const staticEntries = STATIC_ROUTES.map(buildStaticUrl)
  const productEntries = products
    .filter((product) => product?.tipo && product?.name)
    .map(buildPageUrl)

  const sitemapPages = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticEntries, ...productEntries].join('\n\n')}\n</urlset>\n`
  const sitemapImages = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${imageEntries.map(buildImageEntry).join('\n\n')}\n</urlset>\n`
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${SITE_URL}/sitemap-pages.xml</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>\n  <sitemap>\n    <loc>${SITE_URL}/sitemap-images.xml</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>\n</sitemapindex>\n`

  await writeFile(new URL('../public/sitemap-pages.xml', import.meta.url), sitemapPages, 'utf8')
  await writeFile(new URL('../public/sitemap-images.xml', import.meta.url), sitemapImages, 'utf8')
  await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemapIndex, 'utf8')
}

async function main() {
  const products = await fetchProducts()
  const imageEntries = uniqueByAlias(buildAliasEntries(products))

  await writeSeoImageMap(imageEntries)
  await writeSitemaps(products, imageEntries)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
