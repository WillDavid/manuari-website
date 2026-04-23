<script>
import { WHATSAPP } from './constants/config'
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
      sessionId: null,
      whatsappPhone: WHATSAPP.phone,
      whatsappMessage: WHATSAPP.defaultMessage
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
    updateSEO(route) {
      const BASE_URL = 'https://manuari.com.br'

      const canonical = document.getElementById('canonical-url')
      const ogUrl = document.getElementById('og-url')

      if (canonical) {
        canonical.setAttribute('href', `${BASE_URL}${route.path}`)
      }
      if (ogUrl) {
        ogUrl.setAttribute('content', `${BASE_URL}${route.path}`)
      }

      if (route.meta && route.meta.title) {
        document.title = route.meta.title
      }

      const description = document.querySelector("meta[name='description']")

      if (description && route.meta && route.meta.description) {
        description.setAttribute('content', route.meta.description)
      }

      const keywords = document.querySelector("meta[name='keywords']")

      if (keywords && route.meta && route.meta.keywords) {
        keywords.setAttribute('content', route.meta.keywords)
      }

      const ogTitle = document.querySelector("meta[property='og:title']")
      if (ogTitle && route.meta && route.meta.title) {
        ogTitle.setAttribute('content', route.meta.title)
      }

      const ogDesc = document.querySelector("meta[property='og:description']")
      if (ogDesc && route.meta && route.meta.description) {
        ogDesc.setAttribute('content', route.meta.description)
      }

      const twitterTitle = document.querySelector("meta[name='twitter:title']")
      if (twitterTitle && route.meta && route.meta.title) {
        twitterTitle.setAttribute('content', route.meta.title)
      }

      const twitterDesc = document.querySelector("meta[name='twitter:description']")
      if (twitterDesc && route.meta && route.meta.description) {
        twitterDesc.setAttribute('content', route.meta.description)
      }

      const robots = document.querySelector("meta[name='robots']")
      if (robots) {
        if (route.name === 'notfound') {
          robots.setAttribute('content', 'noindex, nofollow')
        } else {
          robots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large')
        }
      }
    },

    async initSession() {
      let sessionId = localStorage.getItem('session_id')

      if (!sessionId) {
        sessionId = await criarSessao()
        localStorage.setItem('session_id', sessionId)
      }

      this.sessionId = sessionId

      window.addEventListener('beforeunload', () => {
        if (this.sessionId) {
          finalizarSessao(this.sessionId)
        }
      })
    },

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
        :phone="whatsappPhone"
        :message="whatsappMessage"
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

@media (max-width: 1024px) {
  .container {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
}
</style>