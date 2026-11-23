<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import AppButton from '@/components/ui/AppButton.vue';

const props = defineProps({
  running: { type: Boolean, default: false },
  armed: { type: Boolean, default: false },
});

const emit = defineEmits(['start', 'stop', 'reset', 'arm', 'disarm']);

function onKeydown(e) {
  if (e.code !== 'Space') return;
  // Si el foco está en un botón/input, no interceptamos.
  const tag = document.activeElement?.tagName;
  if (tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA') return;
  e.preventDefault();
  if (props.running) return; // correr → cualquier tecla (ver onKeyup)
  emit('arm');
}

function onKeyup(e) {
  if (e.code === 'Space') {
    if (props.armed) emit('disarm');
    return;
  }
  if (props.running) emit('stop');
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
  window.addEventListener('keyup', onKeyup);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  window.removeEventListener('keyup', onKeyup);
});
</script>

<template>
  <div class="timer-controls">
    <AppButton
      v-if="!running"
      :loading="false"
      @click="armed ? $emit('disarm') : $emit('arm')"
    >
      {{ armed ? 'Suelta para empezar' : 'Mantén espacio' }}
    </AppButton>
    <AppButton
      v-else
      @click="$emit('stop')"
    >
      Detener
    </AppButton>
    <button
      type="button"
      class="reset"
      :disabled="running"
      @click="$emit('reset')"
    >
      Reiniciar
    </button>
  </div>
</template>

<style scoped>
.timer-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}
.reset {
  padding: 0.8rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50px;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
}
.reset:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
