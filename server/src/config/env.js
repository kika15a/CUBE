import 'dotenv/config';
import { z } from 'zod';

const booleanFlag = z
  .enum(['0', '1', 'true', 'false'])
  .default('0')
  .transform((v) => v === '1' || v === 'true');

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  SESSION_SECRET: z
    .string({ required_error: 'SESSION_SECRET es obligatorio' })
    .min(32, 'SESSION_SECRET debe tener al menos 32 caracteres (ejecuta: npm run setup:env)'),
  CLIENT_ORIGIN: z.string().url().default('http://localhost:3000'),
  BCRYPT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),
  TRUST_PROXY: booleanFlag,
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  // Fail-fast: es mejor no arrancar que arrancar inseguro.
  const problems = parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`);
  console.error(`\n✖ Configuración de entorno inválida:\n${problems.join('\n')}\n`);
  process.exit(1);
}

/** Configuración validada e inmutable. */
export const env = Object.freeze({
  ...parsed.data,
  isProduction: parsed.data.NODE_ENV === 'production',
  isTest: parsed.data.NODE_ENV === 'test',
});
