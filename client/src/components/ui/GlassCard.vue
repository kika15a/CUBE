<script setup>
defineProps({
  /** Etiqueta HTML a renderizar (div, section, article...) */
  as: { type: String, default: 'div' },
  /** Se eleva al pasar el cursor */
  lift: { type: Boolean, default: true },
});
</script>

<template>
  <component :is="as" class="glass" :class="{ 'glass--lift': lift }">
    <slot />
  </component>
</template>

<style scoped>
.glass {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease,
    background 0.4s ease;
}
.glass::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
  transform: rotate(30deg);
  z-index: -1;
  pointer-events: none;
}
.glass--lift:hover {
  transform: translateY(-12px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  background: rgba(255, 255, 255, 0.15);
}
@media (prefers-reduced-motion: reduce) {
  .glass {
    transition: none;
  }
  .glass--lift:hover {
    transform: none;
  }
}
</style>
