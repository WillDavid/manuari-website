import { SUPABASE, CACHE_TTL } from '../constants/config'

const { url: SUPABASE_URL, key: SUPABASE_KEY } = SUPABASE
const PRODUCTS_ENDPOINT = 'vitrine'
const VITRINE_SELECT = '*,vitrine_variacoes(*,vitrine_precos(*),vitrine_precos_faixas(*))'
const FALLBACK_VARIATIONS_BY_TYPE = {
  canecas: [
    { nome: 'Branca', tipoVariacao: 'cor', ordem: 1, preco: 34.9 },
    { nome: 'Alça e Interior Preta', aliases: ['Alca Preta', 'Alça Preta', 'Alca e Interior Preta'], tipoVariacao: 'cor', ordem: 2, preco: 46.9 },
    { nome: 'Alça e Interior Amarela', aliases: ['Alca Amarela', 'Alça Amarela', 'Alca e Interior Amarela'], tipoVariacao: 'cor', ordem: 3, preco: 46.9 },
    { nome: 'Alça e Interior Vermelha', aliases: ['Alca Vermelha', 'Alça Vermelha', 'Alca e Interior Vermelha'], tipoVariacao: 'cor', ordem: 4, preco: 46.9 },
    { nome: 'Alça e Interior Lilás', aliases: ['Alca Lilas', 'Alça Lilás', 'Alça Lilas', 'Alca e Interior Lilas'], tipoVariacao: 'cor', ordem: 5, preco: 46.9 },
    { nome: 'Alça e Interior Azul', aliases: ['Alca Azul', 'Alça Azul', 'Alca e Interior Azul'], tipoVariacao: 'cor', ordem: 6, preco: 46.9 },
    { nome: 'Alça e Interior Verde', aliases: ['Alca Verde', 'Alça Verde', 'Alca e Interior Verde'], tipoVariacao: 'cor', ordem: 7, preco: 46.9 }
  ],
  xicaras: [
    { nome: 'Com pires', tipoVariacao: 'modelo', ordem: 1, preco: 46.9 },
    { nome: 'Sem pires', tipoVariacao: 'modelo', ordem: 2, preco: 42.9 }
  ],
  azulejos: [
    { nome: '15x15', tipoVariacao: 'tamanho', ordem: 1, preco: 29.9 },
    { nome: '20x20', tipoVariacao: 'tamanho', ordem: 2, preco: 34.9 }
  ],
  canecas3d: [
    { nome: 'Ceramica', tipoVariacao: 'modelo', ordem: 1, preco: 69.9 }
  ],
  bottons: [
    {
      nome: '33mm',
      tipoVariacao: 'tamanho',
      ordem: 1,
      faixas: [
        { quantidadeMinima: 1, quantidadeLabel: '01 a 09 un.', preco: 4.0, destaque: false, ordem: 1 },
        { quantidadeMinima: 10, quantidadeLabel: '10 a 29 un.', preco: 3.5, destaque: false, ordem: 2 },
        { quantidadeMinima: 30, quantidadeLabel: '30 a 49 un.', preco: 3.0, destaque: false, ordem: 3 },
        { quantidadeMinima: 50, quantidadeLabel: '50 a 99 un.', preco: 2.5, destaque: false, ordem: 4 },
        { quantidadeMinima: 100, quantidadeLabel: '100+ un.*', preco: 2.3, destaque: true, ordem: 5 }
      ]
    },
    {
      nome: '44mm',
      tipoVariacao: 'tamanho',
      ordem: 2,
      faixas: [
        { quantidadeMinima: 1, quantidadeLabel: '01 a 09 un.', preco: 5.0, destaque: false, ordem: 1 },
        { quantidadeMinima: 10, quantidadeLabel: '10 a 29 un.', preco: 4.5, destaque: false, ordem: 2 },
        { quantidadeMinima: 30, quantidadeLabel: '30 a 49 un.', preco: 4.0, destaque: false, ordem: 3 },
        { quantidadeMinima: 50, quantidadeLabel: '50 a 99 un.', preco: 3.5, destaque: false, ordem: 4 },
        { quantidadeMinima: 100, quantidadeLabel: '100+ un.*', preco: 2.7, destaque: true, ordem: 5 }
      ]
    },
    {
      nome: '58mm',
      tipoVariacao: 'tamanho',
      ordem: 3,
      faixas: [
        { quantidadeMinima: 1, quantidadeLabel: '01 a 09 un.', preco: 6.0, destaque: false, ordem: 1 },
        { quantidadeMinima: 10, quantidadeLabel: '10 a 29 un.', preco: 5.5, destaque: false, ordem: 2 },
        { quantidadeMinima: 30, quantidadeLabel: '30 a 49 un.', preco: 5.0, destaque: false, ordem: 3 },
        { quantidadeMinima: 50, quantidadeLabel: '50 a 99 un.', preco: 4.5, destaque: false, ordem: 4 },
        { quantidadeMinima: 100, quantidadeLabel: '100+ un.*', preco: 3.2, destaque: true, ordem: 5 }
      ]
    }
  ]
}
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

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function getFallbackVariations(tipo) {
  return FALLBACK_VARIATIONS_BY_TYPE[tipo] || []
}

function isReadyMadeBotton(product) {
  const normalizedName = normalizeText(product?.name)

  return product?.tipo === 'bottons'
    && !normalizedName.includes('envie sua arte')
    && (normalizedName.includes('kit') || normalizedName.includes('individual'))
}

function getKitQuantity(productName) {
  const match = String(productName || '').match(/kit\s+(\d+)/i)
  return match ? Number(match[1]) : 1
}

function getReadyMadeBottonVariationPrice(product, variacao) {
  const normalizedName = normalizeText(product?.name)
  const normalizedVariationName = normalizeText(variacao.nome)

  if (normalizedName.includes('kit 3')) {
    const priceBySize = {
      '33mm': 10,
      '44mm': 12,
      '58mm': 15
    }

    const precoKit = priceBySize[normalizedVariationName]

    if (precoKit != null) {
      return {
        ...variacao,
        preco: precoKit,
        precoMinimo: precoKit,
        precoMaximo: precoKit,
        priceLabel: formatPrice(precoKit)
      }
    }
  }

  const faixaDestaque = variacao.priceTiers.find((faixa) => faixa.destaque)
  const faixaReferencia = faixaDestaque || variacao.priceTiers[0]

  if (!faixaReferencia?.preco) return variacao

  const multiplier = normalizedName.includes('kit')
    ? getKitQuantity(product?.name)
    : 1

  const preco = faixaReferencia.preco * multiplier

  return {
    ...variacao,
    preco,
    precoMinimo: preco,
    precoMaximo: preco,
    priceLabel: formatPrice(preco)
  }
}

function findFallbackVariation(tipo, nome) {
  const normalizedName = normalizeText(nome)

  return getFallbackVariations(tipo).find((item) => {
    if (normalizeText(item.nome) === normalizedName) return true

    return (item.aliases || []).some((alias) => normalizeText(alias) === normalizedName)
  }) || null
}

function buildFallbackVariation(variacao, tipo) {
  const fallback = findFallbackVariation(tipo, variacao.nome)

  if (!fallback) return variacao

  return {
    ...variacao,
    nome: fallback.nome,
    vitrine_precos: variacao.vitrine_precos?.length
      ? variacao.vitrine_precos
      : fallback.preco != null
        ? [{ id: `fallback-price-${tipo}-${variacao.nome}`, preco: fallback.preco, ordem: 1 }]
        : [],
    vitrine_precos_faixas: variacao.vitrine_precos_faixas?.length
      ? variacao.vitrine_precos_faixas
      : (fallback.faixas || []).map((faixa, index) => ({
          id: `fallback-tier-${tipo}-${variacao.nome}-${index}`,
          quantidade_minima: faixa.quantidadeMinima,
          quantidade_label: faixa.quantidadeLabel,
          preco: faixa.preco,
          destaque: faixa.destaque,
          ordem: faixa.ordem
        }))
  }
}

function createMissingFallbackVariations(product, variacoes) {
  if (variacoes.length) return variacoes

  return getFallbackVariations(product.tipo).map((item, index) => ({
    id: `fallback-variation-${product.id}-${index}`,
    nome: item.nome,
    tipo_variacao: item.tipoVariacao,
    ordem: item.ordem,
    vitrine_precos: item.preco != null
      ? [{ id: `fallback-price-${product.id}-${index}`, preco: item.preco, ordem: 1 }]
      : [],
    vitrine_precos_faixas: (item.faixas || []).map((faixa, faixaIndex) => ({
      id: `fallback-tier-${product.id}-${index}-${faixaIndex}`,
      quantidade_minima: faixa.quantidadeMinima,
      quantidade_label: faixa.quantidadeLabel,
      preco: faixa.preco,
      destaque: faixa.destaque,
      ordem: faixa.ordem
    }))
  }))
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
    return {
      min: null,
      max: null,
      base: null
    }
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    base: directPrices[0] ?? null
  }
}

function normalizeVariation(variacao, tipo) {
  const variationWithFallback = buildFallbackVariation(variacao, tipo)

  const sortedDirectPrices = [...(variationWithFallback.vitrine_precos || [])]
    .sort((a, b) => (a.ordem || 0) - (b.ordem || 0))

  const sortedPriceTiers = [...(variationWithFallback.vitrine_precos_faixas || [])]
    .sort((a, b) => (a.ordem || 0) - (b.ordem || 0))

  const bounds = getVariationPriceBounds({
    ...variationWithFallback,
    vitrine_precos: sortedDirectPrices,
    vitrine_precos_faixas: sortedPriceTiers
  })

  return {
    id: variationWithFallback.id,
    nome: variationWithFallback.nome,
    tipoVariacao: variationWithFallback.tipo_variacao,
    ordem: variationWithFallback.ordem || 0,
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
  let variacoes = createMissingFallbackVariations(product, [...(product.vitrine_variacoes || [])])
    .sort((a, b) => (a.ordem || 0) - (b.ordem || 0))
    .map((variacao) => normalizeVariation(variacao, product.tipo))

  if (isReadyMadeBotton(product)) {
    variacoes = variacoes.map((variacao) => getReadyMadeBottonVariationPrice(product, variacao))
  }

  const priceCandidates = variacoes.flatMap((variacao) => {
    const prices = []

    if (variacao.preco != null) prices.push(variacao.preco)
    if (variacao.precoMinimo != null) prices.push(variacao.precoMinimo)
    if (variacao.precoMaximo != null) prices.push(variacao.precoMaximo)

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

async function fetchWithCache(endpoint, params = '', options = {}, select = '*') {
  const cacheKey = getCacheKey(endpoint, params, select)
  
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
  
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      data: data instanceof Promise ? await data : data,
      timestamp: Date.now()
    }))
  } catch (e) {
    console.warn('Cache write failed:', e)
  }

  return data instanceof Promise ? await data : data
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

// INCREMENTAR ACESSOS
export async function incrementarAcessos(id) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/increment_acessos`,
    {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_produto: id
      })
    }
  )

  if (!res.ok) {
    console.error('Erro ao incrementar acessos')
  }
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
