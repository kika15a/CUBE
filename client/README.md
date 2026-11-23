# CubeCenter — Cliente (Vue 3)

Frontend de la aplicación **CubeCenter**, construido con **Vue 3**, **Vite**, **Vue Router**, **Pinia** y **Axios**.

**Progreso actual:** Fases 2.1 (base + proxy), 2.2 (*layout*), 2.3 (login/registro con apodo) y 2.4 (cronómetro con persistencia por usuario + tutoriales) completadas.

---

## Estructura de carpetas

| Carpeta | Propósito |
| :--- | :--- |
| `src/api/` | Instancia de Axios (`http.js`) y funciones de consumo de la API |
| `src/assets/` | Estilos globales y *tokens* de diseño |
| `src/components/layout/` | *Navbar*, *footer* y estructura general de vistas |
| `src/components/ui/` | Componentes reutilizables: botones, *inputs*, *cards*, cubo 3D, etc. |
| `src/composables/` | Lógica reactiva reutilizable: `useForm`, `useTimer`, `useMobileMenu` |
| `src/features/` | Módulos por dominio: `auth/`, `timer/`, `tutorials/`, `home/` |
| `src/router/` | Definición de rutas y guardias de navegación |
| `src/stores/` | Estado global con Pinia (`auth`, `times`, `apiStatus`) |
| `src/views/` | Vistas de página que ensamblan componentes de `features/` |
| `public/` | Archivos estáticos copiados sin transformación al *build* |

---

## Comandos

```bash
npm install
npm run dev      # Servidor de desarrollo en http://localhost:5173
npm run build    # Genera la versión de producción en dist/
npm run lint     # Revisa reglas de código / estilo
```

---

## Notas técnicas

* El proxy de Vite (`vite.config.js`) redirige `/api/*` hacia `http://localhost:3000`, evitando problemas de CORS en desarrollo y permitiendo el envío de cookies de sesión.
* Los componentes que se reutilizan en más de una *feature* se promueven a `src/components/ui/`.
* La carpeta `legacy/` conserva el sitio anterior en HTML/CSS/JS y se eliminará al concluir la Fase 2.5.