<script setup>
import { computed, ref, useId } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

defineOptions({ inheritAttrs: false });

const props = defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  /** Ícono opcional junto a la etiqueta */
  icon: { type: Object, default: null },
  /** Mensaje de error (si existe, el campo se marca como inválido) */
  error: { type: String, default: '' },
});

const model = defineModel({ type: String, default: '' });

const id = useId();
const errorId = `${id}-error`;
const showPassword = ref(false);
const isPassword = computed(() => props.type === 'password');
const inputType = computed(() => (isPassword.value && showPassword.value ? 'text' : props.type));
</script>

<template>
  <div class="field">
    <label
      :for="id"
      class="field__label"
    >
      <FontAwesomeIcon
        v-if="icon"
        :icon="icon"
        fixed-width
      />
      {{ label }}
    </label>

    <div class="field__control">
      <input
        :id="id"
        v-model="model"
        v-bind="$attrs"
        :type="inputType"
        class="field__input"
        :class="{ 'field__input--error': error }"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="error ? errorId : undefined"
      >
      <button
        v-if="isPassword"
        type="button"
        class="field__toggle"
        :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
        :aria-pressed="showPassword"
        @click="showPassword = !showPassword"
      >
        <FontAwesomeIcon :icon="showPassword ? faEyeSlash : faEye" />
      </button>
    </div>

    <p
      v-if="error"
      :id="errorId"
      class="field__error"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}
.field__label {
  font-weight: 500;
  color: var(--color-accent);
}
.field__control {
  position: relative;
}
.field__input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.35);
  color: var(--color-text);
  font-size: 1rem;
}
.field__input::placeholder {
  color: rgba(255, 255, 255, 0.45);
}
.field__input:focus {
  border-color: var(--color-accent);
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.25);
}
.field__input--error {
  border-color: var(--color-danger);
}
.field__toggle {
  position: absolute;
  top: 50%;
  right: 0.6rem;
  transform: translateY(-50%);
  padding: 0.4rem;
  border: 0;
  background: none;
  color: var(--color-text-muted);
  cursor: pointer;
}
.field__control:has(.field__toggle) .field__input {
  padding-right: 2.8rem;
}
.field__error {
  font-size: 0.85rem;
  color: #ff8a82;
}
</style>
