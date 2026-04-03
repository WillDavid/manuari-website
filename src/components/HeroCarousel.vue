<script>
export default {
  name: 'HeroCarousel',

  data() {
    return {
      current: 0,
      intervalId: null,

      slides: [
        {
          image: "https://byriesholblgyysnmnpu.supabase.co/storage/v1/object/public/products/banner/banner2.png",
          link: "/produtos"
        },
        {
          image: "https://byriesholblgyysnmnpu.supabase.co/storage/v1/object/public/products/banner/banner4.png",
          link: "https://wa.me/5592991802094?text=Olá, gostaria de saber mais sobre envio para outros estados!"
        }
      ]
    }
  },

  computed: {
    currentSlide() {
      return this.slides[this.current]
    },

    isCurrentExternal() {
      return this.currentSlide.link.startsWith('http')
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
    this.shuffleSlides() // 🔀 ordem aleatória
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
    <!-- SLIDE DINÂMICO -->
    <component
      :is="isCurrentExternal ? 'a' : 'RouterLink'"
      :href="isCurrentExternal ? currentSlide.link : null"
      :to="!isCurrentExternal ? currentSlide.link : null"
      :target="isCurrentExternal ? '_blank' : null"
      class="slide"
      :style="{ backgroundImage: `url(${currentSlide.image})` }"
    />

    <!-- CONTROLES -->
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

/* SLIDE */
.slide {
  position: absolute;
  inset: 0;
  display: block;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: opacity 0.4s ease;
}

/* CONTROLES */
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

/* MOBILE */
@media (max-width: 768px) {


  .nav {
    width: 34px;
    height: 34px;
    font-size: 1.4rem;
  }
}
</style>