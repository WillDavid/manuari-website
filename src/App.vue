<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
    WhatsAppFloat
  }
}
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <main class="container">
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
