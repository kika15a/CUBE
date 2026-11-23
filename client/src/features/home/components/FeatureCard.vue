<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineProps({
  icon: { type: Object, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});
</script>

<template>
  <article class="feature">
    <FontAwesomeIcon
      :icon="icon"
      class="feature__icon"
    />
    <h3 class="feature__title">
      {{ title }}
    </h3>
    <p class="feature__text">
      {{ description }}
    </p>
  </article>
</template>

<style scoped>
.feature {
  padding: 2rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  text-align: center;
  transition:
    transform 0.3s ease,
    background 0.3s ease;
}
.feature:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.1);
}
.feature__icon {
  margin-bottom: 1.5rem;
  font-size: 3rem;
  color: var(--color-accent);
}
.feature__title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}
.feature__text {
  line-height: 1.6;
  color: #ccc;
}
@media (prefers-reduced-motion: reduce) {
  .feature {
    transition: none;
  }
  .feature:hover {
    transform: none;
  }
}
</style>
