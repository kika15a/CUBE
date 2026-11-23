<script setup>
import CubeCard from '@/features/home/components/CubeCard.vue';
import FeatureCard from '@/features/home/components/FeatureCard.vue';
import { CUBES, FEATURES } from '@/features/home/homeContent';
</script>

<template>
  <div class="home">
    <header class="hero">
      <h1 class="hero__title">CUBE CENTER</h1>
      <p class="hero__text">
        Descubre formas de solucionar el cubo Rubik, atrévete a armar los distintos cubos y
        registra tus tiempos.
      </p>
    </header>

    <section class="cubes" aria-label="Tipos de cubo">
      <CubeCard v-for="cube in CUBES" :key="cube.id" :cube="cube" />
    </section>

    <section class="features" aria-labelledby="features-title">
      <h2 id="features-title" class="features__title">¿Por qué elegir Cube Center?</h2>
      <div class="features__grid">
        <FeatureCard
          v-for="feature in FEATURES"
          :key="feature.id"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: 4rem 5% 2rem;
  text-align: center;
}
.hero__title {
  margin-bottom: 1rem;
  font-size: clamp(2.5rem, 7vw, 3.5rem);
  background: linear-gradient(to right, var(--color-accent), var(--color-accent-strong));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}
.hero__text {
  max-width: 700px;
  margin: 0 auto 2rem;
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.cubes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  padding: 2rem 5%;
}
@media (max-width: 900px) {
  .cubes {
    flex-direction: column;
    align-items: center;
  }
}

.features {
  max-width: 1200px;
  margin: 3rem auto;
  padding: 4rem 5%;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.3);
}
.features__title {
  margin-bottom: 3rem;
  text-align: center;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: var(--color-accent);
}
.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}
</style>
