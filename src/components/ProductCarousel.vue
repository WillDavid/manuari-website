<script>
import CardProduct from './CardProduct.vue'

export default {
  components: { CardProduct },

  props: {
    products: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      currentIndex: 0,
      itemsPerView: 4
    }
  },

  computed: {
    maxIndex() {
      return Math.max(this.products.length - this.itemsPerView, 0)
    },
    trackStyle() {
      const percent = (100 / this.itemsPerView) * this.currentIndex
      return {
        transform: `translateX(-${percent}%)`
      }
    }
  },

  methods: {
    next() {
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex++
      }
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    updateItemsPerView() {
      const w = window.innerWidth

      if (w < 768) this.itemsPerView = 2
      else if (w < 1024) this.itemsPerView = 3
      else this.itemsPerView = 4

      this.currentIndex = 0
    }
  },

  mounted() {
    this.updateItemsPerView()
    window.addEventListener('resize', this.updateItemsPerView)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.updateItemsPerView)
  }
}
</script>

<template>
  <section class="carousel">
    <!-- BOTÃO ESQUERDA -->
    <button
      class="nav prev"
      @click="prev"
      :disabled="currentIndex === 0"
    >
      ‹
    </button>

    <!-- JANELA -->
    <div class="viewport">
      <div class="track" :style="trackStyle">
        <div
          class="slide"
          v-for="(product, index) in products"
          :key="index"
        >
          <CardProduct
            :name="product.name"
            :image="product.images"
            :tipo="product.tipo"
            :id="product.id"
          />
        </div>
      </div>
    </div>

    <!-- BOTÃO DIREITA -->
    <button
      class="nav next"
      @click="next"
      :disabled="currentIndex === maxIndex"
    >
      ›
    </button>
  </section>
</template>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

/* JANELA */
.viewport {
  overflow: hidden;
  width: 100%;
  padding: 2rem 0;
}

/* TRILHA */
.track {
  display: flex;
  transition: transform 0.35s ease;
}

/* SLIDES */
.slide {
  flex: 0 0 25%; /* 4 por vez (desktop) */
  padding: 0 0.75rem;
  box-sizing: border-box;
}

/* BOTÕES */
.nav {
  background: none;
  border: none;
  font-size: 2.4rem;
  cursor: pointer;
  color: #333;
}

.nav:disabled {
  opacity: 0.3;
  cursor: default;
}

/* TABLET → 3 */
@media (max-width: 1024px) {
  .slide {
    flex: 0 0 33.3333%;
  }
}

/* MOBILE → 2 */
@media (max-width: 768px) {
  .slide {
    flex: 0 0 50%;
  }

  .nav {
    font-size: 2rem;
  }
}
</style>
