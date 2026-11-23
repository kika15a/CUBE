import { Router } from 'express';
import { createAuthRouter } from './auth.routes.js';
import { apiNotFound } from '../middlewares/errorHandler.js';

/** Router raíz de la API (/api/*). */
export function createApiRouter({ authController }) {
  const router = Router();

  router.get('/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
  router.use('/auth', createAuthRouter(authController));
  router.use(apiNotFound);

  return router;
}
