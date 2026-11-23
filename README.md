# CubeCenter

Sitio web para amantes de los cubos Rubik: tutoriales, cronómetro y cuentas de usuario.

> **Estado:** Fase 1 completada (arquitectura y seguridad del servidor). Ver [Roadmap](#roadmap).

## Estructura

```
cubecenter/
├── client/
│   └── legacy/            # Sitio actual (HTML/CSS/JS). Se reemplaza por Vue en la Fase 2
├── server/
│   ├── src/
│   │   ├── config/        # Variables de entorno validadas (fail-fast)
│   │   ├── controllers/   # Capa HTTP (req/res)
│   │   ├── services/      # Lógica de negocio
│   │   ├── repositories/  # Acceso a datos (hoy JSON, mañana BD)
│   │   ├── models/        # Entidades de dominio (POO)
│   │   ├── middlewares/   # Seguridad, validación, errores
│   │   ├── routes/        # Definición de rutas
│   │   ├── validators/    # Esquemas Zod
│   │   ├── errors/        # Jerarquía de errores
│   │   ├── app.js         # Composition root
│   │   └── server.js      # Arranque y apagado ordenado
│   ├── tests/             # node:test
│   └── data/              # Datos locales (ignorados por Git)
└── README.md
```

## Arranque rápido

Requiere Node.js >= 20.6.

```bash
cd server
npm install
npm run setup:env     # crea .env con un SESSION_SECRET seguro
npm run dev           # http://localhost:3000
npm test
```

## Cómo previsualizar

No necesitas ninguna API externa de previsualización: el servidor corre en tu máquina.

- **Ahora (Fase 1):** abre http://localhost:3000. Cambios en `server/src` reinician el servidor solos (nodemon); para HTML/CSS recarga el navegador.
- **Probar la API:** con la extensión *Thunder Client* de VS Code (o `curl`) contra `http://localhost:3000/api/...`.
- **Desde la Fase 2:** Vite dará recarga en caliente (HMR) en http://localhost:5173; el cambio se ve al guardar, sin recargar.

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
2. ⏭ **Fase 2** — Front-end con Vue 3 + Vite + Vue Router + Pinia, componentes reutilizables y librería UI; consumo de la API REST; diseño responsive.
3. **Fase 3** — Cronómetro y tiempos como componentes, persistencia por usuario, accesibilidad.
4. **Fase 4** — Base de datos real, CI con GitHub Actions, Docker, despliegue.
