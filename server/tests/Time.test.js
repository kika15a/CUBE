import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Time } from '../src/models/Time.js';

test('Time.create asigna un UUID y guarda ms, scramble y userId', () => {
  const t = Time.create({ userId: 'u1', ms: 12345, scramble: "R U R' U'" });
  assert.match(t.id, /^[0-9a-f-]{36}$/);
  assert.equal(t.ms, 12345);
  assert.equal(t.userId, 'u1');
  assert.equal(t.scramble, "R U R' U'");
});

test('toPublic NO expone userId (el cliente ya sabe quién es)', () => {
  const t = Time.create({ userId: 'u1', ms: 1000 });
  assert.equal('userId' in t.toPublic(), false);
  assert.equal(t.toPublic().ms, 1000);
});