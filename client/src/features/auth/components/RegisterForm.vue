<script setup>
import { useRouter } from 'vue-router';
import { faEnvelope, faLock, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import AppButton from '@/components/ui/AppButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import { useForm } from '@/composables/useForm';
import { useAuthStore } from '@/stores/auth';
import { validateRegister } from '../validation';
import FormAlert from './FormAlert.vue';

const auth = useAuthStore();
const router = useRouter();

const { values, errors, formError, isSubmitting, submit } = useForm({
  initialValues: { nombre: '', email: '', password: '', confirmPassword: '', terms: false },
  validate: validateRegister,
  onSubmit: async ({ nombre, email, password }) => {
    // Solo se envía lo que la API acepta (confirmPassword y terms son del cliente)
    await auth.register({ nombre: nombre.trim(), email: email.trim(), password });
    await router.push({ name: 'home' });
  },
});
</script>

<template>
  <form class="form" novalidate @submit.prevent="submit">
    <FormAlert :message="formError" />

    <BaseInput
      v-model="values.nombre"
      label="Nombre completo"
      :icon="faUser"
      :error="errors.nombre"
      autocomplete="name"
      placeholder="Tu nombre"
    />
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
      autocomplete="new-password"
      placeholder="Mínimo 8 caracteres, con letras y números"
    />
    <BaseInput
      v-model="values.confirmPassword"
      label="Confirmar contraseña"
      type="password"
      :icon="faLock"
      :error="errors.confirmPassword"
      autocomplete="new-password"
      placeholder="Repite tu contraseña"
    />

    <div class="terms">
      <label class="terms__label">
        <input
          v-model="values.terms"
          type="checkbox"
          :aria-invalid="errors.terms ? 'true' : undefined"
        />
        Acepto los términos y condiciones y la política de privacidad
      </label>
      <p v-if="errors.terms" class="terms__error" role="alert">{{ errors.terms }}</p>
    </div>

    <AppButton type="submit" block :loading="isSubmitting">
      <FontAwesomeIcon :icon="faUserPlus" />
      {{ isSubmitting ? 'Creando cuenta…' : 'Registrarse' }}
    </AppButton>

    <p class="form__footer">
      ¿Ya tienes una cuenta?
      <RouterLink :to="{ name: 'login' }">Inicia sesión</RouterLink>
    </p>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.terms {
  text-align: left;
  font-size: 0.9rem;
}
.terms__label {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  cursor: pointer;
}
.terms__label input {
  margin-top: 0.2rem;
  accent-color: var(--color-accent);
}
.terms__error {
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: #ff8a82;
}
.form__footer {
  color: var(--color-text-muted);
}
</style>
