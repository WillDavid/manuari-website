<script>
import { getSeoImageUrl } from '../utils/seoImage'
import { formatTipoLabel } from '../constants/config'

export default {
  props: {
    id: {
      type: [String, Number],
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
    },
    slug: {
      type: String,
      required: true
    },
    priceRange: {
      type: String,
      default: ''
    },
    isTopAcessado: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      currentImageIndex: 0,
      imageError: false
    }
  },

  computed: {
    currentImage() {
      if (this.imageError || !this.image.length) return null
      return getSeoImageUrl(this.image[this.currentImageIndex])
    },
    tipoLabel() {
      return formatTipoLabel(this.tipo)
    },
    imageAlt() {
      const tipo = formatTipoLabel(this.tipo).toLowerCase() + ' personalizado'
      return `${this.name} - ${tipo} da Manuari em Manaus`
    },
    displayPrice() {
      if (!this.priceRange) return ''
      if (this.priceRange.includes(' - ')) return `A partir de ${this.priceRange.split(' - ')[0]}`
      return this.priceRange
    }
  },

  methods: {
    openDetails() {
      this.$router.push({
        name: 'product-detail',
        params: {
          tipo: this.tipo,
          slug: this.slug
        }
      })
    },

    startHover() {
      if (this.image.length > 1 && !this.imageError) this.currentImageIndex = 1
    },

    stopHover() {
      if (!this.imageError) this.currentImageIndex = 0
    },

    onImageError() {
      this.imageError = true
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
        <img
          v-if="currentImage"
          :src="currentImage"
          :alt="imageAlt"
          :title="imageAlt"
          loading="lazy"
          decoding="async"
          @error="onImageError"
        />
        <div v-else class="image-fallback">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40%" height="40%">
            <rect x="2" y="2" width="20" height="20" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
          </svg>
        </div>
      <span v-if="isTopAcessado" class="top-badge">
        <i class="fas fa-star"></i> Em Alta
      </span>
    </div>

    <span class="product-tipo">{{ tipoLabel }}</span>

    <h3 class="product-name">{{ name }}</h3>

    <span class="product-price">{{ displayPrice }}</span>
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
  position: relative;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
}

.top-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 12px rgba(255, 165, 0, 0.6);
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.top-badge i {
  font-size: 0.6rem;
}

.product-tipo {
  margin-top: 0.4rem;
  font-size: 0.65rem;
  text-transform: uppercase;
  opacity: 0.6;
  text-align: center;
}

.product-name {
  margin: 0.4rem 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0.65;
  text-align: center;
  margin-top: 0;
}
</style>
