import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { validateBody } from '../middlewares/validate.js';
import { createTimeSchema } from '../validators/times.schemas.js';

/** @param {import('../controllers/TimesController.js').TimesController} controller */
export function createTimesRouter(controller) {
  const router = Router();

  // Todas las rutas exigen sesión activa
  router.use(requireAuth);

  router.get('/', controller.list);
  router.post('/', validateBody(createTimeSchema), controller.create);
  router.delete('/:id', controller.remove);

  return router;
}