import { ref, onBeforeUnmount } from 'vue';

/**
 * Cronómetro basado en performance.now() con requestAnimationFrame.
 * - start()/stop(): control manual.
 * - arm()/disarm(): pensado para "mantener espacio = armar, soltar = empezar".
 * - elapsed: ms actuales (se actualiza cada frame mientras corre).
 */
export function useTimer() {
  const elapsed = ref(0);
  const isRunning = ref(false);
  const isArmed = ref(false);

  let rafId = null;
  let startTs = 0;

  function tick() {
    elapsed.value = performance.now() - startTs;
    if (isRunning.value) rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (isRunning.value) return;
    isArmed.value = false;
    startTs = performance.now();
    elapsed.value = 0;
    isRunning.value = true;
    rafId = requestAnimationFrame(tick);
  }

  function stop() {
    if (!isRunning.value) return null;
    isRunning.value = false;
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
    const finalMs = Math.round(elapsed.value);
    elapsed.value = finalMs;
    return finalMs;
  }

  function reset() {
    isRunning.value = false;
    isArmed.value = false;
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
    elapsed.value = 0;
  }

  /** Mantener tecla: arma (verde). Soltar: arranca. */
  function arm() {
    if (isRunning.value) return;
    reset();
    isArmed.value = true;
  }

  function disarm() {
    if (!isArmed.value) return;
    isArmed.value = false;
    start();
  }

  onBeforeUnmount(() => {
    if (rafId !== null) cancelAnimationFrame(rafId);
  });

  return { elapsed, isRunning, isArmed, start, stop, reset, arm, disarm };
}
