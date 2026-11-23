import { z } from 'zod';

const email = z
  .string({ required_error: 'El correo es obligatorio' })
  .trim()
  .toLowerCase()
  .max(254, 'Correo demasiado largo')
  .email('Correo electrónico inválido');

const apodo = z
  .string({ required_error: 'El apodo es obligatorio' })
  .trim()
  .min(2, 'El apodo debe tener al menos 2 caracteres')
  .max(20, 'El apodo no puede exceder 20 caracteres')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Solo letras, números, guiones y guiones bajos');

/**
 * .strict() rechaza campos desconocidos (evita mass assignment de "rol").
 * bcrypt solo procesa 72 bytes, por eso el máximo de la contraseña es 72.
 */
export const registerSchema = z
  .object({
    nombre: z
      .string({ required_error: 'El nombre es obligatorio' })
      .trim()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(60, 'El nombre es demasiado largo'),
    apodo,
    email,
    password: z
      .string({ required_error: 'La contraseña es obligatoria' })
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(72, 'La contraseña no puede exceder 72 caracteres')
      .regex(/[A-Za-z]/, 'La contraseña debe incluir al menos una letra')
      .regex(/\d/, 'La contraseña debe incluir al menos un número'),
  })
  .strict();

export const loginSchema = z
  .object({
    email,
    password: z.string({ required_error: 'La contraseña es obligatoria' }).min(1).max(72),
  })
  .strict();
  