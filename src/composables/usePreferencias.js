import { ref, computed } from 'vue'

const HISTORICO_KEY = 'manuari_historico'
const MAX_ITEMS = 50

export function usePreferencias() {
  const historico = ref([])

  function loadHistorico() {
    try {
      const stored = localStorage.getItem(HISTORICO_KEY)
      if (stored) {
        historico.value = JSON.parse(stored)
      }
    } catch (e) {
      console.warn('Erro ao carregar histórico:', e)
    }
  }

  function saveHistorico() {
    try {
      localStorage.setItem(HISTORICO_KEY, JSON.stringify(historico.value))
    } catch (e) {
      console.warn('Erro ao salvar histórico:', e)
    }
  }

  function adicionarVisualizacao(produto) {
    if (!produto) return
    
    const item = {
      tipo: produto.tipo || null,
      categorias: produto.categorias || [],
      timestamp: Date.now()
    }
    
    historico.value.unshift(item)
    
    if (historico.value.length > MAX_ITENS) {
      historico.value = historico.value.slice(0, MAX_ITENS)
    }
    
    saveHistorico()
  }

  function getCategoriasPreferidas() {
    if (historico.value.length === 0) return []
    
    const contagem = {}
    
    historico.value.forEach(item => {
      if (item.categorias && Array.isArray(item.categorias)) {
        item.categorias.forEach(cat => {
          contagem[cat] = (contagem[cat] || 0) + 1
        })
      }
    })
    
    const ordenado = Object.entries(contagem)
      .sort((a, b) => b[1] - a[1])
      .map(([categoria]) => categoria)
    
    return ordenado
  }

  function getTiposPreferidos() {
    if (historico.value.length === 0) return []
    
    const contagem = {}
    
    historico.value.forEach(item => {
      if (item.tipo) {
        contagem[item.tipo] = (contagem[item.tipo] || 0) + 1
      }
    })
    
    const ordenado = Object.entries(contagem)
      .sort((a, b) => b[1] - a[1])
      .map(([tipo]) => tipo)
    
    return ordenado
  }

  function getPreferenciaPrincipal() {
    const cats = getCategoriasPreferidas()
    return cats.length > 0 ? cats[0] : null
  }

  function limparHistorico() {
    historico.value = []
    localStorage.removeItem(HISTORICO_KEY)
  }

  loadHistorico()

  return {
    historico,
    adicionarVisualizacao,
    getCategoriasPreferidas,
    getTiposPreferidos,
    getPreferenciaPrincipal,
    limparHistorico
  }
}