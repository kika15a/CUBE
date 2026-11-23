import { ConflictError } from '../errors/AppError.js';
import { User } from '../models/User.js';

/**
 * Repositorio de usuarios: único punto que conoce cómo se guardan.
 * Los servicios dependen de ESTA interfaz (findByEmail, findById, create),
 * no del almacenamiento; cambiar a PostgreSQL/MongoDB no tocará la lógica de negocio.
 */
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
   * Inserta un usuario garantizando unicidad de email de forma atómica
   * (la verificación y la escritura ocurren dentro de la misma transacción).
   * @param {User} user
   * @throws {ConflictError} si el email ya existe
   */
  async create(user) {
    await this.#storage.transaction((records) => {
      if (records.some((r) => r.email === user.email)) {
        throw new ConflictError('El correo electrónico ya está registrado');
      }
      records.push(user.toRecord());
    });
    return user;
  }
}
