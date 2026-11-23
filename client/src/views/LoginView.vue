<script setup>
import GlassCard from '@/components/ui/GlassCard.vue';
import LoginForm from '@/features/auth/components/LoginForm.vue';
</script>

<template>
  <section class="auth">
    <header class="auth__header">
      <h1 class="auth__title">Iniciar sesión</h1>
      <p>Nos emociona tenerte de nuevo aquí. Bienvenido.</p>
    </header>
    <GlassCard class="auth__card" :lift="false">
      <h2 class="auth__subtitle">Bienvenido</h2>
      <LoginForm />
    </GlassCard>
  </section>
</template>

<style scoped>
.auth {
  padding: 3rem 5% 1rem;
}
.auth__header {
  margin-bottom: 2rem;
  text-align: center;
  color: var(--color-text-muted);
}
.auth__title {
  margin-bottom: 0.75rem;
  font-size: 2.5rem;
  background: linear-gradient(to right, var(--color-accent), var(--color-accent-strong));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.auth__card {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding: 2.5rem;
  text-align: center;
}
.auth__subtitle {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: var(--color-accent);
}
</style>
