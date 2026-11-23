<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

defineProps({
  message: { type: String, default: '' },
});
</script>

<template>
  <p v-if="message" class="alert" role="alert">
    <FontAwesomeIcon :icon="faCircleExclamation" />
    {{ message }}
  </p>
</template>

<style scoped>
.alert {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  border-left: 4px solid var(--color-danger);
  border-radius: 8px;
  background: rgba(255, 65, 54, 0.15);
  text-align: left;
  font-size: 0.95rem;
}
</style>
