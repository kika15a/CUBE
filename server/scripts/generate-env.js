// Genera server/.env con un SESSION_SECRET criptográficamente seguro.
// Uso: npm run setup:env
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, '.env');

if (existsSync(target)) {
  console.log('✔ Ya existe server/.env — no se sobrescribe.');
  process.exit(0);
}

const template = readFileSync(path.join(root, '.env.example'), 'utf8');
const secret = randomBytes(48).toString('hex');
writeFileSync(target, template.replace(/^SESSION_SECRET=.*$/m, `SESSION_SECRET=${secret}`), {
  mode: 0o600,
});
console.log('✔ server/.env creado con un SESSION_SECRET nuevo.');
