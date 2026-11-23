# CubeCenter — Cliente (Vue 3)

Vue 3 + Vite + Vue Router + Pinia + Axios. Fases completadas: 2.1 (base, proxy a la API) y 2.2 (layout: navbar, footer y fondo de cubos flotantes).

| Carpeta | Propósito |
|---|---|
| `src/api/` | Cliente HTTP (Axios) y funciones que llaman a la API |
| `src/assets/` | Imágenes, fuentes y estilos globales |
| `src/components/layout/` | Estructura de página: `AppLayout`, `AppNavbar`, `AppFooter` |
| `src/components/ui/` | Piezas visuales reutilizables: `FloatingCubes`, `StatusBadge` |
| `src/config/` | Datos de configuración: enlaces del menú y redes sociales |
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

