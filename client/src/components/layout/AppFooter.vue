<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { SOCIAL_LINKS } from '@/config/social';

const year = new Date().getFullYear();
const isExternal = (href) => href.startsWith('http');
</script>

<template>
  <footer class="footer">
    <ul
      class="social"
      aria-label="Redes sociales"
    >
      <li
        v-for="link in SOCIAL_LINKS"
        :key="link.label"
      >
        <a
          :href="link.href"
          :aria-label="link.label"
          :target="isExternal(link.href) ? '_blank' : null"
          :rel="isExternal(link.href) ? 'noopener noreferrer' : null"
        >
          <FontAwesomeIcon :icon="link.icon" />
        </a>
      </li>
    </ul>
    <p>&copy; {{ year }} Cube Center — Todos los derechos reservados</p>
    <p>El lugar perfecto para los amantes de los cubos de Rubik</p>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 4rem;
  padding: 2rem;
  background: var(--color-surface);
  text-align: center;
  color: var(--color-text-muted);
}
.social {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 0 0 1.5rem;
  list-style: none;
}
.social a {
  display: inline-block;
  color: var(--color-accent);
  font-size: 1.5rem;
  transition:
    transform 0.3s ease,
    color 0.3s ease;
}
.social a:hover {
  color: var(--color-accent-strong);
  transform: translateY(-5px);
}
.footer p + p {
  margin-top: 0.4rem;
}
</style>
