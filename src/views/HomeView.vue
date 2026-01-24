<script>
import HeroCarousel from '../components/HeroCarousel.vue'
import ProductCarousel from '../components/ProductCarousel.vue'
import SkeletonCard from '../components/SkeletonCard.vue';
import { fetchProducts } from '../services/supabaseApi'

export default {
  components: {
    HeroCarousel,
    ProductCarousel,
    SkeletonCard
  },

  data() {
    return {
      products: [],
      loading: true
    }
  },

  computed: {
    lancamentos() {
      return this.products.filter(p => p.lancamento === true)
    },
    destaques() {
      return this.products.filter(p => p.destaque === true)
    }
  },

  async mounted() {
    try {
      this.loading = true
      const data = await fetchProducts()
      this.products = data
    } catch (e) {
      console.error('Erro ao carregar produtos', e)
    } finally {
      this.loading = false
    }
  }
}
</script>

<template>
  <section>
    <HeroCarousel />

    <!-- LANÇAMENTOS -->
    <h2>Lançamentos</h2>

    <div v-if="loading" class="skeleton-row">
      <SkeletonCard v-for="i in 4" :key="i" />
    </div>

    <ProductCarousel
      v-else-if="lancamentos.length"
      :products="lancamentos"
    />

    <!-- DESTAQUES -->
    <h2>Destaques</h2>

    <div v-if="loading" class="skeleton-row">
      <SkeletonCard v-for="i in 4" :key="i" />
    </div>

    <ProductCarousel
      v-else-if="destaques.length"
      :products="destaques"
    />

    

  </section>

</template>


<style scoped>
h2 {
  text-align: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid black;
}

.skeleton-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  margin: 1.5rem 0;
}


/* ===== RESPONSIVO ===== */
@media (max-width: 1024px) {
  .benefits {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .promo-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .benefits {
    grid-template-columns: 1fr;
  }

  .promo-grid {
    grid-template-columns: 1fr;
  }
}


/* Tablet */
@media (max-width: 1024px) {
  .skeleton-row {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .skeleton-row {
    grid-template-columns: repeat(2, 1fr);
  }
}



</style>


