import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TimesService } from '../src/services/TimesService.js';
import { ForbiddenError, NotFoundError } from '../src/errors/AppError.js';

class InMemoryTimeRepository {
  #times = [];
  async findByUserId(userId) {
    return this.#times.filter((t) => t.userId === userId);
  }
  async findById(id) {
    return this.#times.find((t) => t.id === id) ?? null;
  }
  async create(time) {
    this.#times.push(time);
    return time;
  }
  async deleteById(id) {
    this.#times = this.#times.filter((t) => t.id !== id);
  }
}

const makeService = () => new TimesService({ timeRepository: new InMemoryTimeRepository() });

test('create guarda el tiempo asociado al usuario', async () => {
  const svc = makeService();
  const t = await svc.create('user-1', { ms: 5000, scramble: 'R U R' });
  assert.equal(t.userId, 'user-1');
  assert.equal(t.ms, 5000);
});

test('listForUser solo devuelve tiempos del usuario indicado', async () => {
  const svc = makeService();
  await svc.create('user-1', { ms: 5000 });
  await svc.create('user-2', { ms: 6000 });
  const list = await svc.listForUser('user-1');
  assert.equal(list.length, 1);
  assert.equal(list[0].userId, 'user-1');
});

test('delete: un usuario NO puede borrar tiempos de otro (403)', async () => {
  const svc = makeService();
  const t = await svc.create('user-1', { ms: 5000 });
  await assert.rejects(svc.delete('user-2', t.id), ForbiddenError);
});

test('delete: id inexistente devuelve NotFoundError', async () => {
  const svc = makeService();
  await assert.rejects(svc.delete('user-1', 'no-existe'), NotFoundError);
});

test('delete: el dueño SÍ puede borrar su tiempo', async () => {
  const svc = makeService();
  const t = await svc.create('user-1', { ms: 5000 });
  await svc.delete('user-1', t.id);
  const list = await svc.listForUser('user-1');
  assert.equal(list.length, 0);
});