import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'), // carga diferida (code splitting)
    meta: { title: 'Inicio' },
  },
  // Marcadores de posición hasta migrar cada página (fases 2.3 y 2.4)
  ...[
    { path: '/tiempos', name: 'tiempos', title: 'Tiempos' },
    { path: '/tutoriales', name: 'tutoriales', title: 'Tutoriales' },
    { path: '/login', name: 'login', title: 'Inicia sesión' },
    { path: '/registro', name: 'registro', title: 'Regístrate' },
  ].map(({ path, name, title }) => ({
    path,
    name,
    component: () => import('@/views/ComingSoonView.vue'),
    props: { title },
    meta: { title },
  })),
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

router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Cube Center'} · Cube Center`;
});

export default router;
