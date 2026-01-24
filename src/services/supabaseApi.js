const SUPABASE_URL = 'https://byriesholblgyysnmnpu.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cmllc2hvbGJsZ3l5c25tbnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMDI4ODgsImV4cCI6MjA4NDY3ODg4OH0.QppXyuMNaidr3oNoCBv3SImYctDVgeLbWqeg60u3auE'


// BUSCAR TODOS
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

  if (!res.ok) {
    throw new Error('Erro ao buscar produtos')
  }

  return res.json()
}

// ✅ BUSCAR UM PRODUTO PELO ID
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

  if (!res.ok) {
    throw new Error('Erro ao buscar produto')
  }

  const data = await res.json()

  // como o retorno é array, pegamos o primeiro
  return data[0] || null
}