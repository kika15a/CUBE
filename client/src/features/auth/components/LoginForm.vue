<script setup>
import { useRoute, useRouter } from 'vue-router';
import { faEnvelope, faLock, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import AppButton from '@/components/ui/AppButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import { useForm } from '@/composables/useForm';
import { useAuthStore } from '@/stores/auth';
import { safeRedirect } from '../redirect';
import { validateLogin } from '../validation';
import FormAlert from './FormAlert.vue';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const { values, errors, formError, isSubmitting, submit } = useForm({
  initialValues: { email: '', password: '' },
  validate: validateLogin,
  onSubmit: async ({ email, password }) => {
    await auth.login({ email: email.trim(), password });
    await router.push(safeRedirect(route.query.redirect));
  },
});
</script>

<template>
  <form
    class="form"
    novalidate
    @submit.prevent="submit"
  >
    <FormAlert :message="formError" />

    <BaseInput
      v-model="values.email"
      label="Correo electrónico"
      type="email"
      :icon="faEnvelope"
      :error="errors.email"
      autocomplete="email"
      placeholder="usuario@ejemplo.com"
    />
    <BaseInput
      v-model="values.password"
      label="Contraseña"
      type="password"
      :icon="faLock"
      :error="errors.password"
      autocomplete="current-password"
      placeholder="••••••••"
    />

    <AppButton
      type="submit"
      block
      :loading="isSubmitting"
    >
      <FontAwesomeIcon :icon="faRightToBracket" />
      {{ isSubmitting ? 'Ingresando…' : 'Iniciar sesión' }}
    </AppButton>

    <p class="form__footer">
      ¿No tienes una cuenta?
      <RouterLink :to="{ name: 'registro' }">
        Regístrate aquí
      </RouterLink>
    </p>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.form__footer {
  color: var(--color-text-muted);
}
</style>
