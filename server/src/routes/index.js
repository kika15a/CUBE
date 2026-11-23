import { Router } from 'express';
import { createAuthRouter } from './auth.routes.js';
import { createTimesRouter } from './times.routes.js';
import { apiNotFound } from '../middlewares/errorHandler.js';

/** Router raíz de la API (/api/*). */
export function createApiRouter({ authController, timesController }) {
  const router = Router();

  router.get('/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
  router.use('/auth', createAuthRouter(authController));
  router.use('/times', createTimesRouter(timesController));
  router.use(apiNotFound);

  return router;
}
