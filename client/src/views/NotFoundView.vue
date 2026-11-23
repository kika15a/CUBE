<template>
  <section class="not-found">
    <h1>404</h1>
    <p>Esta página no existe.</p>
    <RouterLink to="/">Volver al inicio</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 60vh;
  display: grid;
  place-content: center;
  gap: 1rem;
  text-align: center;
}
h1 {
  font-size: 5rem;
  color: var(--color-accent);
}
</style>
