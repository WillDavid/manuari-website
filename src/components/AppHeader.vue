<script>
import { STATIC_NAV_ITEMS, FOOTER_NAV_ITEM, TIPO_ORDER, formatTipoLabel } from '../constants/config'
import { fetchProductTypes, fetchProducts } from '../services/supabaseApi'
import { WHATSAPP } from '../constants/config'
import { getSeoImageUrl } from '../utils/seoImage'

let debounceTimer = null

export default {
  name: 'AppHeader',

  data() {
    return {
      menuOpen: false,
      productTypes: [],
      searchQuery: '',
      topMsgIndex: 0,
      allProducts: [],
      searchResults: [],
      showResults: false,
      selectedIndex: -1
    }
  },

  computed: {
    categoriesByType() {
      const map = {}
      this.allProducts.forEach(p => {
        if (!p.tipo || !p.categorias) return
        if (!map[p.tipo]) map[p.tipo] = new Set()
        p.categorias.forEach(c => map[p.tipo].add(c))
      })
      Object.keys(map).forEach(tipo => {
        map[tipo] = [...map[tipo]].sort((a, b) => a.localeCompare(b))
      })
      return map
    },

    navItems() {
      const sorted = [...this.productTypes].sort((a, b) => {
        const orderA = TIPO_ORDER[a] ?? 99
        const orderB = TIPO_ORDER[b] ?? 99
        return orderA - orderB || a.localeCompare(b)
      })
      const typeItems = sorted.map(tipo => ({
        label: formatTipoLabel(tipo),
        path: `/produtos/${tipo}`,
        tipo: tipo,
        categories: this.categoriesByType[tipo] || []
      }))
      return [...STATIC_NAV_ITEMS, ...typeItems, FOOTER_NAV_ITEM]
    },

    whatsappLink() {
      return `https://wa.me/${WHATSAPP.phone}?text=${encodeURIComponent(WHATSAPP.defaultMessage)}`
    }
  },

  watch: {
    searchQuery(val) {
      if (!val.trim()) { this.searchResults = []; this.showResults = false; return }
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => this.filterProducts(val), 200)
    }
  },

  async mounted() {
    try {
      const [types, products] = await Promise.all([fetchProductTypes(), fetchProducts()])
      this.productTypes = types
      this.allProducts = products
    } catch (e) {
      console.error('Erro ao buscar dados', e)
    }
    if (window.innerWidth < 769) this.startTopBarRotation()
    window.addEventListener('resize', this.handleResize)
    document.addEventListener('click', this.handleClickOutside)
  },

  beforeUnmount() {
    this.stopTopBarRotation()
    window.removeEventListener('resize', this.handleResize)
    document.removeEventListener('click', this.handleClickOutside)
  },

  methods: {
    filterProducts(query) {
      const q = query.toLowerCase().trim()
      if (!q) { this.searchResults = []; this.showResults = false; return }
      this.searchResults = this.allProducts
        .filter(p => (p.name || '').toLowerCase().includes(q) || (p.categorias || []).some(c => c.toLowerCase().includes(q)))
        .slice(0, 8)
      this.showResults = this.searchResults.length > 0
      this.selectedIndex = -1
    },

    goToProduct(product) {
      this.searchQuery = ''
      this.showResults = false
      this.$router.push({ name: 'product-detail', params: { tipo: product.tipo, slug: product.slug } })
    },

    handleKeydown(e) {
      if (!this.showResults) return
      if (e.key === 'ArrowDown') { e.preventDefault(); this.selectedIndex = Math.min(this.selectedIndex + 1, this.searchResults.length - 1) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); this.selectedIndex = Math.max(this.selectedIndex - 1, -1) }
      else if (e.key === 'Enter') {
        if (this.selectedIndex >= 0 && this.searchResults[this.selectedIndex]) {
          e.preventDefault()
          this.goToProduct(this.searchResults[this.selectedIndex])
        } else {
          this.showResults = false
        }
      }
      else if (e.key === 'Escape') { this.showResults = false }
    },

    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) { this.showResults = false }
    },

    productThumb(product) {
      const img = product.images?.[0]
      return img ? getSeoImageUrl(img) : ''
    },

    formatPrice(product) {
      if (product.priceRange) {
        if (product.priceRange.includes(' - ')) return `A partir de ${product.priceRange.split(' - ')[0]}`
        return product.priceRange
      }
      return ''
    },

    doSearch() {
      const q = this.searchQuery.trim()
      if (!q) return
      this.showResults = false
      this.$router.push({ path: '/produtos', query: { busca: q } })
    },

    handleResize() {
      if (window.innerWidth < 769) {
        if (!this._rotating) this.startTopBarRotation()
      } else {
        this.stopTopBarRotation()
      }
    },

    startTopBarRotation() {
      if (this._rotating) return
      this._rotating = true
      const messages = [
        'Entrega em até 1 dia útil em Manaus',
        'Produção rápida e personalizada',
        'Enviamos para todo o Brasil',
        'Atendimento de Seg a Sáb, 9h às 18h'
      ]
      let i = 0
      this.topMsgIndex = i
      this._topInterval = setInterval(() => {
        i = (i + 1) % messages.length
        this.topMsgIndex = i
      }, 3500)
    },

    stopTopBarRotation() {
      this._rotating = false
      if (this._topInterval) {
        clearInterval(this._topInterval)
        this._topInterval = null
      }
    }
  }
}
</script>

<template>
  <div class="header-wrap">

    <!-- TOP BAR -->
    <div class="topbar">
      <div class="topbar-inner container">

        <span class="topbar-msg topbar-msg--desktop">
          <span>Entrega em até 1 dia útil em Manaus</span>
          <span class="topbar-sep">|</span>
          <span>Produção rápida e personalizada</span>
          <span class="topbar-sep">|</span>
          <span>Enviamos para todo o Brasil</span>
          <span class="topbar-sep">|</span>
          <span>Seg a Sáb, 9h às 18h</span>
        </span>

        <span class="topbar-msg topbar-msg--mobile" aria-live="polite">
          {{ ['Entrega em até 1 dia útil em Manaus', 'Produção rápida e personalizada', 'Enviamos para todo o Brasil', 'Seg a Sáb, 9h às 18h'][topMsgIndex] }}
        </span>

      </div>
    </div>

    <!-- MAIN HEADER -->
    <header class="header">
      <div class="header-inner container">

        <RouterLink to="/" class="logo-link">
          <img
            class="img-logo"
            src="../assets/manuari-logotipo-300dpi.png"
            alt="Manuari"
          />
        </RouterLink>

        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="O que você deseja personalizar?"
            class="search-input"
            @keydown="handleKeydown"
            @focus="searchQuery.trim() && filterProducts(searchQuery)"
            autocomplete="off"
          />
          <button v-if="searchQuery" class="search-clear" @click="searchQuery = ''" aria-label="Limpar">
            ✕
          </button>
          <button class="search-btn" @click="doSearch" aria-label="Buscar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          <div v-if="showResults" class="search-results">
            <div
              v-for="(p, i) in searchResults"
              :key="p.id"
              class="search-result-item"
              :class="{ active: i === selectedIndex }"
              @mousedown.prevent="goToProduct(p)"
            >
              <img v-if="productThumb(p)" :src="productThumb(p)" class="search-result-img" :alt="p.name" />
              <div class="search-result-info">
                <span class="search-result-name">{{ p.name }}</span>
                <span class="search-result-price">{{ formatPrice(p) }}</span>
              </div>
            </div>
            <div class="search-result-all" @mousedown.prevent="doSearch">
              Ver todos os resultados para "{{ searchQuery }}"
            </div>
          </div>
        </div>

        <div class="header-actions">
          <a
            :href="whatsappLink"
            target="_blank"
            class="wa-btn"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span class="wa-text">WhatsApp</span>
          </a>

          <a href="/para-empresas" class="b2b-link desktop-only">Para Empresas</a>

          <button class="hamburger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <!-- CATEGORY NAV -->
    <nav class="submenu" :class="{ open: menuOpen }">
      <template v-for="item in navItems" :key="item.path">

        <div v-if="item.categories && item.categories.length" class="submenu-dropdown">
          <RouterLink :to="item.path" class="submenu-link" @click="menuOpen = false">
            {{ item.label }}
          </RouterLink>
          <div class="submenu-dropdown-content">
            <RouterLink
              v-for="cat in item.categories"
              :key="cat"
              :to="{ path: `/produtos/${item.tipo}`, query: { categoria: cat } }"
              @click="menuOpen = false"
            >
              {{ cat }}
            </RouterLink>
          </div>
        </div>

        <RouterLink
          v-else
          :to="item.path"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </RouterLink>

      </template>
    </nav>
  </div>
</template>

<style scoped>
.header-wrap { background: #fff; position: sticky; top: 0; z-index: 100; }

/* TOP BAR */
.topbar {
  background: #111;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.3rem 0;
  overflow: hidden;
}

.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.topbar-msg--desktop {
  display: flex;
  gap: 1.2rem;
}

.topbar-sep { opacity: 0.3; }

.topbar-msg--mobile { display: none; }

/* HEADER */
.header {
  background: #fff;
  padding: 0.7rem 0;
  border-bottom: 1px solid #eee;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.logo-link { flex-shrink: 0; line-height: 1; }

.img-logo { width: 170px; height: auto; }

/* SEARCH */
.search-box {
  flex: 1;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 0.6rem 1rem;
  padding-right: 80px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: inherit;
  background: #f7f7f7;
  color: #111;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.search-input:focus {
  outline: none;
  border-color: #111;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(0,0,0,0.06);
}

.search-input::placeholder { color: #999; }

.search-clear {
  position: absolute;
  right: 46px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  color: #999;
  font-size: 0.9rem;
  line-height: 1;
}

.search-clear:hover { color: #111; }

.search-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: #111;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #fff;
  border-radius: 6px;
  display: flex;
  transition: background 0.15s;
}

.search-btn:hover { background: #333; }

/* SEARCH RESULTS DROPDOWN */
.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  z-index: 200;
  max-height: 400px;
  overflow-y: auto;
  margin-top: -2px;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 1rem;
  cursor: pointer;
  transition: background 0.1s;
}

.search-result-item:hover,
.search-result-item.active {
  background: #f5f5f5;
}

.search-result-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
  background: #f0f0f0;
}

.search-result-info {
  flex: 1;
  min-width: 0;
}

.search-result-name {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-result-price {
  display: block;
  font-size: 0.75rem;
  color: #777;
}

.search-result-all {
  padding: 0.6rem 1rem;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 500;
  color: #e94b35;
  cursor: pointer;
  border-top: 1px solid #eee;
}

.search-result-all:hover {
  background: #fdf3f1;
}

/* ACTIONS */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;
}

.wa-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.5rem 1rem;
  background: #25d366;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 0.15s;
}

.wa-btn:hover { background: #1fb855; }

.b2b-link {
  display: inline-flex;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  color: #111;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: background 0.15s;
}

.b2b-link:hover { background: #f5f5f5; }

/* HAMBURGER */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #111;
  border-radius: 1px;
  transition: all 0.2s;
}

/* SUBMENU */
.submenu {
  background: #fff;
  display: flex;
  justify-content: center;
  gap: 0;
  padding: 0;
  border-bottom: 1px solid #eee;
}

.submenu-link,
.submenu > a {
  color: #444;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.5rem 1.2rem;
  display: block;
  position: relative;
  transition: color 0.15s;
}

.submenu-link::after,
.submenu > a::after {
  content: '';
  position: absolute;
  left: 1.2rem;
  right: 1.2rem;
  bottom: 0;
  height: 2px;
  background: #e94b35;
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.submenu-link:hover,
.submenu > a:hover,
.submenu-link.router-link-active,
.submenu > a.router-link-active {
  color: #111;
}

.submenu-link:hover::after,
.submenu > a:hover::after,
.submenu-link.router-link-active::after,
.submenu > a.router-link-active::after {
  transform: scaleX(1);
}

/* DROPDOWN */
.submenu-dropdown {
  position: relative;
}

.submenu-dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  z-index: 150;
  padding: 0.5rem 0;
  max-height: 360px;
  overflow-y: auto;
}

.submenu-dropdown:hover .submenu-dropdown-content,
.submenu-link:hover + .submenu-dropdown-content {
  display: block;
}

.submenu-dropdown-content a {
  display: block;
  padding: 0.4rem 1.2rem;
  color: #555;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 400;
  white-space: nowrap;
  transition: background 0.1s, color 0.1s;
}

.submenu-dropdown-content a:hover {
  background: #f5f5f5;
  color: #111;
}

.submenu-dropdown-content a::after {
  display: none;
}

.desktop-only { display: flex; }

/* MOBILE */
@media (max-width: 768px) {
  .topbar-msg--desktop { display: none; }
  .topbar-msg--mobile { display: block; text-align: center; font-size: 0.75rem; }

  .header-inner { gap: 0.6rem; }

  .img-logo { width: 120px; }

  .search-box { display: none; }

  .desktop-only { display: none; }

  .wa-text { display: none; }
  .wa-btn { padding: 0.5rem 0.6rem; }

  .header-actions { margin-left: auto; }

  .hamburger { display: flex; }

  .submenu { display: none; flex-direction: column; padding: 1rem; gap: 0; }
  .submenu.open { display: flex; }
  .submenu-link, .submenu > a { font-size: 1rem; width: 100%; padding: 0.5rem 0; }
  .submenu-dropdown-content { display: none; }
}
</style>
