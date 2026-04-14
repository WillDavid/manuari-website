<script>
import { PRODUCT_TYPES } from '../constants/config'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: Array,
      required: true
    },
    tipo: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      currentImageIndex: 0
    }
  },

  computed: {
    currentImage() {
      return this.image[this.currentImageIndex]
    },

    priceRange() {
      const config = PRODUCT_TYPES[this.tipo]
      return config?.priceRange || ''
    }
  },

  methods: {
    openDetails() {
      this.$router.push(`/produto/${this.id}`)
    },

    startHover() {
      if (this.image.length > 1) {
        this.currentImageIndex = 1
      }
    },

    stopHover() {
      this.currentImageIndex = 0
    }
  }
}
</script>

<template>
  <article
    class="product-card"
    @click="openDetails"
    @mouseenter="startHover"
    @mouseleave="stopHover"
  >
    <div class="image-wrapper">
      <img :src="currentImage" :alt="name" loading="lazy" />
    </div>

    <span class="product-tipo">
      {{ tipo }}
    </span>

    <h3 class="product-name">
      {{ name }}
    </h3>

    <span class="product-price">
      {{ priceRange }}
    </span>
  </article>
</template>

<style scoped>
.product-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.product-card:hover {
  transform: scale(1.04);
}

.image-wrapper {
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #f3f3f3;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-tipo {
  margin-top: 0.5rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  opacity: 0.6;
  text-align: center;
}

.product-name {
  margin: 0.6rem 0 0.9rem;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.35;
  text-align: center;
}

.product-price {
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0.65;
  text-align: center;
  margin-top: 0;
}
</style>