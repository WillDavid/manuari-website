<script>
export default {
  name: 'Breadcrumb',

  props: {
    tipo: {
      type: String,
      default: null
    },
    nomeProduto: {
      type: String,
      default: ''
    }
  },

  methods: {
    goHome() {
      this.$router.push('/')
    },

    goToTipo() {
      this.$router.push(`/produtos/${this.tipo}`)
    }
  }
}
</script>

<template>
  <nav class="breadcrumb">
    <span class="link" @click="goHome">Início</span>

    <span v-if="tipo"> › </span>

    <span
      v-if="tipo"
      class="link"
      @click="goToTipo"
    >
      {{ tipo }}
    </span>

    <span> › </span>

    <span class="current">
      {{ nomeProduto }}
    </span>
  </nav>
</template>

<style scoped>
.breadcrumb {
  font-size: 0.8rem;
  margin-bottom: 1rem;
  color: #666;
}

.link {
  cursor: pointer;
  color: #000;
}

.link:hover {
  text-decoration: underline;
}

.current {
  opacity: 0.6;
}
</style>
