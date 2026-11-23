import { z } from 'zod';

const MAX_MS = 24 * 60 * 60 * 1000; // 24 h — más que cualquier solve humano real

/** .strict() rechaza campos desconocidos (evita mass assignment de "userId"). */
export const createTimeSchema = z
  .object({
    ms: z
      .number({ required_error: 'El tiempo es obligatorio' })
      .int('El tiempo debe ser un entero de milisegundos')
      .positive('El tiempo debe ser positivo')
      .max(MAX_MS, 'El tiempo es demasiado largo'),
    scramble: z
      .string()
      .trim()
      .max(200, 'El scramble no puede exceder 200 caracteres')
      .optional()
      .nullable(),
  })
  .strict();