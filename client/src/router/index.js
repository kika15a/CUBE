import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

/**
 * meta.title        → título de la pestaña
 * meta.guestOnly    → solo para visitantes sin sesión (login, registro)
 * meta.requiresAuth → exige sesión; si no hay, redirige a login y regresa después
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Inicio' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Inicia sesión', guestOnly: true },
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('@/views/RegisterView.vue'),
    meta: { title: 'Crear cuenta', guestOnly: true },
  },
  {
    path: '/tiempos',
    name: 'tiempos',
    component: () => import('@/views/TimerView.vue'),
    meta: { title: 'Cronómetro' },
  },
  {
    path: '/tutoriales',
    name: 'tutoriales',
    component: () => import('@/views/TutorialsView.vue'),
    meta: { title: 'Tutoriales' },
  },
  // Diagnóstico: solo se registra en desarrollo
  ...(import.meta.env.DEV
    ? [
        {
          path: '/estado',
          name: 'estado',
          component: () => import('@/views/StatusView.vue'),
          meta: { title: 'Estado del sistema' },
        },
      ]
    : []),
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Página no encontrada' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});


router.beforeEach(async (to) => {
  const auth = useAuthStore();
  await auth.init();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'home' };
  }
});

router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Cube Center'} · Cube Center`;
});

export default router;
