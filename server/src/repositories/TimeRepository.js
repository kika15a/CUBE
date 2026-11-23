import { Time } from '../models/Time.js';

export class TimeRepository {
  #storage;

  /** @param {import('./JsonFileStorage.js').JsonFileStorage} storage */
  constructor(storage) {
    this.#storage = storage;
  }

  async findByUserId(userId) {
    const records = await this.#storage.readAll();
    return records
      .filter((r) => r.userId === userId)
      .map((r) => Time.fromRecord(r));
  }

  async findById(id) {
    const records = await this.#storage.readAll();
    const record = records.find((r) => r.id === id);
    return record ? Time.fromRecord(record) : null;
  }

  async create(time) {
    await this.#storage.transaction((records) => {
      records.push(time.toRecord());
    });
    return time;
  }

  async deleteById(id) {
    await this.#storage.transaction((records) => {
      const index = records.findIndex((r) => r.id === id);
      if (index !== -1) records.splice(index, 1);
    });
  }
}