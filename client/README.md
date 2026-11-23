# CubeCenter — Cliente (Vue 3)

Esqueleto de carpetas listo. El código se agrega en la **Fase 2**.

| Carpeta | Propósito |
|---|---|
| `src/api/` | Cliente HTTP (Axios) y funciones que llaman a la API |
| `src/assets/` | Imágenes, fuentes y estilos globales |
| `src/components/` | Componentes reutilizables y "tontos" (botón, tarjeta, navbar) |
| `src/composables/` | Lógica reutilizable con la Composition API (`useTimer`, `useAuth`) |
| `src/features/` | Módulos por dominio: `auth/`, `timer/`, `tutorials/` |
| `src/router/` | Rutas (Vue Router) y guardias de navegación |
| `src/stores/` | Estado global (Pinia) |
| `src/views/` | Una vista por página, delgadas: ensamblan componentes y features |
| `public/` | Archivos estáticos que se copian tal cual |

Se completará con: `index.html`, `package.json`, `vite.config.js`, `src/main.js` y `src/App.vue`.
