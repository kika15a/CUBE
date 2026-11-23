<script setup>
import { onMounted } from 'vue';
import GlassCard from '@/components/ui/GlassCard.vue';
import AppButton from '@/components/ui/AppButton.vue';
import StatusBadge from '@/components/ui/StatusBadge.vue';
import { useApiStatusStore } from '@/stores/apiStatus';

// Vista de diagnóstico: solo existe en desarrollo (ver router/index.js)
const apiStatus = useApiStatusStore();
onMounted(() => apiStatus.check());
</script>

<template>
  <section class="status">
    <h1>Estado del sistema</h1>
    <GlassCard :lift="false" class="status__card">
      <p>Cliente Vue 3 <StatusBadge status="online" /></p>
      <p>API (Express) <StatusBadge :status="apiStatus.status" /></p>
      <p v-if="apiStatus.status === 'online'">Servidor activo hace {{ apiStatus.uptime }} s.</p>
      <p v-if="apiStatus.error">{{ apiStatus.error }}</p>
      <AppButton :loading="apiStatus.status === 'loading'" @click="apiStatus.check()">
        Verificar de nuevo
      </AppButton>
    </GlassCard>
  </section>
</template>

<style scoped>
.status {
  max-width: 520px;
  margin: 0 auto;
  padding: 3rem 1.25rem;
  text-align: center;
}
h1 {
  margin-bottom: 1.5rem;
  color: var(--color-accent);
}
.status__card {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
}
</style>
