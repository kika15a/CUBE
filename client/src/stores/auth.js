import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { fetchCurrentUser, loginUser, logoutUser, registerUser } from '@/api/auth';

/**
 * Estado de autenticación.
 * La sesión real vive en una cookie httpOnly que el navegador no puede leer
 * (a propósito, por seguridad). Aquí solo guardamos los datos PÚBLICOS del usuario;
 * la fuente de la verdad es siempre el servidor.
 */
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const initialized = ref(false);
  const isAuthenticated = computed(() => user.value !== null);

  let initPromise = null;

  /** Consulta una sola vez si ya hay una sesión activa (al abrir la app). */
  function init() {
    initPromise ??= fetchCurrentUser()
      .then((data) => {
        user.value = data.usuario ?? null;
      })
      .catch(() => {
        user.value = null; // API caída: la app sigue funcionando como invitado
      })
      .finally(() => {
        initialized.value = true;
      });
    return initPromise;
  }

  async function login(credentials) {
    const data = await loginUser(credentials);
    user.value = data.usuario;
  }

  /** Registra y, si sale bien, inicia sesión automáticamente. */
  async function register({ nombre, email, password }) {
    await registerUser({ nombre, email, password });
    await login({ email, password });
  }

  async function logout() {
    try {
      await logoutUser();
    } finally {
      user.value = null;
    }
  }

  return { user, initialized, isAuthenticated, init, login, register, logout };
});
