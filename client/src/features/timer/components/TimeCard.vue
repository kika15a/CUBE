<script setup>
import { formatTime } from '../format';

defineProps({
  time: { type: Object, required: true }, // { id, ms, scramble, createdAt }
});

const emit = defineEmits(['delete']);

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<template>
  <article class="time-card">
    <div class="time-card__main">
      <span class="time-card__ms">{{ formatTime(time.ms) }}</span>
      <span class="time-card__date">{{ formatDate(time.createdAt) }}</span>
    </div>
    <p
      v-if="time.scramble"
      class="time-card__scramble"
    >
      {{ time.scramble }}
    </p>
    <button
      type="button"
      class="time-card__delete"
      aria-label="Eliminar tiempo"
      @click="emit('delete', time.id)"
    >
      ×
    </button>
  </article>
</template>

<style scoped>
.time-card {
  position: relative;
  padding: 1rem 3rem 1rem 1rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.time-card__main {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}
.time-card__ms {
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-accent);
}
.time-card__date {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
.time-card__scramble {
  margin-top: 0.4rem;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
.time-card__delete {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 1.4rem;
  cursor: pointer;
}
.time-card__delete:hover {
  background: rgba(255, 65, 54, 0.2);
  color: var(--color-danger);
}
</style>
