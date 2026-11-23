import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AuthService } from '../src/services/AuthService.js';
import { AuthenticationError, ConflictError } from '../src/errors/AppError.js';

/** Repositorio falso en memoria: demuestra la inyección de dependencias. */
class InMemoryUserRepository {
  #users = [];
  async findByEmail(email) {
    return this.#users.find((u) => u.email === email) ?? null;
  }
  async findById(id) {
    return this.#users.find((u) => u.id === id) ?? null;
  }
  async create(user) {
    if (this.#users.some((u) => u.email === user.email)) throw new ConflictError();
    this.#users.push(user);
    return user;
  }
}

const makeService = () =>
  new AuthService({ userRepository: new InMemoryUserRepository(), bcryptRounds: 10 });

const data = { nombre: 'Ana', email: 'ana@mail.com', password: 'Cubo1234' };

test('register guarda un hash, no la contraseña en claro', async () => {
  const user = await makeService().register(data);
  assert.notEqual(user.passwordHash, data.password);
  assert.match(user.passwordHash, /^\$2[aby]\$/);
});

test('register rechaza email duplicado', async () => {
  const svc = makeService();
  await svc.register(data);
  await assert.rejects(svc.register(data), ConflictError);
});

test('authenticate: credenciales correctas devuelven el usuario', async () => {
  const svc = makeService();
  await svc.register(data);
  const user = await svc.authenticate({ email: data.email, password: data.password });
  assert.equal(user.email, data.email);
});

test('authenticate: usuario inexistente y contraseña errónea dan el MISMO error', async () => {
  const svc = makeService();
  await svc.register(data);
  const wrongPass = await svc.authenticate({ email: data.email, password: 'mala' }).catch((e) => e);
  const noUser = await svc.authenticate({ email: 'no@mail.com', password: 'x' }).catch((e) => e);
  assert.ok(wrongPass instanceof AuthenticationError);
  assert.equal(wrongPass.message, noUser.message);
});
