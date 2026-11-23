import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import createMemoryStore from 'memorystore';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { env } from './config/env.js';
import { AuthController } from './controllers/AuthController.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { originGuard } from './middlewares/originGuard.js';
import { globalLimiter } from './middlewares/rateLimiters.js';
import { noStore, securityHeaders } from './middlewares/security.js';
import { JsonFileStorage } from './repositories/JsonFileStorage.js';
import { UserRepository } from './repositories/UserRepository.js';
import { createApiRouter } from './routes/index.js';
import { createPagesRouter } from './routes/pages.routes.js';
import { AuthService } from './services/AuthService.js';

const MemoryStore = createMemoryStore(session);
const dataDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../data');

/**
 * Fábrica de la aplicación (composition root): aquí se "cablean" las dependencias.
 * Al ser una función, es fácil de probar sin levantar un puerto.
 */
export function createApp() {
  const app = express();

  if (env.TRUST_PROXY) app.set('trust proxy', 1);
  app.disable('x-powered-by');

  // --- Composición de dependencias (inyección) ---
  const userRepository = new UserRepository(new JsonFileStorage(path.join(dataDir, 'users.json')));
  const authService = new AuthService({ userRepository, bcryptRounds: env.BCRYPT_ROUNDS });
  const authController = new AuthController(authService);

  // --- Middlewares globales ---
  app.use(securityHeaders);
  if (!env.isTest) app.use(morgan(env.isProduction ? 'combined' : 'dev'));
  app.use(globalLimiter);
  app.use(express.json({ limit: '10kb' })); // Disponibilidad: evita cuerpos gigantes
  app.use(express.urlencoded({ extended: false, limit: '10kb' }));

  app.use(
    session({
      name: 'cc.sid',
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false, // no crea sesión hasta que haya login
      rolling: true,
      store: new MemoryStore({ checkPeriod: 24 * 60 * 60 * 1000 }),
      cookie: {
        httpOnly: true, // JS del navegador no puede leer la cookie (mitiga XSS)
        secure: env.isProduction, // solo HTTPS en producción
        sameSite: 'lax', // mitiga CSRF
        maxAge: 2 * 60 * 60 * 1000, // 2 horas de inactividad
      },
    }),
  );

  // --- API ---
  app.use('/api', noStore, originGuard, createApiRouter({ authController }));

  // --- Sitio (legacy hasta la Fase 2) ---
  app.use(createPagesRouter());

  app.use(errorHandler);
  return app;
}
