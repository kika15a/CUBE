import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { JsonFileStorage } from '../src/repositories/JsonFileStorage.js';

async function withTempStorage(fn) {
  const dir = await mkdtemp(path.join(tmpdir(), 'cc-'));
  try {
    await fn(new JsonFileStorage(path.join(dir, 'data.json')), dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

test('readAll devuelve [] si el archivo no existe', async () => {
  await withTempStorage(async (storage) => {
    assert.deepEqual(await storage.readAll(), []);
  });
});

test('50 transacciones concurrentes no pierden datos (sin condiciones de carrera)', async () => {
  await withTempStorage(async (storage) => {
    await Promise.all(
      Array.from({ length: 50 }, (_, i) => storage.transaction((records) => records.push({ i }))),
    );
    assert.equal((await storage.readAll()).length, 50);
  });
});

test('si el mutator lanza error, no se escribe nada y la cola sigue funcionando', async () => {
  await withTempStorage(async (storage, dir) => {
    await storage.transaction((r) => r.push({ ok: 1 }));
    await assert.rejects(
      storage.transaction(() => {
        throw new Error('boom');
      }),
    );
    await storage.transaction((r) => r.push({ ok: 2 }));
    assert.equal((await storage.readAll()).length, 2);
    assert.deepEqual(await readdir(dir), ['data.json']); // sin .tmp huérfanos
    JSON.parse(await readFile(path.join(dir, 'data.json'), 'utf8')); // JSON válido
  });
});
