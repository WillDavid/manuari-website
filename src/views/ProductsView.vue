<script>
import CardProduct from '../components/CardProduct.vue'
import { fetchProducts, fetchMaisAcessados } from '../services/supabaseApi'
import SkeletonCard from '../components/SkeletonCard.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import { useJsonLd, jsonLd } from '../composables/useJsonLd'
import { getSeoImageUrls } from '../utils/seoImage'
import { formatTipoLabel } from '../constants/config'

export default {
  components: { CardProduct, SkeletonCard, Breadcrumb },

  setup() {
    const { inject: injectJsonLd } = useJsonLd()
    return { injectJsonLd }
  },

  data() {
    return {
      products: [],
      topAcessados: [],
      busca: '',
      ordenacao: 'relevancia',
      categoriaSelecionada: null,
      loading: true,
      error: null,
      paginaAtual: 1,
      porPagina: 24
    }
  },

  computed: {
    tipoAtual() { return this.$route.params.tipo || null },

    categoriasDisponiveis() {
      const cats = this.products.flatMap(p => p.categorias || [])
      return [...new Set(cats)].sort((a, b) => a.localeCompare(b))
    },

    produtosFiltrados() {
      return this.products.filter(p => {
        if (this.tipoAtual && p.tipo !== this.tipoAtual) return false
        if (this.categoriaSelecionada && !(p.categorias || []).includes(this.categoriaSelecionada)) return false
        if (this.busca.trim()) {
          const b = this.busca.toLowerCase()
          if (!(p.name || '').toLowerCase().includes(b) && !(p.categorias || []).some(c => c.toLowerCase().includes(b))) return false
        }
        return true
      })
    },

    produtosOrdenados() {
      const lista = [...this.produtosFiltrados]
      switch (this.ordenacao) {
        case 'recent': return lista.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        case 'price-asc': return lista.sort((a, b) => (a.preco || 0) - (b.preco || 0))
        case 'price-desc': return lista.sort((a, b) => (b.preco || 0) - (a.preco || 0))
        default: return lista.sort((a, b) => (b.acessos || 0) - (a.acessos || 0))
      }
    },

    produtosPaginados() {
      const inicio = (this.paginaAtual - 1) * this.porPagina
      return this.produtosOrdenados.slice(inicio, inicio + this.porPagina)
    },

    totalPaginas() { return Math.max(1, Math.ceil(this.produtosOrdenados.length / this.porPagina)) },
    totalResultados() { return this.produtosOrdenados.length },

    titulo() {
      if (!this.tipoAtual) return 'Canecas, Bottons e Mais'
      return formatTipoLabel(this.tipoAtual) + ' Personalizados'
    },

    topAcessadosIds() { return new Set(this.topAcessados.map(p => p.id)) },
    hasActiveFilters() { return !!(this.busca.trim() || this.categoriaSelecionada) },

    listingImageJsonLd() {
      if (!this.produtosPaginados.length) return null
      return {
        '@context': 'https://schema.org', '@type': 'CollectionPage',
        name: this.titulo, description: `Coleção da Manuari para ${this.titulo.toLowerCase()} em Manaus.`,
        url: `https://manuari.com.br${this.$route.path}`,
        mainEntity: { '@type': 'ItemList', itemListElement: this.produtosPaginados.slice(0, 16).map((p, i) => ({
          '@type': 'ListItem', position: i + 1, url: `https://manuari.com.br/produtos/${p.tipo}/${p.slug}`,
          item: { '@type': 'Product', name: p.name, image: getSeoImageUrls(p.images || []).map(u => u.startsWith('/') ? `https://manuari.com.br${u}` : u), category: p.tipo, brand: { '@type': 'Brand', name: 'Manuari' } }
        })) }
      }
    }
  },

  watch: {
    '$route.query.busca'(v) { this.busca = v || '' },
    '$route.query.categoria'(v) { this.categoriaSelecionada = v || null },
    '$route.query.ordenacao'(v) { this.ordenacao = v || 'relevancia' },
    '$route.query.pagina'(v) { const p = parseInt(v); this.paginaAtual = p > 0 ? p : 1 },
    '$route.params.tipo'() { this.categoriaSelecionada = null; this.busca = ''; this.paginaAtual = 1 },

    busca() { this.paginaAtual = 1; this.syncUrl() },
    categoriaSelecionada() { this.paginaAtual = 1; this.syncUrl() },
    ordenacao() { this.paginaAtual = 1; this.syncUrl() },
    paginaAtual() { this.syncUrl() },
    listingImageJsonLd(v) { if (v) this.injectJsonLd(`listing-seo-${this.$route.fullPath}`, v) }
  },

  async mounted() {
    this.readUrl()
    try {
      this.loading = true
      const [products, top] = await Promise.all([fetchProducts(), fetchMaisAcessados()])
      this.products = products
      this.topAcessados = top.slice(0, 10)
      if (this.listingImageJsonLd) this.injectJsonLd(`listing-seo-${this.$route.fullPath}`, this.listingImageJsonLd)
    } catch (e) { this.error = e.message || 'Erro ao carregar' }
    finally { this.loading = false }
  },

  beforeUnmount() { jsonLd.remove() },

  methods: {
    formatTipoLabel,
    readUrl() {
      const q = this.$route.query
      if (q.busca) this.busca = q.busca
      if (q.categoria) this.categoriaSelecionada = q.categoria
      if (q.ordenacao) this.ordenacao = q.ordenacao
      if (q.pagina) { const p = parseInt(q.pagina); if (p > 0) this.paginaAtual = p }
    },
    syncUrl() {
      const query = {}
      if (this.busca.trim()) query.busca = this.busca.trim()
      if (this.categoriaSelecionada) query.categoria = this.categoriaSelecionada
      if (this.ordenacao !== 'relevancia') query.ordenacao = this.ordenacao
      if (this.paginaAtual > 1) query.pagina = this.paginaAtual
      this.$router.replace({ query })
    },
    clearAll() {
      this.busca = ''; this.categoriaSelecionada = null; this.ordenacao = 'relevancia'; this.paginaAtual = 1
    },
    goToPage(p) {
      if (p >= 1 && p <= this.totalPaginas) { this.paginaAtual = p; window.scrollTo({ top: 0, behavior: 'smooth' }) }
    }
  }
}
</script>

<template>
  <section class="catalog">
    <Breadcrumb :tipo="tipoAtual" nomeProduto="" />

    <div class="catalog-hdr">
      <div class="catalog-hdr-top">
        <div>
          <h1 class="catalog-title">{{ titulo }}</h1>
          <p v-if="!loading" class="catalog-count">{{ totalResultados }} produtos</p>
        </div>
        <select v-model="ordenacao" class="catalog-sort">
          <option value="relevancia">Mais relevantes</option>
          <option value="recent">Mais recentes</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
        </select>
      </div>

      <div v-if="hasActiveFilters" class="catalog-chips">
        <span v-if="busca.trim()" class="chip">"{{ busca }}" <button @click="busca = ''">✕</button></span>
        <span v-if="categoriaSelecionada" class="chip">{{ categoriaSelecionada }} <button @click="categoriaSelecionada = null">✕</button></span>
        <button class="chip chip--clear" @click="clearAll">Limpar todos</button>
      </div>
    </div>

    <div class="catalog-layout">
      <aside class="catalog-sidebar">
        <h4>Categorias</h4>
        <ul>
          <li :class="{ active: !categoriaSelecionada }" @click="categoriaSelecionada = null">Todas</li>
          <li v-for="cat in categoriasDisponiveis" :key="cat" :class="{ active: categoriaSelecionada === cat }" @click="categoriaSelecionada = cat">{{ cat }}</li>
        </ul>
      </aside>

      <div class="catalog-main">

        <!-- busca mobile -->
        <input v-model="busca" type="search" placeholder="Buscar produtos..." class="catalog-search-mobile mobile-only" />

        <!-- loading -->
        <div v-if="loading" class="product-grid">
          <SkeletonCard v-for="i in 8" :key="i" />
        </div>

        <!-- error -->
        <div v-else-if="error" class="empty-box">
          <h3>Erro ao carregar</h3>
          <p>{{ error }}</p>
        </div>

        <!-- empty -->
        <div v-else-if="!produtosPaginados.length" class="empty-box">
          <h3>Nenhum produto encontrado</h3>
          <p>Tente buscar por outros termos ou limpar os filtros.</p>
          <button @click="clearAll" class="empty-btn">Limpar filtros</button>
        </div>

        <!-- grid -->
        <div v-else class="product-grid">
          <CardProduct
            v-for="p in produtosPaginados"
            :key="p.id"
            :id="p.id" :name="p.name" :image="p.images"
            :tipo="p.tipo" :slug="p.slug"
            :priceRange="p.priceRange"
            :isTopAcessado="topAcessadosIds.has(p.id)"
          />
        </div>

        <!-- pagination -->
        <nav v-if="totalPaginas > 1" class="pagination">
          <button :disabled="paginaAtual === 1" @click="goToPage(paginaAtual - 1)">‹ Anterior</button>
          <span>{{ paginaAtual }} de {{ totalPaginas }}</span>
          <button :disabled="paginaAtual >= totalPaginas" @click="goToPage(paginaAtual + 1)">Próxima ›</button>
        </nav>
      </div>
    </div>
  </section>
</template>

<style scoped>
.catalog-hdr { margin-bottom: 1.5rem; }
.catalog-hdr-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.5rem; }
.catalog-title { font-size: 1.6rem; font-weight: 700; margin-bottom: 0.2rem; }
.catalog-count { font-size: 0.85rem; color: #777; }
.catalog-sort { padding: 0.45rem 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 0.85rem; background: #fff; cursor: pointer; }

.catalog-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
.chip { display: inline-flex; align-items: center; gap: 4px; padding: 0.25rem 0.7rem; background: #f4f4f4; border-radius: 20px; font-size: 0.8rem; color: #111; }
.chip button { background: none; border: none; padding: 0; cursor: pointer; color: #777; font-size: 0.85rem; line-height: 1; }
.chip--clear { background: none; color: #e94b35; text-decoration: underline; cursor: pointer; border: none; font-size: 0.8rem; padding: 0.25rem 0.5rem; }

.catalog-layout { display: grid; grid-template-columns: 180px 1fr; gap: 2rem; align-items: flex-start; }
.catalog-sidebar { font-size: 0.85rem; position: sticky; top: 1rem; }
.catalog-sidebar h4 { margin-bottom: 0.5rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; }
.catalog-sidebar ul { list-style: none; padding: 0; }
.catalog-sidebar li { cursor: pointer; padding: 0.3rem 0; opacity: 0.7; transition: opacity 0.15s; }
.catalog-sidebar li:hover { opacity: 1; }
.catalog-sidebar li.active { font-weight: 600; opacity: 1; }

.catalog-main { min-width: 0; }

.catalog-search-mobile { display: none; width: 100%; margin-bottom: 0.8rem; padding: 0.5rem 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 0.9rem; }

.product-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }

.empty-box { text-align: center; padding: 3rem 1rem; }
.empty-box h3 { margin-bottom: 0.5rem; }
.empty-box p { color: #777; margin-bottom: 1rem; }
.empty-btn { padding: 0.5rem 1.5rem; background: #e94b35; color: #fff; border: none; border-radius: 8px; cursor: pointer; }

.pagination { display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; }
.pagination button { padding: 0.4rem 1rem; border: 1px solid #ddd; background: #fff; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
.pagination button:disabled { opacity: 0.4; cursor: default; }
.pagination button:not(:disabled):hover { background: #f5f5f5; }
.pagination span { font-size: 0.85rem; color: #777; }

.mobile-only { display: none; }

@media (max-width: 768px) {
  .catalog-layout { grid-template-columns: 1fr; }
  .catalog-sidebar { display: none; }
  .catalog-search-mobile { display: block; }
  .product-grid { grid-template-columns: repeat(3, 1fr); gap: 0.8rem; }
  .catalog-title { font-size: 1.3rem; }
  .mobile-only { display: block; }
  .catalog-hdr-top { flex-direction: column; }
}
</style>
