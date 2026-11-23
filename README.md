# CubeCenter

Sitio para amantes del cubo Rubik: tutoriales, cronómetro para medir tus tiempos y cuentas de usuario. Lo empecé como proyecto personal para aprender backend + frontend, y se convirtió en la mejor carta de presentación que tengo.

> **Estado actual:** Backend completo (Fase 1) + Frontend en Vue 3 (Fases 2.1–2.4 terminadas). Falta pulir la librería de componentes (2.5) antes de pasar a base de datos real y despliegue.

---

## Qué hay dentro

```text
cubecenter/
├── server/          # API REST en Express (Fase 1 completa)
├── client/          # SPA en Vue 3 + Vite (Fase 2 en curso)
│   └── legacy/      # Sitio anterior en HTML/CSS/JS (se retira al terminar la migración)
└── README.md
```

---

## Cómo correrlo (dos terminales)

Requiere **Node.js >= 20.6**.

```bash
# Terminal 1 — Backend (API en http://localhost:3000)
cd server
npm install
npm run setup:env     # Crea .env con un SESSION_SECRET seguro
npm run dev

# Terminal 2 — Frontend (Vue en http://localhost:5173)
cd client
npm install
npm run dev
```

Abre `http://localhost:5173`. El proxy de Vite reenvía `/api/*` al backend, evitando problemas de CORS y manteniendo las cookies de sesión funcionando.

> **Importante:** En `server/.env` debe estar `CLIENT_ORIGIN=http://localhost:5173` para que el backend acepte peticiones del frontend.

**Pruebas del backend:** `cd server && npm test` (recomendable ejecutarlo con el servidor detenido).

---

## Dónde ver qué

| Recurso | URL | Notas |
| :--- | :--- | :--- |
| **App Vue** | `http://localhost:5173` | Recarga en caliente (*HMR*) al guardar cambios |
| **API** | `http://localhost:3000/api/health` | También operable desde *Thunder Client* en VS Code |
| **Vista de diagnóstico** | `http://localhost:5173/estado` | Solo en desarrollo; verifica comunicación front ↔ back |
| **Sitio anterior** | `http://localhost:3000` | Disponible mientras concluye la migración |

---

## Seguridad aplicada

El proyecto busca ir más allá de un prototipo básico:

### Confidencialidad
* Contraseñas hasheadas con **bcrypt** (costo 12). El hash permanece en un campo privado de `User` y nunca se expone en `toJSON()` ni `toPublic()`.
* Cookie de sesión configurada como `httpOnly`, `secure` (en producción) y `sameSite=lax`.
* Respuestas de login idénticas ante usuario inexistente o contraseña incorrecta, apoyadas en un hash señuelo para equiparar tiempos de respuesta y evitar enumeración de usuarios.
* Secretos aislados en `.env`, errores `500` genéricos (sin *stack trace* al cliente) y cabeceras protegidas con `helmet` + CSP.

### Integridad
* Validación con **Zod** usando `.strict()` en los esquemas para rechazar campos no permitidos (por ejemplo, intentar enviar `rol: "admin"` en el registro).
* Regeneración del ID de sesión al iniciar sesión para mitigar *session fixation*.
* Verificación de `Origin` en peticiones con efecto de escritura para prevenir CSRF.
* Escritura atómica (`.tmp` + `rename`) y serializada en el almacenamiento JSON para evitar corrupción ante interrupciones.

### Disponibilidad
* *Rate limiting* global y reforzado en rutas de login y registro contra fuerza bruta.
* Límite de tamaño de *body* fijado en 10 KB.
* Apagado ordenado (*graceful shutdown*), endpoint `/api/health` y desactivación de caché en respuestas de la API.

> **Pendiente honesto:** Implementar protección CSRF con token explícito (actualmente `sameSite` + `Origin`) y migrar a PostgreSQL en la **Fase 4**.

---

## Estructura del backend

Arquitectura en capas para evitar concentrar responsabilidades en un único archivo monolítico:

```text
routes → controllers → services → repositories → models
```

* `routes/` — Asocia rutas HTTP con sus controladores.
* `controllers/` — Adapta `req` y `res` sin contener lógica de negocio.
* `services/` — Concentra las reglas de negocio y casos de uso.
* `repositories/` — Abstrae el acceso a datos (facilita cambiar JSON por PostgreSQL sin alterar servicios).
* `models/` — Entidades con comportamiento (`User`, `Time`).
* `middlewares/` — `helmet`, *rate limit*, validación con Zod y manejo centralizado de errores.

---

## Estructura del frontend

Organización modular por funcionalidad (*feature-based*):

```text
features/
├── auth/       # Login, registro y validación
├── timer/      # Cronómetro y tarjetas de tiempos
├── tutorials/  # Contenido estático de tutoriales
└── home/       # Página de inicio
```

* Cada *feature* agrupa sus componentes, llamadas a API y lógica específica.
* `components/ui/` — Componentes reutilizables transversales (botones, inputs, cards, etc.).
* `components/layout/` — Estructura general de página (`navbar`, `footer`, *layout*).
* `composables/` — Lógica reutilizable (`useForm`, `useTimer`, `useMobileMenu`).

---

## Aprendizajes clave

* Separar backend y frontend exige más planeación inicial, pero aporta claridad y mantenibilidad a largo plazo.
* Implementar la regeneración de sesión hizo tangible el concepto de *session fixation*.
* Las pruebas automatizadas del backend ayudaron a detectar pérdida de datos bajo concurrencia (50 transacciones simultáneas).
* Construir el cronómetro marcó el salto hacia un modelo mental reactivo en Vue en lugar de manipulación imperativa tipo jQuery.
* **Próximo gran reto:** Migrar de almacenamiento JSON a PostgreSQL en la Fase 4.

---

## Convenciones del proyecto

* Mensajes de commit bajo [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`).
* Rama `main` estable; desarrollo en ramas `feat/...` o `fix/...`.
* Ejecutar `npm run lint` y `npm run format` antes de confirmar cambios.

---

## Roadmap

**Fase 1** — Backend: arquitectura en capas, POO, seguridad CIA y pruebas.
**Fase 2** — Frontend con Vue 3 + Vite + Vue Router + Pinia.
   * 2.1 Base del proyecto + proxy hacia la API
   * 2.2 Layout: *navbar*, *footer* y cubos flotantes
   * 2.3 Inicio, login y registro (con apodo) integrados con la API
   * 2.4 Cronómetro con persistencia por usuario + tutoriales
   * 2.5 Librería de componentes y retiro de `client/legacy`
**Fase 3** — Accesibilidad en detalle y pruebas de frontend con Vitest.
 **Fase 4** — PostgreSQL, Docker, CI con GitHub Actions y despliegue en Render + Vercel.