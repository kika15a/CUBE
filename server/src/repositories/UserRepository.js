import { ConflictError } from '../errors/AppError.js';
import { User } from '../models/User.js';

export class UserRepository {
  #storage;

  /** @param {import('./JsonFileStorage.js').JsonFileStorage} storage */
  constructor(storage) {
    this.#storage = storage;
  }

  async findByEmail(email) {
    const records = await this.#storage.readAll();
    const record = records.find((r) => r.email === email);
    return record ? User.fromRecord(record) : null;
  }

  async findById(id) {
    const records = await this.#storage.readAll();
    const record = records.find((r) => r.id === id);
    return record ? User.fromRecord(record) : null;
  }

  /**
   * Inserta un usuario garantizando unicidad de email Y apodo de forma atómica.
   * @param {User} user
   * @throws {ConflictError} si el email o el apodo ya existen
   */
  async create(user) {
    await this.#storage.transaction((records) => {
      if (records.some((r) => r.email === user.email)) {
        throw new ConflictError('El correo electrónico ya está registrado');
      }
      if (user.apodo && records.some((r) => r.apodo === user.apodo)) {
        throw new ConflictError('Ese apodo ya está en uso');
      }
      records.push(user.toRecord());
    });
    return user;
  }
}
