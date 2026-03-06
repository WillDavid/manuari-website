<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'
import ModalOrcamento from './components/ModalOrcamento.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    WhatsAppFloat,
    ModalOrcamento
  },

  mounted() {
    this.updateSEO(this.$route)
  },

  watch: {
    $route(to) {
      this.updateSEO(to)
    }
  },

  methods: {
    updateSEO(route) {

      if (route.meta && route.meta.title) {
        document.title = route.meta.title
      }

      const description = document.querySelector("meta[name='description']")

      if (description && route.meta && route.meta.description) {
        description.setAttribute("content", route.meta.description)
      }

    }
  }
}
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <main class="container">
      <ModalOrcamento />
      <router-view />
      <WhatsAppFloat
    phone="5592991802094"
    message="Olá! Vim pelo site da Manuari e gostaria de mais informações!"
  />
    </main>

    <AppFooter />
  </div>
</template>


<style>

body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  /* max-width: 1280px; */
  padding: 2rem 12rem 2rem 12rem;
}


/* Tablet */
@media (max-width: 1024px) {
  .container {
    padding: 1.5rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}



</style>
