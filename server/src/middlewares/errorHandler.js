import { env } from '../config/env.js';
import { AppError, NotFoundError } from '../errors/AppError.js';

/** 404 para rutas /api inexistentes. */
export const apiNotFound = (_req, _res, next) => next(new NotFoundError('Ruta de API no encontrada'));

/**
 * Manejador global. Confidencialidad: solo las AppError muestran su mensaje;
 * cualquier otro error devuelve un 500 genérico (sin stack ni detalles internos).
 */
 
export const errorHandler = (err, req, res, _next) => {
  if (res.headersSent) return;

  // JSON malformado enviado por el cliente
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, error: { code: 'BAD_JSON', message: 'JSON inválido' } });
  }
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({ success: false, error: { code: 'TOO_LARGE', message: 'Solicitud demasiado grande' } });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: { code: err.code, message: err.message, ...(err.details && { details: err.details }) },
    });
  }

  console.error(`[${req.method} ${req.originalUrl}]`, env.isProduction ? err.message : err);
  res.status(500).json({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'Error interno del servidor' },
  });
};
