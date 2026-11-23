import helmet from 'helmet';
import { env } from '../config/env.js';

/**
 * Cabeceras de seguridad (helmet + CSP estricta).
 * Sin legacy ya no hay estilos inline ni CDN externo: CSP cerrada.
 */
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Vue/Vite inyecta estilos en dev
      fontSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      mediaSrc: ["'self'"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: env.isProduction ? [] : null,
    },
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  crossOriginEmbedderPolicy: false,
});

/** Las respuestas de la API nunca deben guardarse en caché (datos de sesión). */
export const noStore = (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
};
