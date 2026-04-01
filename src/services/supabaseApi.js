const SUPABASE_URL = 'https://byriesholblgyysnmnpu.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cmllc2hvbGJsZ3l5c25tbnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMDI4ODgsImV4cCI6MjA4NDY3ODg4OH0.QppXyuMNaidr3oNoCBv3SImYctDVgeLbWqeg60u3auE'


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


// ==========================
// 🔍 UTILITÁRIOS
// ==========================
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

// ==========================
// 📦 PRODUTOS (já tinha)
// ==========================
export async function fetchProducts(params = '') {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/products?select=*${params}`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  )

  if (!res.ok) throw new Error('Erro ao buscar produtos')
  return res.json()
}

export async function fetchMaisAcessados() {
  return fetchProducts('&order=acessos.desc&limit=6')
}

export async function fetchProductById(id) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/products?id=eq.${id}&select=*`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  )

  if (!res.ok) throw new Error('Erro ao buscar produto')

  const data = await res.json()
  return data[0] || null
}

// ==========================
// 🧠 SESSÃO
// ==========================
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

// ==========================
// 📊 EVENTOS
// ==========================
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

// ==========================
// ⏱️ FINALIZAR SESSÃO
// ==========================
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