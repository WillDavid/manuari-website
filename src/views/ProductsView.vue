<script>
import CardProduct from '../components/CardProduct.vue'
import { fetchProducts } from '../services/supabaseApi'
import SkeletonCard from '../components/SkeletonCard.vue'
import Breadcrumb from '../components/Breadcrumb.vue';


export default {
  components: { CardProduct, SkeletonCard, Breadcrumb},

  data() {
    return {
      products: [],
      categoriaSelecionada: null,
      loading: true
    }
  },

  computed: {
    tipoAtual() {
      return this.$route.params.tipo || null
    },

    categoriasDisponiveis() {
      const cats = this.products
        .filter(p => !this.tipoAtual || p.tipo === this.tipoAtual)
        .flatMap(p => p.categorias)

      return [...new Set(cats)]
    },

 produtosFiltrados() {
  return this.products
    .filter(p => {
      if (this.tipoAtual && p.tipo !== this.tipoAtual) return false
      if (
        this.categoriaSelecionada &&
        !p.categorias.includes(this.categoriaSelecionada)
      ) return false
      return true
    })
    .sort((a, b) => (b.relevancia || 0) - (a.relevancia || 0))
},



    titulo() {
      return this.tipoAtual
        ? `Produtos: ${this.tipoAtual}`
        : 'Todos os produtos'
    }
  },

  watch: {
    tipoAtual() {
      // 🔑 RESET AUTOMÁTICO DA CATEGORIA
      this.categoriaSelecionada = null
    }
  },

  async mounted() {
    try {
      this.loading = true
      const data = await fetchProducts()
      this.products = data
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
    }
  }
}

</script>



<template>
  <section class="products-page">
    <!-- FILTROS -->
   <aside class="filters">
  <h4>Categorias</h4>

  <ul>
    <!-- LIMPAR FILTRO -->
    <li
  :class="{ active: !categoriaSelecionada }"
  @click="categoriaSelecionada = null"
>
  Todas
</li>


    <!-- CATEGORIAS -->
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
      <Breadcrumb
  :tipo="tipoAtual"
  nomeProduto=""
/>

  <h2>{{ titulo }}</h2>

  <!-- LOADING -->
  <div v-if="loading" class="grid">
    <SkeletonCard
      v-for="i in 8"
      :key="i"
    />
  </div>

  <!-- PRODUTOS -->
  <div v-else class="grid">
    <CardProduct
      v-for="(p, i) in produtosFiltrados"
      :key="i"
      :id="p.id"
      :name="p.name"
      :image="p.images"
      :tipo="p.tipo"
    />

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
  opacity: 0.75;
}

.filters li.active {
  font-weight: 600;
  opacity: 1;
}

.filters ul li {
  cursor: pointer;
  padding: 0.3rem 0;
  opacity: 0.75;
  transition: opacity 0.2s ease;
}

.filters ul li:hover {
  opacity: 1;
}

.filters ul li.active {
  font-weight: 600;
  opacity: 1;
}

/* BOTÃO LIMPAR */
.filters ul li.clear {
  margin-bottom: 0.5rem;
}



.filters li:hover {
  opacity: 1;
}

/* GRID DE PRODUTOS */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.2rem;
}

/* TABLET */
@media (max-width: 1024px) {
  .products-page {
    grid-template-columns: 140px 1fr;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* MOBILE */
@media (max-width: 768px) {
  .products-page {
    grid-template-columns: 1fr;
  }

  .filters {
    order: -1;              /* sobe o filtro */
    width: 100%;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
    margin-bottom: 1rem;
  }

  .filters ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 0.5rem;
  }

  .filters li {
    padding: 0rem;
    border-radius: 999px;
    background: #f5f5f5;
    font-size: 0.8rem;
    white-space: nowrap;
  }

  .filters ul li {
    padding: 0.4rem;
  }

  .filters li.active {
    background: #000;
    color: #fff;
    opacity: 1;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.4rem;
  }
}



</style>
