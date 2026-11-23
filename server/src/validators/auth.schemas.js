import { z } from 'zod';

const email = z
  .string({ required_error: 'El correo es obligatorio' })
  .trim()
  .toLowerCase()
  .max(254, 'Correo demasiado largo')
  .email('Correo electrónico inválido');

/**
 * `.strict()` rechaza campos desconocidos: evita "mass assignment"
 * (p. ej. que alguien envíe `rol: "admin"` en el registro).
 * bcrypt solo procesa 72 bytes, por eso el máximo es 72.
 */
export const registerSchema = z
  .object({
    nombre: z
      .string({ required_error: 'El nombre es obligatorio' })
      .trim()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(60, 'El nombre es demasiado largo'),
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
