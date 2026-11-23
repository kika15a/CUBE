<script setup>
import { computed } from 'vue';

const props = defineProps({
  /** Cantidad de cubos flotantes */
  count: {
    type: Number,
    default: 30,
    validator: (v) => Number.isInteger(v) && v >= 0 && v <= 100,
  },
  /** Paleta de colores del cubo Rubik */
  colors: {
    type: Array,
    default: () => ['#ff4136', '#0074d9', '#2ecc40', '#ffdc00', '#ff851b', '#ffffff'],
  },
});

const random = (min, max) => Math.random() * (max - min) + min;

/** Se genera una sola vez (y solo se recalcula si cambian las props). */
const cubes = computed(() =>
  Array.from({ length: props.count }, (_, id) => {
    const size = random(10, 40);
    return {
      id,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        left: `${random(0, 100)}%`,
        top: `${random(0, 100)}%`,
        backgroundColor: props.colors[Math.floor(Math.random() * props.colors.length)],
        animationDelay: `${random(0, 15)}s`,
      },
    };
  }),
);
</script>

<template>
  <!-- Decorativo: oculto para lectores de pantalla y sin interceptar clics -->
  <div class="floating-cubes" aria-hidden="true">
    <span v-for="cube in cubes" :key="cube.id" class="floating-cubes__cube" :style="cube.style" />
  </div>
</template>

<style scoped>
.floating-cubes {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.floating-cubes__cube {
  position: absolute;
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 3px;
  animation: float 15s infinite linear;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10%,
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

/* Accesibilidad: respeta a quienes desactivan las animaciones en su sistema */
@media (prefers-reduced-motion: reduce) {
  .floating-cubes {
    display: none;
  }
}
</style>
