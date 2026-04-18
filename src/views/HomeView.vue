<script>
import HeroCarousel from '../components/HeroCarousel.vue'
import ProductCarousel from '../components/ProductCarousel.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import { fetchProducts, fetchMaisAcessados } from '../services/supabaseApi'
import { WHATSAPP } from '../constants/config'
import { usePreferencias } from '../composables/usePreferencias'

export default {
  components: {
    HeroCarousel,
    ProductCarousel,
    SkeletonCard
  },

  setup() {
    const { getPreferenciaPrincipal, getCategoriasPreferidas } = usePreferencias()
    return { getPreferenciaPrincipal, getCategoriasPreferidas }
  },

  data() {
    return {
      products: [],
      maisAcessados: [],
      loading: true,
      whatsappPhone: WHATSAPP.phone,
      whatsappMessage: WHATSAPP.messages.home,
      preferencia: null
    }
  },

  computed: {
    whatsAppLink() {
      return `https://wa.me/${this.whatsappPhone}?text=${encodeURIComponent(this.whatsappMessage)}`
    },
    lancamentos() {
      return [...this.products]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 6)
    },
    todasTags() {
      const tags = new Set()
      this.products.forEach(p => {
        if (p.categorias && Array.isArray(p.categorias)) {
          p.categorias.forEach(cat => tags.add(cat))
        }
      })
      return [...tags].filter(tag => {
        const produtos = this.products.filter(p => 
          p.categorias && p.categorias.includes(tag)
        )
        return produtos.length >= 5
      })
    },
    tagDoDia() {
      if (this.preferencia) {
        const temProdutos = this.products.filter(p => 
          p.categorias && p.categorias.includes(this.preferencia)
        )
        if (temProdutos.length >= 5) {
          return this.preferencia
        }
      }
      if (this.todasTags.length === 0) return null
      const indice = Math.floor(Math.random() * this.todasTags.length)
      return this.todasTags[indice]
    },
    tagsAleatorias() {
      if (this.todasTags.length < 2) return []
      
      const available = this.todasTags.filter(t => t !== this.tagDoDia)
      if (available.length === 0) return []
      
      const indice = Math.floor(Math.random() * available.length)
      return [available[indice]]
    },
    produtosTagDoDia() {
      if (!this.tagDoDia) return []
      return this.products.filter(p => 
        p.categorias && p.categorias.includes(this.tagDoDia)
      )
    },
    produtosTagsAleatorias() {
      return this.tagsAleatorias.map(tag => ({
        nome: tag,
        produtos: this.products.filter(p => 
          p.categorias && p.categorias.includes(tag)
        )
      }))
    }
  },

  async mounted() {
  try {
    this.loading = true

    const [products, mais] = await Promise.all([
      fetchProducts(),
      fetchMaisAcessados()
    ])

    this.products = products
    this.maisAcessados = mais

    const preferencia = this.getPreferenciaPrincipal()
    if (preferencia) {
      const produtosPref = this.products.filter(p => 
        p.categorias && p.categorias.includes(preferencia)
      )
      if (produtosPref.length >= 5) {
        this.preferencia = preferencia
      }
    }

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

    <!-- TAG DO DIA / PERSONALIZADO -->
    <h2 v-if="tagDoDia && produtosTagDoDia.length">
      {{ preferencia ? 'Para Você' : tagDoDia }}
    </h2>

    <div v-if="loading" class="skeleton-row">
      <SkeletonCard v-for="i in 4" :key="i" />
    </div>

    <ProductCarousel
      v-else-if="produtosTagDoDia.length"
      :products="produtosTagDoDia"
    />

    <!-- TAGS ALEATÓRIAS -->
    <template v-for="(item, index) in produtosTagsAleatorias" :key="index">
      <h2 v-if="item.produtos.length">{{ item.nome }}</h2>
      <div v-if="loading" class="skeleton-row">
        <SkeletonCard v-for="i in 4" :key="i" />
      </div>
      <ProductCarousel
        v-else-if="item.produtos.length"
        :products="item.produtos"
      />
    </template>

<section class="ver-todos">
      <RouterLink to="/produtos" class="ver-todos-btn">
        Ver todos os produtos
      </RouterLink>
    </section>

    <section class="cta-final">

  <h2>Não encontrou o que procura?</h2>

  <p>
    Fale direto com a Manuari e receba um atendimento rápido
    para criar sua caneca personalizada com nome, foto ou arte exclusiva.
  </p>

  <a
    :href="whatsAppLink"
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

.ver-todos {
  text-align: center;
  margin: 1.5rem 0;
}

.ver-todos-btn {
  display: inline-block;
  padding: 0.9rem 2.2rem;
  background: #111;
  color: #fff;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
}

.ver-todos-btn:hover {
  background: #e94b35;
  transform: scale(1.04);
}

</style>