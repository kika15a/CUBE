<script setup>
import { computed } from 'vue';
import { formatTime } from '../format';

const props = defineProps({
  ms: { type: Number, required: true },
  running: { type: Boolean, default: false },
  armed: { type: Boolean, default: false },
});

const formatted = computed(() => formatTime(props.ms));
</script>

<template>
  <div
    class="timer-display"
    :class="{ 'timer-display--armed': armed, 'timer-display--running': running }"
    role="timer"
    :aria-live="running ? 'off' : 'polite'"
  >
    {{ formatted }}
  </div>
</template>

<style scoped>
.timer-display {
  font-family: 'Courier New', monospace;
  font-size: clamp(3rem, 12vw, 8rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--color-accent);
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
  transition: color 0.2s ease;
  user-select: none;
}
.timer-display--armed {
  color: #2ecc40;
  text-shadow: 0 0 20px rgba(46, 204, 64, 0.6);
}
.timer-display--running {
  color: #fff;
}
@media (prefers-reduced-motion: reduce) {
  .timer-display {
    transition: none;
  }
}
</style>
