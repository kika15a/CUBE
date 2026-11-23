<script setup>
defineProps({
  /** Estado a mostrar */
  status: {
    type: String,
    required: true,
    validator: (v) => ['idle', 'loading', 'online', 'offline'].includes(v),
  },
});

const LABELS = {
  idle: 'Sin verificar',
  loading: 'Verificando…',
  online: 'Conectado',
  offline: 'Sin conexión',
};
</script>

<template>
  <span class="badge" :class="`badge--${status}`" role="status">
    <span class="badge__dot" aria-hidden="true" />
    {{ LABELS[status] }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.45);
  font-size: 0.9rem;
}
.badge__dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  background: var(--color-text-muted);
}
.badge--online .badge__dot {
  background: var(--color-success);
}
.badge--offline .badge__dot {
  background: var(--color-danger);
}
.badge--loading .badge__dot {
  background: var(--color-accent);
}
</style>
