import { ForbiddenError, NotFoundError } from '../errors/AppError.js';
import { Time } from '../models/Time.js';

/**
 * Lógica de negocio de tiempos. No conoce HTTP ni cómo se persiste:
 * depende del repositorio inyectado (mismo patrón que AuthService).
 */
export class TimesService {
  #times;

  /** @param {{ timeRepository: import('../repositories/TimeRepository.js').TimeRepository }} deps */
  constructor({ timeRepository }) {
    this.#times = timeRepository;
  }

  /** @returns {Promise<Time>} */
  async create(userId, { ms, scramble }) {
    const time = Time.create({ userId, ms, scramble });
    return this.#times.create(time);
  }

  /** @returns {Promise<Time[]>} */
  listForUser(userId) {
    return this.#times.findByUserId(userId);
  }

  /**
   * Solo el dueño puede borrar su tiempo. Cualquier otro caso es
   * 404 (no existe) o 403 (existe pero no es tuyo).
   */
  async delete(userId, id) {
    const time = await this.#times.findById(id);
    if (!time) throw new NotFoundError('Tiempo no encontrado');
    if (time.userId !== userId) throw new ForbiddenError('No puedes borrar este tiempo');
    await this.#times.deleteById(id);
  }
}