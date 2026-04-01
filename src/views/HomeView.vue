<script>
import HeroCarousel from '../components/HeroCarousel.vue'
import ProductCarousel from '../components/ProductCarousel.vue'
import SkeletonCard from '../components/SkeletonCard.vue';
import { fetchProducts, fetchMaisAcessados } from '../services/supabaseApi'

export default {
  components: {
    HeroCarousel,
    ProductCarousel,
    SkeletonCard
  },

  data() {
    return {
      products: [],
      maisAcessados: [],
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

    const [products, mais] = await Promise.all([
      fetchProducts(),          // tudo (pra lancamentos/destaques)
      fetchMaisAcessados()      // só os top 6
    ])

    this.products = products
    this.maisAcessados = mais

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

    <h1 class="visually-hidden"> Caneca personalizada em Manaus com foto ou nome | Manuari </h1>

    <h2>Mais Vistos</h2>

<div v-if="loading" class="skeleton-row">
  <SkeletonCard v-for="i in 4" :key="i" />
</div>

<ProductCarousel
  v-else-if="maisAcessados.length"
  :products="maisAcessados" :shuffle="false"
/>

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


    <section class="seo-content">

  <div class="seo-wrapper">

    <h2>Caneca personalizada em Manaus com nome ou foto</h2>

    <p class="seo-lead">
      A <strong>Manuari</strong> produz <strong>caneca personalizada em Manaus</strong>
      com nome, foto ou arte exclusiva. Ideal para presentes, empresas e
      ocasiões especiais.
    </p>

    <p>
      Se você quer <strong>comprar caneca personalizada</strong> ou procura
      <strong>onde fazer caneca personalizada em Manaus</strong>, criamos
      <strong>caneca personalizada com nome e foto</strong> e também
      <strong>xícaras personalizadas</strong> com produção rápida e entrega local.
    </p>

  </div>

</section>

    <section class="cta-final">

  <h2>Quer criar sua caneca personalizada?</h2>

  <p>
    Fale direto com a Manuari e receba um atendimento rápido
    para criar sua caneca personalizada com nome, foto ou arte exclusiva.
  </p>

  <a
    href="https://wa.me/5592991802094?text=Olá!%20Vim%20pelo%20site%20da%20Manuari%20e%20quero%20fazer%20uma%20caneca%20personalizada."
    target="_blank"
    class="cta-botao"
  >
    Falar no WhatsApp
  </a>

    </section>

    

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

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

.seo-content {
  margin-top: 6rem;
}

.seo-wrapper {
  max-width: 820px;
  margin: 0 auto;
}

.seo-wrapper h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  border: none;
}

.seo-lead {
  font-size: 1.15rem;
  margin-bottom: 1.5rem;
}

.seo-wrapper p {
  color: #444;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.cta-final {
  margin-top: 2rem;
  padding: 2rem 1rem;
  background: #ff4425;
  color: #fff;
  border-radius: 24px;
  text-align: center;
}

.cta-final h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  border: none;
}

.cta-final p {
  max-width: 520px;
  margin: 0 auto;
}

.cta-botao {
  display: inline-block;
  margin-top: 1.8rem;
  padding: 1rem 2.5rem;
  background: #fff;
  color: #000;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
}



</style>


