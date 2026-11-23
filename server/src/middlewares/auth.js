import { AuthenticationError, ForbiddenError } from '../errors/AppError.js';

/** Exige sesión activa. */
export const requireAuth = (req, _res, next) => {
  if (!req.session?.userId) {
    return next(new AuthenticationError('No autenticado'));
  }
  next();
};

/** Exige uno de los roles indicados (RBAC). Úsalo DESPUÉS de requireAuth. */
export const requireRole =
  (...roles) =>
  (req, _res, next) => {
    if (!roles.includes(req.session?.user?.rol)) {
      return next(new ForbiddenError());
    }
    next();
  };
