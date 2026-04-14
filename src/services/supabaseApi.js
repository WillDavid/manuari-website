import { SUPABASE, CACHE_TTL } from '../constants/config'

const { url: SUPABASE_URL, key: SUPABASE_KEY } = SUPABASE

function getCacheKey(endpoint, params = '') {
  return `cache_${endpoint}_${params.replace(/[?=]/g, '_')}`
}

async function fetchWithCache(endpoint, params = '', options = {}) {
  const cacheKey = getCacheKey(endpoint, params)
  
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
    `${SUPABASE_URL}/rest/v1/${endpoint}?select=*${params}`,
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
  return fetchWithCache('products', params)
}

export async function fetchMaisAcessados() {
  return fetchProducts('&order=acessos.desc&limit=6')
}

export async function fetchProductById(id) {
  const data = await fetchWithCache('products', `&id=eq.${id}`)
  return data?.[0] || null
}

export async function fetchProductsByType(tipo) {
  return fetchWithCache('products', `&tipo=eq.${tipo}&order=relevancia.desc`)
}

export async function fetchProductsByCategory(categoria) {
  return fetchWithCache('products', `&categorias.cs.{"${categoria}"}`)
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