<script setup>
import { computed } from 'vue';

const FACES = ['R', 'L', 'U', 'D', 'F', 'B'];
const MODS = ['', "'", '2'];
const AXIS = { R: 'x', L: 'x', U: 'y', D: 'y', F: 'z', B: 'z' };

const props = defineProps({
  /** Longitud del scramble (movimientos). */
  length: { type: Number, default: 20 },
});

const scramble = computed(() => {
  const out = [];
  let lastAxis = '';
  while (out.length < props.length) {
    const face = FACES[Math.floor(Math.random() * FACES.length)];
    if (AXIS[face] === lastAxis) continue; // evita R L seguidos
    lastAxis = AXIS[face];
    out.push(face + MODS[Math.floor(Math.random() * MODS.length)]);
  }
  return out.join(' ');
});
</script>

<template>
  <p
    class="scramble"
    aria-label="Secuencia de mezcla"
  >
    {{ scramble }}
  </p>
</template>

<style scoped>
.scramble {
  padding: 1rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  text-align: center;
}
</style>
