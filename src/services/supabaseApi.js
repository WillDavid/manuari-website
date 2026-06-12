import { SUPABASE, CACHE_TTL } from '../constants/config'

const { url: SUPABASE_URL, key: SUPABASE_KEY } = SUPABASE
const PRODUCTS_ENDPOINT = 'vitrine'
const VITRINE_SELECT = '*,vitrine_variacoes(*,vitrine_precos(*),vitrine_precos_faixas(*))'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

function getCacheKey(endpoint, params = '', select = '*') {
  return `cache_${endpoint}_${select}_${params}`.replace(/[^a-zA-Z0-9_:-]/g, '_')
}

function formatPrice(value) {
  return currencyFormatter.format(value)
}

function formatPriceRange(min, max) {
  if (min == null && max == null) return ''
  if (min == null) return formatPrice(max)
  if (max == null) return formatPrice(min)
  if (min === max) return formatPrice(min)
  return `${formatPrice(min)} - ${formatPrice(max)}`
}

function toNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function slugify(text) {
  if (!text) return ''
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getVariationPriceBounds(variacao) {
  const directPrices = (variacao.vitrine_precos || [])
    .map((item) => toNumber(item.preco))
    .filter((value) => value != null)

  const tierPrices = (variacao.vitrine_precos_faixas || [])
    .map((item) => toNumber(item.preco))
    .filter((value) => value != null)

  const prices = [...directPrices, ...tierPrices]

  if (!prices.length) {
    return { min: null, max: null, base: null }
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    base: directPrices[0] ?? null
  }
}

function normalizeVariation(variacao) {
  const sortedDirectPrices = [...(variacao.vitrine_precos || [])]
    .sort((a, b) => (a.ordem || 0) - (b.ordem || 0))

  const sortedPriceTiers = [...(variacao.vitrine_precos_faixas || [])]
    .sort((a, b) => (a.ordem || 0) - (b.ordem || 0))

  const bounds = getVariationPriceBounds({
    ...variacao,
    vitrine_precos: sortedDirectPrices,
    vitrine_precos_faixas: sortedPriceTiers
  })

  return {
    id: variacao.id,
    nome: variacao.nome,
    tipoVariacao: variacao.tipo_variacao,
    ordem: variacao.ordem || 0,
    preco: bounds.base,
    precoMinimo: bounds.min,
    precoMaximo: bounds.max,
    priceLabel: formatPriceRange(bounds.min, bounds.max),
    priceTiers: sortedPriceTiers.map((item) => ({
      id: item.id,
      quantidadeMinima: item.quantidade_minima,
      quantidadeLabel: item.quantidade_label,
      preco: toNumber(item.preco),
      destaque: Boolean(item.destaque),
      ordem: item.ordem || 0
    }))
  }
}

function normalizeProduct(product) {
  const variacoes = (product.vitrine_variacoes || [])
    .sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
    .map((v) => normalizeVariation(v))

  const priceCandidates = variacoes.flatMap((v) => {
    const prices = []
    if (v.preco != null) prices.push(v.preco)
    if (v.precoMinimo != null) prices.push(v.precoMinimo)
    if (v.precoMaximo != null) prices.push(v.precoMaximo)
    return prices
  })

  const precoMinimo = priceCandidates.length ? Math.min(...priceCandidates) : null
  const precoMaximo = priceCandidates.length ? Math.max(...priceCandidates) : null

  return {
    ...product,
    variacoes,
    preco: precoMinimo,
    precoMinimo,
    precoMaximo,
    priceRange: formatPriceRange(precoMinimo, precoMaximo),
    slug: slugify(product.name)
  }
}

function isLocalhost() {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
}

async function fetchWithCache(endpoint, params = '', options = {}, select = '*') {
  const cacheKey = getCacheKey(endpoint, params, select)

  if (!isLocalhost()) {
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_TTL) {
          return data
        }
      }
    } catch {
      // cache invalid, continue to fetch
    }
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${endpoint}?select=${encodeURIComponent(select)}${params}`,
    {
      ...options,
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        ...options.headers
      }
    }
  )

  if (!res.ok) throw new Error(`Erro na API: ${res.status}`)

  const data = await res.json()

  if (!isLocalhost()) {
    try {
      localStorage.setItem(cacheKey, JSON.stringify({
        data,
        timestamp: Date.now()
      }))
    } catch (e) {
      console.warn('Cache write failed:', e)
    }
  }

  return data
}

function clearCache(pattern = '') {
  const keys = Object.keys(localStorage)
  keys.forEach(key => {
    if (key.startsWith('cache_') && key.includes(pattern)) {
      localStorage.removeItem(key)
    }
  })
}

export { fetchWithCache, clearCache }

// TIPOS DE PRODUTO
export async function fetchProductTypes() {
  const data = await fetchWithCache(
    PRODUCTS_ENDPOINT,
    '&order=name.asc',
    {},
    'tipo'
  )
  const tipos = [...new Set(data.map(p => p.tipo).filter(Boolean))]
  return tipos.sort((a, b) => a.localeCompare(b))
}

// REGISTRAR ACESSO AO PRODUTO
export async function registrarAcesso(produtoId) {
  const ipHash = getVisitorId()
  const dispositivo = getDevice()
  const fonte = getOrigin()

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/registrar_acesso_vitrine`,
    {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        p_vitrine_id: produtoId,
        p_ip: ipHash,
        p_dispositivo: dispositivo,
        p_fonte: fonte
      })
    }
  )

  if (!res.ok) {
    console.error('Erro ao registrar acesso')
  }
}

function getVisitorId() {
  const stored = localStorage.getItem('visitor_id')
  if (stored) return stored

  const visitorId = btoa(
    (navigator.userAgent + Date.now().toString(36) + Math.random().toString(36))
  ).slice(0, 24)

  try {
    localStorage.setItem('visitor_id', visitorId)
  } catch {}

  return visitorId
}

// UTILITÁRIOS
function getDevice() {
  return /Mobi|Android/i.test(navigator.userAgent)
    ? 'mobile'
    : 'desktop'
}

function getBrowser() {
  const ua = navigator.userAgent
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari')) return 'Safari'
  return 'Outro'
}

function getOrigin() {
  const ref = document.referrer
  if (!ref) return 'direto'
  if (ref.includes('instagram')) return 'instagram'
  if (ref.includes('wa.me')) return 'whatsapp'
  return 'outro'
}

// PRODUTOS
export async function fetchProducts(params = '') {
  const data = await fetchWithCache(PRODUCTS_ENDPOINT, params, {}, VITRINE_SELECT)
  return data.map(normalizeProduct)
}

export async function fetchMaisAcessados() {
  return fetchProducts('&order=acessos.desc&limit=6')
}

export async function fetchProductById(id) {
  const data = await fetchWithCache(
    PRODUCTS_ENDPOINT,
    `&id=eq.${id}&vitrine_variacoes.order=ordem.asc&vitrine_variacoes.vitrine_precos.order=ordem.asc&vitrine_variacoes.vitrine_precos_faixas.order=ordem.asc`,
    {},
    VITRINE_SELECT
  )

  return data?.[0] ? normalizeProduct(data[0]) : null
}

export async function fetchProductsByType(tipo) {
  const data = await fetchWithCache(
    PRODUCTS_ENDPOINT,
    `&tipo=eq.${tipo}&order=acessos.desc&vitrine_variacoes.order=ordem.asc&vitrine_variacoes.vitrine_precos.order=ordem.asc&vitrine_variacoes.vitrine_precos_faixas.order=ordem.asc`,
    {},
    VITRINE_SELECT
  )

  return data.map(normalizeProduct)
}

export async function fetchProductsByCategory(categoria) {
  const data = await fetchWithCache(
    PRODUCTS_ENDPOINT,
    `&categorias.cs.{"${categoria}"}&vitrine_variacoes.order=ordem.asc&vitrine_variacoes.vitrine_precos.order=ordem.asc&vitrine_variacoes.vitrine_precos_faixas.order=ordem.asc`,
    {},
    VITRINE_SELECT
  )

  return data.map(normalizeProduct)
}

export async function fetchProductBySlug(tipo, slug) {
  if (!tipo || !slug) return null
  const products = await fetchProductsByType(tipo)
  return products.find((product) => product.slug === slug) || null
}

// SESSÃO
export async function criarSessao() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/sessions`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      dispositivo: getDevice(),
      navegador: getBrowser(),
      origem: getOrigin(),
      user_agent: navigator.userAgent
    })
  })

  if (!res.ok) {
    console.error('Erro ao criar sessão')
    return null
  }

  const data = await res.json()
  return data[0]?.id
}

// EVENTOS
export async function registrarEvento({
  session_id,
  page,
  product_id = null,
  product_name = null
}) {
  await fetch(`${SUPABASE_URL}/rest/v1/events`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      session_id,
      page,
      product_id,
      product_name
    })
  })
}

// FINALIZAR SESSÃO
export async function finalizarSessao(sessionId) {
  await fetch(`${SUPABASE_URL}/rest/v1/sessions?id=eq.${sessionId}`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ended_at: new Date().toISOString()
    })
  })
}
