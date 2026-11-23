import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Role, User } from '../src/models/User.js';

test('User.create asigna rol "usuario" y un id UUID', () => {
  const u = User.create({ nombre: 'Ana', email: 'ana@mail.com', passwordHash: 'hash' });
  assert.equal(u.rol, Role.USER);
  assert.match(u.id, /^[0-9a-f-]{36}$/);
});

test('el hash de contraseña NUNCA aparece en toPublic ni en JSON.stringify', () => {
  const u = User.create({ nombre: 'Ana', email: 'ana@mail.com', passwordHash: 'SECRETO' });
  assert.equal('passwordHash' in u.toPublic(), false);
  assert.equal(JSON.stringify(u).includes('SECRETO'), false);
  assert.equal(u.toRecord().passwordHash, 'SECRETO'); // solo para persistir
});
