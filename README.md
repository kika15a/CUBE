# CubeCenter

Sitio web para amantes de los cubos Rubik: tutoriales, cronómetro y cuentas de usuario.

> **Estado:** Fase 1 completada (arquitectura y seguridad del servidor). Ver [Roadmap](#roadmap).

## Estructura

```
cubecenter/                      # un solo repositorio
├── server/                      # BACKEND (API REST, Express)
│   ├── data/                    # datos locales (ignorados por Git)
│   ├── src/
│   │   ├── config/              # variables de entorno validadas
│   │   ├── routes/              # definición de rutas
│   │   ├── controllers/         # capa HTTP
│   │   ├── services/            # lógica de negocio
│   │   ├── repositories/        # acceso a datos
│   │   ├── models/              # entidades (POO)
│   │   ├── middlewares/         # seguridad, validación, errores
│   │   ├── validators/          # esquemas Zod
│   │   ├── errors/              # jerarquía de errores
│   │   ├── app.js               # configuración de Express
│   │   └── server.js            # punto de entrada
│   ├── tests/
│   ├── scripts/
│   ├── .env.example
│   └── package.json
├── client/                      # FRONTEND (Vue 3 SPA, Fase 2)
│   ├── legacy/                  # sitio actual; se elimina al terminar la migración
│   ├── src/
│   │   ├── api/                 # cliente Axios
│   │   ├── assets/
│   │   ├── components/          # layout/ (estructura) y ui/ (piezas reutilizables)
│   │   ├── config/              # datos de menú y redes
│   │   ├── composables/         # lógica reutilizable
│   │   ├── features/            # auth/, timer/, tutorials/
│   │   ├── router/
│   │   ├── stores/              # Pinia
│   │   └── views/               # una por página
│   └── public/
├── .vscode/
├── .gitignore
└── README.md
```

## Arranque rápido

Requiere Node.js >= 20.6. Se usan **dos terminales** (backend y frontend).

```bash
# Terminal 1 — Backend (API en http://localhost:3000)
cd server
npm install
npm run setup:env     # crea .env (solo la primera vez)
npm run dev

# Terminal 2 — Frontend (Vue en http://localhost:5173)
cd client
npm install
npm run dev
```

> En `server/.env` debe estar `CLIENT_ORIGIN=http://localhost:5173`.

Pruebas del backend: `cd server && npm test` (en una tercera terminal o con el servidor detenido).

## Cómo previsualizar

No necesitas ninguna API externa: todo corre en tu máquina.

- **Interfaz (Vue):** http://localhost:5173 con recarga en caliente (HMR): guardas y el navegador se actualiza solo.
- **API:** http://localhost:3000/api/health, o con la extensión *Thunder Client* de VS Code.
- **Sitio antiguo (legacy):** http://localhost:3000 mientras dure la migración.

## Seguridad (tríada CIA)

| Principio | Medidas implementadas |
|---|---|
| **Confidencialidad** | bcrypt (costo 12), hash privado en la entidad `User` y nunca serializado, cookie `httpOnly`/`secure`/`sameSite`, secretos solo en `.env`, mensajes de login idénticos + hash señuelo (anti-enumeración por tiempos), errores 500 genéricos, helmet + CSP |
| **Integridad** | Validación y saneamiento con Zod (`.strict()` contra mass assignment), regeneración de sesión al iniciar (anti session fixation), verificación de `Origin` (CSRF), escritura atómica y serializada del almacenamiento, IDs UUID |
| **Disponibilidad** | Rate limiting global y estricto en login/registro, límite de 10 KB al body, apagado ordenado, `/api/health`, sin caché en la API |

## Convenciones

- Commits: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`).
- Ramas: `main` estable; trabajo en `feat/...`, `fix/...`.
- Formato y lint: `npm run format` y `npm run lint`.

## Roadmap

1. ✅ **Fase 1** — Arquitectura por capas, POO, seguridad CIA del servidor, pruebas.
2. ⏭ **Fase 2** — Front-end con Vue 3 + Vite + Vue Router + Pinia.
   - ✅ 2.1 Base del proyecto y proxy a la API
   - ✅ 2.2 Layout: navbar, footer y fondo de cubos flotantes
   - 2.3 Inicio con cubos 3D, login y registro conectados a la API
   - 2.4 Cronómetro y tutoriales
   - 2.5 Librería de componentes y retiro de `client/legacy`
3. **Fase 3** — Cronómetro y tiempos como componentes, persistencia por usuario, accesibilidad.
4. **Fase 4** — Base de datos real, CI con GitHub Actions, Docker, despliegue.
