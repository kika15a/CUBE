<script setup>
import AppButton from '@/components/ui/AppButton.vue';
import GlassCard from '@/components/ui/GlassCard.vue';
import RubikCube from '@/components/ui/RubikCube.vue';

defineProps({
  /** { id, grid, title, description, faces } — ver homeContent.js */
  cube: { type: Object, required: true },
});
</script>

<template>
  <GlassCard
    as="article"
    class="cube-card"
  >
    <RubikCube
      :grid="cube.grid"
      :faces="cube.faces"
      :label="`Cubo Rubik ${cube.title}`"
    />
    <h3 class="cube-card__title">
      {{ cube.title }}
    </h3>
    <p class="cube-card__description">
      {{ cube.description }}
    </p>
    <AppButton :to="{ name: 'tutoriales' }">
      Descubre más
    </AppButton>
  </GlassCard>
</template>

<style scoped>
.cube-card {
  width: 280px;
  padding: 2rem 1.5rem;
  text-align: center;
}
.cube-card :deep(.cube) {
  margin-bottom: 1.5rem;
}
.cube-card__title {
  margin: 1rem 0;
  font-size: 2rem;
  color: var(--color-accent);
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}
.cube-card__description {
  min-height: 80px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #ccc;
}
@media (max-width: 900px) {
  .cube-card {
    width: 100%;
    max-width: 400px;
  }
}
</style>
