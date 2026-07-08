<script>
import HeroCarousel from '../components/HeroCarousel.vue'
import CardProduct from '../components/CardProduct.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import { fetchProducts, fetchMaisAcessados } from '../services/supabaseApi'
import { WHATSAPP } from '../constants/config'
import { usePreferencias } from '../composables/usePreferencias'
import { useJsonLd, jsonLd } from '../composables/useJsonLd'
import { getSeoImageUrls } from '../utils/seoImage'

export default {
  components: { HeroCarousel, CardProduct, SkeletonCard },

  setup() {
    const { getPreferenciaPrincipal } = usePreferencias()
    const { inject: injectJsonLd } = useJsonLd()
    return { getPreferenciaPrincipal, injectJsonLd }
  },

  data() {
    return { products: [], maisAcessados: [], loading: true, preferencia: null }
  },

  computed: {
    whatsAppLink() {
      return `https://wa.me/${WHATSAPP.phone}?text=${encodeURIComponent(WHATSAPP.messages.home)}`
    },
    canecasIndexaveis() {
      return this.products.filter(p => p.tipo === 'canecas' && p.images?.[0]).slice(0, 12)
    },
    lancamentos() {
      return [...this.products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10)
    },
    todasTags() {
      const tags = new Set()
      this.products.forEach(p => { if (p.categorias) p.categorias.forEach(c => tags.add(c)) })
      return [...tags].filter(tag => this.products.filter(p => p.categorias && p.categorias.includes(tag)).length >= 5)
    },
    tagDoDia() {
      if (this.preferencia) {
        const prods = this.products.filter(p => p.categorias && p.categorias.includes(this.preferencia))
        if (prods.length >= 5) return this.preferencia
      }
      if (!this.todasTags.length) return null
      return this.todasTags[Math.floor(Math.random() * this.todasTags.length)]
    },
    produtosParaVoce() {
      if (!this.tagDoDia) return []
      return this.products.filter(p => p.categorias && p.categorias.includes(this.tagDoDia))
    },
    homeImageJsonLd() {
      if (!this.canecasIndexaveis.length) return null
      return {
        '@context': 'https://schema.org', '@type': 'CollectionPage',
        name: 'Canecas personalizadas em Manaus | Manuari',
        description: 'Coleção de canecas personalizadas da Manuari em Manaus.',
        url: 'https://manuari.com.br/',
        mainEntity: { '@type': 'ItemList', itemListElement: this.canecasIndexaveis.map((p, i) => ({
          '@type': 'ListItem', position: i + 1,
          url: `https://manuari.com.br/produtos/${p.tipo}/${p.slug}`,
          item: { '@type': 'Product', name: p.name, image: getSeoImageUrls(p.images || []).map(u => u.startsWith('/') ? `https://manuari.com.br${u}` : u), category: 'Caneca personalizada', brand: { '@type': 'Brand', name: 'Manuari' } }
        })) }
      }
    }
  },

  watch: {
    homeImageJsonLd(newVal) { if (newVal) this.injectJsonLd('home-image-seo', newVal) }
  },

  async mounted() {
    try {
      this.loading = true
      const [products, mais] = await Promise.all([fetchProducts(), fetchMaisAcessados()])
      this.products = products
      this.maisAcessados = mais
      const pref = this.getPreferenciaPrincipal()
      if (pref && this.products.filter(p => p.categorias && p.categorias.includes(pref)).length >= 5) this.preferencia = pref
      if (this.homeImageJsonLd) this.injectJsonLd('home-image-seo', this.homeImageJsonLd)
    } catch (e) { console.error(e) }
    finally { this.loading = false }
  },

  beforeUnmount() { jsonLd.remove() }
}
</script>

<template>
  <section class="home">
    <h1 class="visually-hidden">
      Caneca personalizada em Manaus, Botton personalizado online, Xícara personalizada, Azulejo personalizado — Manuari
    </h1>

    <HeroCarousel />

    <!-- MAIS VENDIDOS -->
    <section class="section-products">
      <div class="section-header">
        <h2>Mais vendidos</h2>
        <RouterLink to="/produtos" class="section-link">Ver todos ›</RouterLink>
      </div>
      <div v-if="loading" class="product-grid">
        <SkeletonCard v-for="i in 5" :key="i" />
      </div>
      <div v-else class="product-grid">
        <CardProduct
          v-for="p in maisAcessados"
          :key="p.id"
          :id="p.id" :name="p.name" :image="p.images"
          :tipo="p.tipo" :slug="p.slug"
          :priceRange="p.priceRange"
          :isTopAcessado="true"
        />
      </div>
    </section>

    <!-- LANÇAMENTOS -->
    <section class="section-products">
      <div class="section-header">
        <h2>Lançamentos</h2>
        <RouterLink to="/produtos" class="section-link">Ver todos ›</RouterLink>
      </div>
      <div v-if="loading" class="product-grid">
        <SkeletonCard v-for="i in 5" :key="i" />
      </div>
      <div v-else class="product-grid">
        <CardProduct
          v-for="p in lancamentos"
          :key="p.id"
          :id="p.id" :name="p.name" :image="p.images"
          :tipo="p.tipo" :slug="p.slug"
          :priceRange="p.priceRange"
        />
      </div>
    </section>

    <!-- PARA VOCÊ -->
    <section v-if="produtosParaVoce.length" class="section-products">
      <div class="section-header">
        <h2>{{ preferencia ? 'Para você' : tagDoDia }}</h2>
        <RouterLink to="/produtos" class="section-link">Ver todos ›</RouterLink>
      </div>
      <div class="product-grid">
        <CardProduct
          v-for="p in produtosParaVoce.slice(0, 10)"
          :key="p.id"
          :id="p.id" :name="p.name" :image="p.images"
          :tipo="p.tipo" :slug="p.slug"
          :priceRange="p.priceRange"
        />
      </div>
    </section>

    <!-- BANNER ENVIE SUA ARTE -->
    <section class="promo-banner">
      <div class="promo-content">
        <h2>Envie sua arte</h2>
        <p>Você envia sua foto, logo, nome ou ideia. A Manuari transforma em produto personalizado.</p>
        <a
          :href="whatsAppLink"
          target="_blank"
          class="promo-btn"
          rel="noopener noreferrer"
        >Enviar minha ideia</a>
      </div>
    </section>

    <!-- PARA EMPRESAS -->
    <section class="b2b-banner">
      <div class="b2b-content">
        <h2>Para empresas</h2>
        <p>Bottons, canecas corporativas e brindes personalizados com sua logomarca.</p>
        <div class="b2b-btns">
          <a :href="whatsAppLink" target="_blank" class="b2b-btn b2b-btn--wa" rel="noopener noreferrer">Solicitar orçamento</a>
          <RouterLink to="/para-empresas" class="b2b-btn b2b-btn--outline">Saiba mais</RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="final-cta">
      <h2>Não encontrou o que procura?</h2>
      <p>Conte sua ideia para a Manuari e receba ajuda para criar um presente personalizado.</p>
      <div class="final-btns">
        <a :href="whatsAppLink" target="_blank" class="final-btn final-btn--wa" rel="noopener noreferrer">Falar no WhatsApp</a>
        <RouterLink to="/produtos" class="final-btn final-btn--dark">Ver todos os produtos</RouterLink>
      </div>
    </section>

  </section>
</template>

<style scoped>
.home { width: 100%; }

.section-products {
  margin-bottom: 2.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.section-header h2 {
  font-size: 1.2rem;
  font-weight: 600;
}

.section-link {
  font-size: 0.85rem;
  color: #e94b35;
  font-weight: 500;
  white-space: nowrap;
}

.section-link:hover { color: #c73e2b; }

.product-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
}

/* PROMO BANNER */
.promo-banner {
  margin: 2.5rem 0;
  padding: 2.5rem 2rem;
  background: #fdf3f1;
  border-radius: 16px;
  text-align: center;
}

.promo-banner h2 { font-size: 1.6rem; margin-bottom: 0.5rem; }
.promo-banner p { color: #555; max-width: 500px; margin: 0 auto 1.2rem; }
.promo-btn {
  display: inline-flex;
  padding: 0.7rem 2rem;
  background: #e94b35;
  color: #fff;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
}

/* B2B BANNER */
.b2b-banner {
  margin: 2.5rem 0;
  padding: 2.5rem 2rem;
  background: #111;
  color: #fff;
  border-radius: 16px;
}

.b2b-banner h2 { font-size: 1.6rem; margin-bottom: 0.5rem; color: #fff; }
.b2b-banner p { color: rgba(255,255,255,0.7); margin-bottom: 1.2rem; }
.b2b-btns { display: flex; gap: 0.8rem; flex-wrap: wrap; }

.b2b-btn {
  display: inline-flex;
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
}
.b2b-btn--wa { background: #fff; color: #111; }
.b2b-btn--outline { border: 1px solid rgba(255,255,255,0.3); color: #fff; }
.b2b-btn--outline:hover { background: rgba(255,255,255,0.1); }

/* FINAL CTA */
.final-cta {
  text-align: center;
  padding: 3rem 1.5rem;
  background: #f7f7f7;
  border-radius: 24px;
  margin-bottom: 2rem;
}

.final-cta h2 { font-size: 1.6rem; margin-bottom: 0.5rem; }
.final-cta p { color: #555; max-width: 500px; margin: 0 auto 1.5rem; }
.final-btns { display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; }

.final-btn {
  display: inline-flex;
  padding: 0.7rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
}
.final-btn--wa { background: #25d366; color: #fff; }
.final-btn--dark { background: #111; color: #fff; }

@media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 768px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); gap: 0.8rem; }
  .section-header h2 { font-size: 1.1rem; }
  .promo-banner, .b2b-banner { padding: 2rem 1rem; }
  .promo-banner h2, .b2b-banner h2, .final-cta h2 { font-size: 1.3rem; }
}
</style>
