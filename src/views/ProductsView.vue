<script>
import CardProduct from '../components/CardProduct.vue'
import { fetchProducts, fetchMaisAcessados } from '../services/supabaseApi'
import SkeletonCard from '../components/SkeletonCard.vue'
import Breadcrumb from '../components/Breadcrumb.vue'

export default {
  components: { CardProduct, SkeletonCard, Breadcrumb },

  data() {
    return {
      products: [],
      topAcessados: [],
      busca: '',
      ordenacao: 'relevancia',
      categoriaSelecionada: null,
      loading: true,
      paginaAtual: 1,
      porPagina: 50
    }
  },

  computed: {
    tipoAtual() {
      return this.$route.params.tipo || null
    },

    categoriasDisponiveis() {
      const cats = this.produtosFiltradosRaw
        .flatMap(p => p.categorias || [])
      return [...new Set(cats)]
    },

    produtosFiltradosRaw() {
      return this.products.filter(p => {
        if (this.tipoAtual && p.tipo !== this.tipoAtual) return false
        if (this.categoriaSelecionada && !(p.categorias || []).includes(this.categoriaSelecionada)) return false
        if (this.busca.trim()) {
          const buscaLower = this.busca.toLowerCase()
          const nomeMatch = (p.name || '').toLowerCase().includes(buscaLower)
          const categoriasMatch = (p.categorias || []).some(c => c.toLowerCase().includes(buscaLower))
          if (!nomeMatch && !categoriasMatch) return false
        }
        return true
      })
    },

    produtosOrdenados() {
      const lista = [...this.produtosFiltradosRaw]
      
      switch (this.ordenacao) {
        case 'recent':
          return lista.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        case 'price-asc':
          return lista.sort((a, b) => (a.preco || 0) - (b.preco || 0))
        case 'price-desc':
          return lista.sort((a, b) => (b.preco || 0) - (a.preco || 0))
        case 'relevancia':
        default:
          return lista.sort((a, b) => (b.acessos || 0) - (a.acessos || 0))
      }
    },

    produtosPaginados() {
      const inicio = (this.paginaAtual - 1) * this.porPagina
      const fim = inicio + this.porPagina
      return this.produtosOrdenados.slice(inicio, fim)
    },

    totalPaginas() {
      return Math.ceil(this.produtosOrdenados.length / this.porPagina)
    },

    totalResultados() {
      return this.produtosOrdenados.length
    },

    titulo() {
      const nomes = {
        canecas: 'Canecas',
        xicaras: 'Xícaras',
        azulejos: 'Azulejos',
        canecas3d: 'Canecas 3D',
        bottons: 'Buttons'
      }
      return this.tipoAtual ? (nomes[this.tipoAtual] || this.tipoAtual) : 'Todos os produtos'
    },

    topAcessadosIds() {
      return new Set(this.topAcessados.map(p => p.id))
    }
  },

  watch: {
    tipoAtual() {
      this.categoriaSelecionada = null
      this.paginaAtual = 1
    },
    busca() {
      this.paginaAtual = 1
    },
    ordenacao() {
      this.paginaAtual = 1
    },
    porPagina() {
      this.paginaAtual = 1
    }
  },

  async mounted() {
    await this.carregarProdutos()
    await this.carregarTopAcessados()
  },

  methods: {
    async carregarProdutos() {
      try {
        this.loading = true
        const data = await fetchProducts()
        this.products = data
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async carregarTopAcessados() {
      try {
        const data = await fetchMaisAcessados()
        this.topAcessados = data.slice(0, 10)
      } catch (e) {
        console.error(e)
      }
    },

    irParaPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaAtual = pagina
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }
}
</script>


<template>
  <section class="products-page">
    <!-- FILTROS LATERAL (Desktop) -->
    <aside class="filters desktop-only">
      <h4>Categorias</h4>
      <ul>
        <li
          :class="{ active: !categoriaSelecionada }"
          @click="categoriaSelecionada = null"
        >
          Todas
        </li>
        <li
          v-for="cat in categoriasDisponiveis"
          :key="cat"
          :class="{ active: categoriaSelecionada === cat }"
          @click="categoriaSelecionada = cat"
        >
          {{ cat }}
        </li>
      </ul>
    </aside>

    <div class="products-area">
      <Breadcrumb :tipo="tipoAtual" nomeProduto="" />

      <!-- FILTROS CATEGORIAS (MOBILE) -->
      <div class="filters-mobile">
        <span 
          v-for="cat in categoriasDisponiveis" 
          :key="cat"
          :class="['filter-chip', { active: categoriaSelecionada === cat }]"
          @click="categoriaSelecionada = categoriaSelecionada === cat ? null : cat"
        >
          {{ cat }}
        </span>
      </div>

      <!-- CONTROLES -->
      <div class="controls">
        <h2 class="titulo">{{ titulo }}</h2>

        <div class="search-sort">
          <input
            v-model="busca"
            type="text"
            placeholder="Buscar produto..."
            class="search-input"
          />
          <select v-model="ordenacao" class="sort-select">
            <option value="relevancia">Mais relevantes</option>
            <option value="recent">Mais recentes</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
          </select>
          <select v-model="porPagina" class="per-page-select desktop-only">
            <option :value="50">50 por página</option>
            <option :value="100">100 por página</option>
            <option :value="200">200 por página</option>
          </select>
        </div>

        <p v-if="!loading" class="results-count">
          Mostrando {{ produtosPaginados.length }} de {{ totalResultados }} produtos
        </p>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="grid">
        <SkeletonCard v-for="i in 8" :key="i" />
      </div>

      <!-- PRODUTOS -->
      <div v-else-if="produtosPaginados.length" class="grid">
        <CardProduct
          v-for="(p, i) in produtosPaginados"
          :key="i"
          :id="p.id"
          :name="p.name"
          :image="p.images"
          :tipo="p.tipo"
          :isTopAcessado="topAcessadosIds.has(p.id)"
        />
      </div>

      <!-- EMPTY STATE -->
      <div v-else class="empty-state">
        <p>Nenhum produto encontrado</p>
        <span>Tente buscar por outro termo ou filtro</span>
        <button @click="busca = ''; categoriaSelecionada = null">
          Limpar filtros
        </button>
      </div>

      <!-- PAGINAÇÃO -->
      <div v-if="totalPaginas > 1" class="pagination">
        <button
          :disabled="paginaAtual === 1"
          @click="irParaPagina(paginaAtual - 1)"
        >
          ‹ Anterior
        </button>
        
        <span class="page-info">
          {{ paginaAtual }} / {{ totalPaginas }}
        </span>

        <button
          :disabled="paginaAtual === totalPaginas"
          @click="irParaPagina(paginaAtual + 1)"
        >
          Próxima ›
        </button>
      </div>

      <!-- QUANTIDADE POR PÁGINA (MOBILE) -->
      <div class="per-page-mobile mobile-only">
        <label>Por página:</label>
        <select v-model="porPagina">
          <option :value="50">50</option>
          <option :value="100">100</option>
          <option :value="200">200</option>
        </select>
      </div>
    </div>
  </section>
</template>


<style scoped>
.products-page {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 2rem;
  align-items: flex-start;
}

/* FILTROS */
.filters {
  font-size: 0.85rem;
}

.filters h4 {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.filters ul {
  list-style: none;
  padding: 0;
}

.filters li {
  cursor: pointer;
  padding: 0.3rem 0;
  opacity: 0.75;
  transition: opacity 0.2s ease;
}

.filters li:hover {
  opacity: 1;
}

.filters li.active {
  font-weight: 600;
  opacity: 1;
}

/* FILTROS MOBILE */
.filters-mobile {
  display: none;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-chip {
  padding: 0.4rem 0.8rem;
  background: #f0f0f0;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-chip.active {
  background: #111;
  color: white;
}

/* CONTROLES */
.controls {
  margin-bottom: 1.5rem;
}

.titulo {
  margin-bottom: 1rem;
}

.search-sort {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
}

.search-input:focus {
  outline: none;
  border-color: #e94b35;
}

.sort-select {
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
}

.per-page-select {
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
}

.per-page-mobile {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.per-page-mobile label {
  font-size: 0.85rem;
  color: #666;
}

.per-page-mobile select {
  padding: 0.4rem 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
}

.desktop-only {
  display: inline-block;
}

.mobile-only {
  display: none;
}

.results-count {
  font-size: 0.85rem;
  color: #666;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.2rem;
}

/* EMPTY STATE */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-state p {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.empty-state span {
  color: #666;
  display: block;
  margin-bottom: 1.5rem;
}

.empty-state button {
  padding: 0.6rem 1.5rem;
  background: #e94b35;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* PAGINAÇÃO */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button:not(:disabled):hover {
  background: #f5f5f5;
}

.page-info {
  font-size: 0.9rem;
  color: #666;
}

/* RESPONSIVO */
@media (max-width: 1024px) {
  .products-page {
    grid-template-columns: 140px 1fr;
  }
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-page {
    grid-template-columns: 1fr;
  }

  .filters {
    display: none;
  }

  .filters-mobile {
    display: flex;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: flex;
  }

  .controls {
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  .search-sort {
    flex-direction: column;
    gap: 0.75rem;
  }

  .search-input,
  .sort-select,
  .per-page-select {
    width: 100%;
    box-sizing: border-box;
  }

  .results-count {
    text-align: center;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .pagination button {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }

  .empty-state {
    padding: 2rem 1rem;
  }
}
</style>