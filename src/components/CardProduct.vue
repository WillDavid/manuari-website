<script>
import { getSeoImageUrl } from '../utils/seoImage'

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
      currentImageIndex: 0
    }
  },

  computed: {
    currentImage() {
      return getSeoImageUrl(this.image[this.currentImageIndex])
    },
    tipoLabel() {
      const labels = {
        canecas: 'Caneca Personalizada',
        bottons: 'Botton Personalizado',
        xicaras: 'Xícara',
        azulejos: 'Azulejo',
        canecas3d: 'Caneca 3D'
      }
      return labels[this.tipo] || this.tipo
    },
    imageAlt() {
      const labels = {
        canecas: 'caneca personalizada',
        bottons: 'botton personalizado',
        xicaras: 'xícara personalizada',
        azulejos: 'azulejo personalizado',
        canecas3d: 'caneca 3D personalizada'
      }

      const tipo = labels[this.tipo] || 'produto personalizado'
      return `${this.name} - ${tipo} da Manuari em Manaus`
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
        <img
          :src="currentImage"
          :alt="imageAlt"
          :title="imageAlt"
          loading="lazy"
          decoding="async"
        />
      <span v-if="isTopAcessado" class="top-badge">
        <i class="fas fa-star"></i> Em Alta
      </span>
    </div>

    <span class="product-tipo">
      {{ tipoLabel }}
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
  position: relative;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  animation: pulse-gold 2s ease-in-out infinite;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

@keyframes pulse-gold {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.top-badge i {
  font-size: 0.6rem;
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
