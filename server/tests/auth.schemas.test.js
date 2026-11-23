import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loginSchema, registerSchema } from '../src/validators/auth.schemas.js';

const valid = { nombre: '  Ana  ', apodo: 'ana_cuber', email: ' ANA@Mail.COM ', password: 'Cubo1234' };

test('registro: sanea nombre, apodo y email', () => {
  const r = registerSchema.parse(valid);
  assert.equal(r.nombre, 'Ana');
  assert.equal(r.apodo, 'ana_cuber');
  assert.equal(r.email, 'ana@mail.com');
});

test('registro: rechaza campos extra (mass assignment de "rol")', () => {
  assert.equal(registerSchema.safeParse({ ...valid, rol: 'admin' }).success, false);
});

test('registro: rechaza apodo con caracteres inválidos o muy corto', () => {
  assert.equal(registerSchema.safeParse({ ...valid, apodo: 'a' }).success, false);
  assert.equal(registerSchema.safeParse({ ...valid, apodo: 'con espacios' }).success, false);
  assert.equal(registerSchema.safeParse({ ...valid, apodo: 'con@simbolo' }).success, false);
});

test('registro: rechaza contraseñas débiles o demasiado largas para bcrypt', () => {
  assert.equal(registerSchema.safeParse({ ...valid, password: 'corta1' }).success, false);
  assert.equal(registerSchema.safeParse({ ...valid, password: 'solo letras aqui' }).success, false);
  assert.equal(registerSchema.safeParse({ ...valid, password: 'a1'.repeat(40) }).success, false);
});

test('login: exige email válido y contraseña', () => {
  assert.equal(loginSchema.safeParse({ email: 'x', password: 'y' }).success, false);
  assert.equal(loginSchema.safeParse({ email: 'a@b.co', password: 'y' }).success, true);
});
