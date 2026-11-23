<script setup>
import { computed } from 'vue';
import { CUBE_COLORS } from '@/config/cubeColors';
import { FACE_NAMES } from '@/config/cubeFaces';

const props = defineProps({
  /** Piezas por lado: 2 (2x2), 3 (3x3) o 4 (4x4) */
  grid: { type: Number, default: 3, validator: (v) => [2, 3, 4].includes(v) },
  /** Tamaño del cubo en px */
  dimension: { type: Number, default: 180 },
  /**
   * Color de cada cara. Cada valor es un nombre de color (toda la cara)
   * o un arreglo con un color por pegatina (grid × grid).
   */
  faces: {
    type: Object,
    required: true,
    validator: (v) => FACE_NAMES.every((face) => face in v),
  },
  /** Texto para lectores de pantalla */
  label: { type: String, default: 'Cubo Rubik' },
});

const stickersOf = (face) => {
  const value = props.faces[face];
  return Array.isArray(value) ? value : Array(props.grid ** 2).fill(value);
};

const colorOf = (name) => CUBE_COLORS[name] ?? name;

const cubeStyle = computed(() => ({
  '--cube-size': `${props.dimension}px`,
  '--grid': props.grid,
}));
</script>

<template>
  <div class="cube" :style="cubeStyle" role="img" :aria-label="label">
    <div v-for="face in FACE_NAMES" :key="face" class="cube__face" :class="`cube__face--${face}`">
      <span
        v-for="(color, index) in stickersOf(face)"
        :key="index"
        class="cube__sticker"
        :style="{ backgroundColor: colorOf(color) }"
      />
    </div>
  </div>
</template>

<style scoped>
.cube {
  position: relative;
  width: var(--cube-size);
  height: var(--cube-size);
  margin: 0 auto;
  transform-style: preserve-3d;
  transform: rotateX(-25deg) rotateY(-25deg);
  transition: transform 1s ease;
}
.cube:hover {
  transform: rotateX(-25deg) rotateY(335deg);
}

.cube__face {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(var(--grid), 1fr);
  grid-template-rows: repeat(var(--grid), 1fr);
  gap: 4px;
  padding: 4px;
  border: 2px solid #222;
  background: rgba(255, 255, 255, 0.05);
}
.cube__sticker {
  border-radius: 3px;
}

.cube__face--front {
  transform: translateZ(calc(var(--cube-size) / 2));
}
.cube__face--back {
  transform: rotateY(180deg) translateZ(calc(var(--cube-size) / 2));
}
.cube__face--top {
  transform: rotateX(90deg) translateZ(calc(var(--cube-size) / 2));
}
.cube__face--bottom {
  transform: rotateX(-90deg) translateZ(calc(var(--cube-size) / 2));
}
.cube__face--left {
  transform: rotateY(-90deg) translateZ(calc(var(--cube-size) / 2));
}
.cube__face--right {
  transform: rotateY(90deg) translateZ(calc(var(--cube-size) / 2));
}

@media (prefers-reduced-motion: reduce) {
  .cube {
    transition: none;
  }
}
</style>
