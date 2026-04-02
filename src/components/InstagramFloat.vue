<script>
export default {
  name: 'InstagramFloat',

  props: {
    username: {
      type: String,
      required: true
    }
  },

  computed: {
    link() {
      return `https://instagram.com/${this.username}`
    }
  }
}
</script>

<template>
  <a
    :href="link"
    target="_blank"
    class="instagram-float"
    aria-label="Instagram"
  >
    <svg viewBox="0 0 24 24">
      <path
        fill="white"
        d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.22 4 20 5.78 20 7.75v8.5c0 1.97-1.78 3.75-3.75 3.75h-8.5C5.78 20 4 18.22 4 16.25v-8.5C4 5.78 5.78 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"
      />
    </svg>
  </a>
</template>

<style scoped>
.instagram-float {
  position: fixed;
  bottom: 5.5rem; /* 👈 FICA ACIMA DO WHATS */
  right: 1.2rem;
  width: 56px;
  height: 56px;
  background: linear-gradient(45deg, #f58529, #dd2a7b, #8134af);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
  z-index: 999;
  transition: transform 0.2s ease;
}

.instagram-float:hover {
  transform: scale(1.08);
}

.instagram-float svg {
  width: 26px;
  height: 26px;
}
</style>