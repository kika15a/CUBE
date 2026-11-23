import axios from 'axios';

/**
 * Cliente HTTP único de la aplicación.
 * - baseURL relativa: en desarrollo Vite la reenvía al backend (proxy);
 *   en producción el mismo dominio sirve ambas partes.
 * - withCredentials: envía la cookie de sesión httpOnly.
 */
export const http = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

/** Convierte cualquier error de Axios en un mensaje seguro para mostrar. */
export function getErrorMessage(error) {
  return (
    error?.response?.data?.error?.message ??
    (error?.code === 'ECONNABORTED' ? 'El servidor tardó demasiado en responder' : null) ??
    'No se pudo conectar con el servidor'
  );
}
