<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'
import InstagramFloat from './components/InstagramFloat.vue'
import ModalOrcamento from './components/ModalOrcamento.vue'

import {
  criarSessao,
  registrarEvento,
  finalizarSessao
} from './services/supabaseApi'

export default {
  components: {
    AppHeader,
    AppFooter,
    WhatsAppFloat,
    InstagramFloat,
    ModalOrcamento
  },

  data() {
    return {
      sessionId: null
    }
  },

  async mounted() {
    this.updateSEO(this.$route)

    await this.initSession()

    this.registrarPageView(this.$route)
  },

  watch: {
    $route(to) {
      this.updateSEO(to)
      this.registrarPageView(to)
    }
  },

  methods: {
    // ==========================
    // 🔍 SEO
    // ==========================
    updateSEO(route) {
      if (route.meta && route.meta.title) {
        document.title = route.meta.title
      }

      const description = document.querySelector("meta[name='description']")

      if (description && route.meta && route.meta.description) {
        description.setAttribute("content", route.meta.description)
      }
    },

    // ==========================
    // 🧠 SESSÃO
    // ==========================
    async initSession() {
      let sessionId = localStorage.getItem('session_id')

      if (!sessionId) {
        sessionId = await criarSessao()
        localStorage.setItem('session_id', sessionId)
      }

      this.sessionId = sessionId

      // ⏱️ quando sair do site
      window.addEventListener('beforeunload', () => {
        if (this.sessionId) {
          finalizarSessao(this.sessionId)
        }
      })
    },

    // ==========================
    // 📊 EVENTOS
    // ==========================
    async registrarPageView(route) {
      if (!this.sessionId) return

      await registrarEvento({
        session_id: this.sessionId,
        page: route.name || route.path,
        product_id: route.params?.id || null,
        product_name: null
      })
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
      <InstagramFloat username="manuari.loja" />
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