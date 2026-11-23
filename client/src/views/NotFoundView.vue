<template>
  <main class="not-found">
    <h1>404</h1>
    <p>Esta página no existe.</p>
    <RouterLink to="/">Volver al inicio</RouterLink>
  </main>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
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
