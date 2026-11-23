<script setup>
defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <section class="coming-soon">
    <h1>{{ title }}</h1>
    <p>Esta sección se está migrando a la nueva versión de Cube Center.</p>
    <RouterLink :to="{ name: 'home' }">
      Volver al inicio
    </RouterLink>
  </section>
</template>

<style scoped>
.coming-soon {
  display: grid;
  place-content: center;
  gap: 1rem;
  min-height: 60vh;
  padding: 2rem 1.25rem;
  text-align: center;
}
h1 {
  color: var(--color-accent);
}
</style>
