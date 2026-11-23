<script setup>
import { onMounted, ref } from 'vue';
import GlassCard from '@/components/ui/GlassCard.vue';
import AppButton from '@/components/ui/AppButton.vue';
import FormAlert from '@/features/auth/components/FormAlert.vue';
import ScrambleDisplay from '@/features/timer/components/ScrambleDisplay.vue';
import TimerControls from '@/features/timer/components/TimerControls.vue';
import TimerDisplay from '@/features/timer/components/TimerDisplay.vue';
import TimeCard from '@/features/timer/components/TimeCard.vue';
import { generateScramble } from '@/features/timer/scramble';
import { useTimer } from '@/composables/useTimer';
import { useTimesStore } from '@/stores/times';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const times = useTimesStore();

const { elapsed, isRunning, isArmed, stop, reset, arm, disarm } = useTimer();
const scramble = ref(generateScramble());
const saveError = ref('');

async function handleStop() {
  const ms = stop();
  if (ms === null || !auth.isAuthenticated) {
    scramble.value = generateScramble();
    return;
  }
  saveError.value = '';
  try {
    await times.save({ ms, scramble: scramble.value });
    scramble.value = generateScramble();
  } catch (err) {
    saveError.value = err?.message ?? 'No se pudo guardar el tiempo';
  }
}

function handleReset() {
  reset();
  scramble.value = generateScramble();
}

async function handleDelete(id) {
  try {
    await times.remove(id);
  } catch (err) {
    saveError.value = err?.message ?? 'No se pudo borrar';
  }
}

onMounted(() => {
  if (auth.isAuthenticated) times.load();
});
</script>

<template>
  <section class="timer-view">
    <header class="timer-view__header">
      <h1>Cronómetro</h1>
      <p
        v-if="!auth.isAuthenticated"
        class="timer-view__guest"
      >
        <RouterLink :to="{ name: 'login' }">
          Inicia sesión
        </RouterLink> para guardar tus tiempos.
      </p>
    </header>

    <ScrambleDisplay :scramble="scramble" />

    <GlassCard
      class="timer-view__panel"
      :lift="false"
    >
      <TimerDisplay
        :ms="elapsed"
        :running="isRunning"
        :armed="isArmed"
      />
      <TimerControls
        :running="isRunning"
        :armed="isArmed"
        @stop="handleStop"
        @reset="handleReset"
        @arm="arm"
        @disarm="disarm"
      />
      <p class="timer-view__hint">
        Mantén <kbd>espacio</kbd> (o pulsa el botón) para armar, suelta para empezar. Cualquier tecla para.
      </p>
    </GlassCard>

    <FormAlert :message="saveError" />

    <section
      v-if="auth.isAuthenticated"
      class="timer-view__list"
      aria-labelledby="times-title"
    >
      <h2 id="times-title">
        Tus tiempos
      </h2>
      <p v-if="times.loading">
        Cargando…
      </p>
      <p
        v-else-if="times.items.length === 0"
        class="timer-view__empty"
      >
        Aún no tienes tiempos. ¡Arma el cubo y empieza!
      </p>
      <div
        v-else
        class="timer-view__grid"
      >
        <TimeCard
          v-for="t in times.items"
          :key="t.id"
          :time="t"
          @delete="handleDelete"
        />
      </div>
    </section>

    <AppButton
      v-if="!auth.isAuthenticated"
      :to="{ name: 'login' }"
      block
    >
      Inicia sesión para guardar tus tiempos
    </AppButton>
  </section>
</template>

<style scoped>
.timer-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 5% 4rem;
  display: grid;
  gap: 2rem;
}
.timer-view__header {
  text-align: center;
}
.timer-view__header h1 {
  font-size: 2.5rem;
  color: var(--color-accent);
}
.timer-view__guest {
  margin-top: 0.5rem;
  color: var(--color-text-muted);
}
.timer-view__panel {
  padding: 2rem;
  text-align: center;
}
.timer-view__hint {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
kbd {
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.15);
  font-family: inherit;
}
.timer-view__list h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--color-accent);
}
.timer-view__empty {
  color: var(--color-text-muted);
  text-align: center;
}
.timer-view__grid {
  display: grid;
  gap: 0.75rem;
}
</style>
