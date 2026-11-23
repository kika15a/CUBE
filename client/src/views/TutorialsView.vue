<script setup>
import GlassCard from '@/components/ui/GlassCard.vue';
import { TUTORIALS } from '@/features/tutorials/tutorials';
</script>

<template>
  <section class="tutorials">
    <header class="tutorials__header">
      <h1>Tutoriales</h1>
      <p>Guías paso a paso para resolver y mejorar con el cubo Rubik.</p>
    </header>

    <div class="tutorials__list">
      <GlassCard
        v-for="tutorial in TUTORIALS"
        :key="tutorial.id"
        as="article"
        :lift="false"
        class="tutorial"
      >
        <h2 class="tutorial__title">
          {{ tutorial.title }}
        </h2>
        <p class="tutorial__summary">
          {{ tutorial.summary }}
        </p>
        <details class="tutorial__details">
          <summary>Ver contenido</summary>
          <div
            v-for="section in tutorial.sections"
            :key="section.title"
            class="tutorial__section"
          >
            <h3>{{ section.title }}</h3>
            <p>{{ section.body }}</p>
          </div>
        </details>
      </GlassCard>
    </div>
  </section>
</template>

<style scoped>
.tutorials {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 5% 4rem;
}
.tutorials__header {
  margin-bottom: 2rem;
  text-align: center;
}
.tutorials__header h1 {
  font-size: 2.5rem;
  color: var(--color-accent);
}
.tutorials__header p {
  color: var(--color-text-muted);
}
.tutorials__list {
  display: grid;
  gap: 1.5rem;
}
.tutorial {
  padding: 1.5rem;
}
.tutorial__title {
  margin-bottom: 0.5rem;
  color: var(--color-accent);
}
.tutorial__summary {
  margin-bottom: 1rem;
  color: var(--color-text-muted);
}
.tutorial__details summary {
  cursor: pointer;
  color: var(--color-accent);
}
.tutorial__section {
  margin-top: 1rem;
}
.tutorial__section h3 {
  margin-bottom: 0.3rem;
  font-size: 1.05rem;
}
.tutorial__section p {
  line-height: 1.6;
  color: var(--color-text-muted);
}
</style>
