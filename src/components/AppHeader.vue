<script>
import { NAV_ITEMS } from '../constants/config'

export default {
  data() {
    return {
      menuOpen: false,
      navItems: NAV_ITEMS
    }
  }
}
</script>

<template>
  <header class="header">
    <RouterLink to="/">
      <img
        class="img-logo"
        src="../assets/manuari-logotipo-300dpi.png"
        alt="Manuari"
      /></RouterLink>

    <button class="hamburger" @click="menuOpen = !menuOpen">
      ☰
    </button>
  </header>

  <nav class="submenu" :class="{ open: menuOpen }">
    <RouterLink 
      v-for="item in navItems" 
      :key="item.path"
      :to="item.path" 
      @click="menuOpen = false"
    >
      {{ item.label }}
    </RouterLink>
  </nav>
</template>

<style scoped>
:root {
  --manuari-red: #e94b35;
  --dark: #111;
  --dark-soft: #1c1c1c;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 1.2rem 1rem;
  position: relative;
  border-bottom: 1px solid #eee;
}

.header a {
  display: flex;
  justify-content: center;
}

.img-logo {
  width: 250px;
  max-width: 70%;
}

.hamburger {
  display: none;
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: var(--dark);
  font-size: 1.8rem;
  cursor: pointer;
}

.submenu {
  background: #fff;
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  padding: 0.9rem 1rem;
}

.submenu a {
  color: #1A1A1A;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  padding-bottom: 0.3rem;
}

.submenu a:hover {
  color: #bab0b0;
  transition: 0.3s;
}

.submenu a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: var(--manuari-red);
  transition: width 0.25s ease;
}

.submenu a:hover::after,
.submenu a.router-link-active::after {
  width: 100%;
}

@media (max-width: 768px) {
  .header {
    justify-content: flex-start;
  }

  .header a {
    justify-content: flex-start;
  }

  .img-logo {
    width: 160px;
  }

  .hamburger {
    display: block;
  }

  .submenu {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.2rem;
    gap: 1rem;
  }

  .submenu.open {
    display: flex;
  }

  .submenu a {
    width: 100%;
    font-size: 1rem;
  }
}
</style>