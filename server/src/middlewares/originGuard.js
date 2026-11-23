import { env } from '../config/env.js';
import { ForbiddenError } from '../errors/AppError.js';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * Defensa CSRF por verificación de Origin (complementa SameSite=Lax en la cookie).
 * Los navegadores SIEMPRE envían Origin en peticiones cross-site que modifican datos;
 * si falta, la petición no viene de un navegador con la cookie de la víctima.
 */
export const originGuard = (req, _res, next) => {
  if (SAFE_METHODS.has(req.method)) return next();
  const origin = req.get('origin');
  if (origin && origin !== env.CLIENT_ORIGIN) {
    return next(new ForbiddenError('Origen no permitido'));
  }
  next();
};
