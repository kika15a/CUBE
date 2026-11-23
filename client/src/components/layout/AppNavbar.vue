<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faCube, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NAV_ITEMS } from '@/config/navigation';
import { useMobileMenu } from '@/composables/useMobileMenu';

const { isOpen, toggle, close } = useMobileMenu();
</script>

<template>
  <header class="navbar">
    <RouterLink :to="{ name: 'home' }" class="logo" aria-label="Cube Center — ir al inicio" @click="close">
      <FontAwesomeIcon :icon="faCube" class="logo__icon" />
      <span class="logo__text">CUBE CENTER</span>
    </RouterLink>

    <button
      type="button"
      class="menu-toggle"
      :aria-expanded="isOpen"
      aria-controls="main-nav"
      :aria-label="isOpen ? 'Cerrar menú' : 'Abrir menú'"
      @click="toggle"
    >
      <FontAwesomeIcon :icon="isOpen ? faXmark : faBars" />
    </button>

    <nav id="main-nav" class="nav" :class="{ 'nav--open': isOpen }" aria-label="Principal">
      <ul class="nav__list">
        <li v-for="item in NAV_ITEMS" :key="item.label">
          <RouterLink :to="item.to" class="nav__link">
            <FontAwesomeIcon :icon="item.icon" fixed-width />
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 5%;
  background: var(--color-surface);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.logo__icon {
  font-size: 2rem;
  color: var(--color-accent);
}
.logo__text {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--color-accent), var(--color-accent-strong));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.menu-toggle {
  display: none;
  padding: 0.4rem 0.6rem;
  border: 0;
  background: none;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
}

.nav__list {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}
.nav__link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: var(--color-text);
  font-weight: 500;
  text-decoration: none;
  transition:
    background 0.3s ease,
    transform 0.3s ease;
}
.nav__link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}
.nav__link.router-link-exact-active {
  color: var(--color-accent);
  background: rgba(255, 255, 255, 0.08);
}

@media (max-width: 900px) {
  .menu-toggle {
    display: block;
  }

  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.92);
    /* Cerrado: invisible Y fuera del orden de tabulación */
    visibility: hidden;
    opacity: 0;
    transform: translateY(-8px);
    transition:
      opacity 0.25s ease,
      transform 0.25s ease,
      visibility 0.25s;
  }
  .nav--open {
    visibility: visible;
    opacity: 1;
    transform: none;
  }

  .nav__list {
    flex-direction: column;
    gap: 0;
    padding: 1rem 0;
    text-align: center;
  }
  .nav__link {
    justify-content: center;
    padding: 0.9rem 1rem;
  }
}
</style>
