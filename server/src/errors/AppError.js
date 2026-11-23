/**
 * Error operacional (esperado) de la aplicación.
 * El manejador global solo expone `message` al cliente cuando es una AppError;
 * cualquier otro error se responde como 500 genérico (Confidencialidad).
 */
export class AppError extends Error {
  /**
   * @param {string} message Mensaje seguro para mostrar al cliente.
   * @param {number} statusCode Código HTTP.
   * @param {string} code Código interno estable (útil para el front).
   * @param {unknown} [details] Detalles adicionales seguros (p. ej. errores de campo).
   */
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR', details = undefined) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(details, message = 'Datos de entrada inválidos') {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Credenciales inválidas') {
    super(message, 401, 'UNAUTHENTICATED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'No tienes permisos para esta acción') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Recurso no encontrado') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class ConflictError extends AppError {
  constructor(message = 'El recurso ya existe') {
    super(message, 409, 'CONFLICT');
  }
}
