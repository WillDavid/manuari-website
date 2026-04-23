<script>
import { BANNERS } from '../constants/config'
import { getSeoImageUrl } from '../utils/seoImage'

export default {
  name: 'HeroCarousel',

  data() {
    return {
      current: 0,
      intervalId: null,
      slides: BANNERS.hero
    }
  },

  computed: {
    currentSlide() {
      return this.slides[this.current]
    },

    isCurrentExternal() {
      return this.currentSlide.link.startsWith('http')
    },

    currentSlideAlt() {
      if (this.currentSlide.link.includes('/produtos/canecas')) {
        return 'Canecas personalizadas da Manuari em Manaus'
      }

      if (this.currentSlide.link.includes('/produtos/bottons')) {
        return 'Bottons personalizados da Manuari em Manaus'
      }

      return 'Produtos personalizados da Manuari em Manaus'
    },

    currentSlideImage() {
      return getSeoImageUrl(this.currentSlide.image)
    }
  },

  methods: {
    next() {
      this.current = (this.current + 1) % this.slides.length
    },

    prev() {
      this.current =
        (this.current - 1 + this.slides.length) % this.slides.length
    },

    startAutoplay() {
      if (this.intervalId) return

      this.intervalId = setInterval(() => {
        this.next()
      }, 5000)
    },

    stopAutoplay() {
      clearInterval(this.intervalId)
      this.intervalId = null
    },

    shuffleSlides() {
      for (let i = this.slides.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[this.slides[i], this.slides[j]] = [this.slides[j], this.slides[i]]
      }
    }
  },

  mounted() {
    this.shuffleSlides()
    this.startAutoplay()
  },

  beforeUnmount() {
    this.stopAutoplay()
  }
}
</script>

<template>
  <section
    class="carousel"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <component
      :is="isCurrentExternal ? 'a' : 'RouterLink'"
      :href="isCurrentExternal ? currentSlide.link : null"
      :to="!isCurrentExternal ? currentSlide.link : null"
      :target="isCurrentExternal ? '_blank' : null"
      class="slide"
      :aria-label="currentSlideAlt"
      :title="currentSlideAlt"
    >
      <img
        class="slide-image"
        :src="currentSlideImage"
        :alt="currentSlideAlt"
        :title="currentSlideAlt"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
    </component>

    <button class="nav prev" @click="prev">‹</button>
    <button class="nav next" @click="next">›</button>
  </section>
</template>

<style scoped>
.carousel {
  width: 100%;
  aspect-ratio: 1920 / 650;
  position: relative;
  overflow: hidden;
}

.slide {
  position: absolute;
  inset: 0;
  display: block;
  cursor: pointer;
  transition: opacity 0.4s ease;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.35);
  border: none;
  color: white;
  font-size: 2rem;
  width: 42px;
  height: 42px;
  cursor: pointer;
  z-index: 10;
  border-radius: 8px;
}

.prev {
  left: 1rem;
}

.next {
  right: 1rem;
}

@media (max-width: 768px) {
  .nav {
    width: 34px;
    height: 34px;
    font-size: 1.4rem;
  }
}
</style>
