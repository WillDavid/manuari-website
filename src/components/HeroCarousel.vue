<script>
export default {
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
          image: "https://byriesholblgyysnmnpu.supabase.co/storage/v1/object/public/products/banner/banner1.png",
          link: "/produtos"
        }
      ]
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
      }, 5000) // ⏱️ 5 segundos
    },
    stopAutoplay() {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  },

  mounted() {
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
    <!-- SLIDE CLICÁVEL -->
    <RouterLink
      :to="slides[current].link"
      class="slide"
      target="_blank"
      :style="{ backgroundImage: `url(${slides[current].image})` }"
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

/* SLIDE (LINK) */
.slide {
  position: absolute;
  inset: 0;
  display: block;
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

/* CONTROLES */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  font-size: 2rem;
  width: 42px;
  height: 42px;
  cursor: pointer;
  z-index: 10; /* 🔑 acima do link */
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
