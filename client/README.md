# CubeCenter — Cliente (Vue 3)

Vue 3 + Vite + Vue Router + Pinia + Axios. Fase 2.1 completada: base del proyecto, proxy a la API y página de inicio.

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

## Comandos

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
npm run lint
```

