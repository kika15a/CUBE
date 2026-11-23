import { ValidationError } from '../errors/AppError.js';

/**
 * Valida y SANEA req.body con un esquema Zod.
 * Reemplaza req.body por la versión limpia (trim, lowercase, sin campos extra).
 */
export const validateBody = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const fields = Object.fromEntries(
      result.error.issues.map((i) => [i.path.join('.') || '_', i.message]),
    );
    return next(new ValidationError(fields));
  }
  req.body = result.data;
  next();
};
