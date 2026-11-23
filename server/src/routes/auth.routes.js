import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { authLimiter } from '../middlewares/rateLimiters.js';
import { validateBody } from '../middlewares/validate.js';
import { loginSchema, registerSchema } from '../validators/auth.schemas.js';

/** @param {import('../controllers/AuthController.js').AuthController} controller */
export function createAuthRouter(controller) {
  const router = Router();

  router.post('/register', authLimiter, validateBody(registerSchema), controller.register);
  router.post('/login', authLimiter, validateBody(loginSchema), controller.login);
  router.post('/logout', controller.logout);
  router.get('/me', requireAuth, controller.me);

  return router;
}
