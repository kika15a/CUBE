import rateLimit from 'express-rate-limit';

const tooMany = (message) => ({
  success: false,
  error: { code: 'RATE_LIMITED', message },
});

/** Límite general: protege la Disponibilidad frente a abuso/scraping. */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: tooMany('Demasiadas solicitudes, intenta más tarde'),
});

/** Límite estricto para login/registro: frena fuerza bruta y credential stuffing. */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: tooMany('Demasiados intentos, espera unos minutos'),
});
