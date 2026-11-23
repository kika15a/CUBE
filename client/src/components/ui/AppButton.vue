<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  /** Si se indica, el botón es un enlace interno (RouterLink) */
  to: { type: [String, Object], default: null },
  type: { type: String, default: 'button', validator: (v) => ['button', 'submit'].includes(v) },
  /** Muestra estado de carga y bloquea el botón */
  loading: { type: Boolean, default: false },
  /** Ocupa todo el ancho disponible */
  block: { type: Boolean, default: false },
});

const tag = computed(() => (props.to ? RouterLink : 'button'));
const bindings = computed(() =>
  props.to ? { to: props.to } : { type: props.type, disabled: props.loading },
);
</script>

<template>
  <component
    :is="tag"
    v-bind="bindings"
    class="btn"
    :class="{ 'btn--block': block, 'btn--loading': loading }"
    :aria-busy="loading || undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: 0;
  border-radius: 50px;
  background: linear-gradient(45deg, var(--color-accent-strong), var(--color-accent));
  box-shadow: 0 5px 15px rgba(255, 140, 0, 0.3);
  color: #000;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 140, 0, 0.5);
}
.btn--block {
  display: flex;
  width: 100%;
}
.btn:disabled,
.btn--loading {
  opacity: 0.7;
  cursor: progress;
}
</style>
