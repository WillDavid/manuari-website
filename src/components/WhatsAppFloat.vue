<script>
export default {
  name: 'WhatsAppFloat',

  props: {
    phone: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: 'Olá! Vim pelo site e gostaria de mais informações 😊'
    }
  },

  computed: {
    link() {
      return `https://wa.me/${this.phone}?text=${encodeURIComponent(this.message)}`
    }
  }
}
</script>

<template>
  <a
    :href="link"
    target="_blank"
    class="whatsapp-float"
    aria-label="WhatsApp"
  >
    <svg viewBox="0 0 32 32">
      <path
        fill="white"
        d="M19.11 17.39c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.35-1.61-1.51-1.88-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26s.98 2.62 1.12 2.8c.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.57.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.27.23-.62.23-1.15.16-1.27-.07-.12-.25-.2-.52-.34z"
      />
      <path
        fill="white"
        d="M16.01 3.2c-7.1 0-12.8 5.7-12.8 12.8 0 2.26.59 4.38 1.62 6.23L3.2 28.8l6.73-1.58c1.8.98 3.86 1.53 6.08 1.53 7.1 0 12.8-5.7 12.8-12.8s-5.7-12.75-12.8-12.75zm0 22.84c-1.94 0-3.73-.52-5.3-1.43l-.38-.22-3.99.94.95-3.88-.25-.4c-.96-1.57-1.5-3.41-1.5-5.37 0-5.5 4.48-9.98 9.98-9.98s9.98 4.48 9.98 9.98-4.48 9.36-9.98 9.36z"
      />
    </svg>
  </a>
</template>

<style scoped>
.whatsapp-float {
  position: fixed;
  bottom: 1.2rem;
  right: 1.2rem;
  width: 56px;
  height: 56px;
  background: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
  z-index: 999;
  transition: transform 0.2s ease;
}

.whatsapp-float:hover {
  transform: scale(1.08);
}

.whatsapp-float svg {
  width: 28px;
  height: 28px;
}
</style>
