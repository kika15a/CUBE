<script setup>
import { onMounted } from 'vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';
import { useApiStatusStore } from '@/stores/apiStatus';

const apiStatus = useApiStatusStore();
onMounted(() => apiStatus.check());
</script>

<template>
  <div class="home">
    <h1 class="home__title">CUBE CENTER</h1>
    <p class="home__subtitle">
      Descubre formas de solucionar el cubo Rubik y registra tus tiempos.
    </p>

    <section class="card" aria-labelledby="status-title">
      <h2 id="status-title">Estado del sistema</h2>
      <p>
        Cliente Vue 3 <StatusBadge status="online" />
      </p>
      <p>
        API (Express) <StatusBadge :status="apiStatus.status" />
      </p>
      <p v-if="apiStatus.status === 'online'" class="muted">
        Servidor activo hace {{ apiStatus.uptime }} s.
      </p>
      <p v-if="apiStatus.error" class="error">{{ apiStatus.error }}</p>
      <button type="button" class="btn" @click="apiStatus.check()">Verificar de nuevo</button>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 1.25rem;
  text-align: center;
}
.home__title {
  font-size: clamp(2rem, 6vw, 3.5rem);
  color: var(--color-accent);
  letter-spacing: 0.1em;
}
.home__subtitle {
  margin: 1rem 0 2rem;
  color: var(--color-text-muted);
}
.card {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--color-surface);
  border-radius: var(--radius);
}
.muted {
  color: var(--color-text-muted);
}
.error {
  color: var(--color-danger);
}
.btn {
  justify-self: center;
  padding: 0.7rem 1.5rem;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-strong));
  color: #111;
  font-weight: 700;
  cursor: pointer;
}
</style>
