<script setup>
import AppFooter from './AppFooter.vue';
import AppNavbar from './AppNavbar.vue';
import FloatingCubes from '@/components/ui/FloatingCubes.vue';
</script>

<template>
  <FloatingCubes />
  <div class="layout">
    <!-- Accesibilidad: permite a usuarios de teclado saltar el menú -->
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <AppNavbar />
    <main id="contenido" class="layout__main" tabindex="-1">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.layout__main {
  flex: 1;
  outline: none;
}
.skip-link {
  position: absolute;
  top: -100px;
  left: 1rem;
  z-index: 200;
  padding: 0.6rem 1rem;
  border-radius: 0 0 8px 8px;
  background: var(--color-accent);
  color: #111;
  font-weight: 700;
}
.skip-link:focus {
  top: 0;
}
</style>
