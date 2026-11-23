/**
 * Capa HTTP de tiempos. Traduce request/response <-> servicio.
 * Los errores se delegan al manejador global (next(err)).
 */
export class TimesController {
  #service;

  /** @param {import('../services/TimesService.js').TimesService} timesService */
  constructor(timesService) {
    this.#service = timesService;
  }

  list = async (req, res, next) => {
    try {
      const times = await this.#service.listForUser(req.session.userId);
      res.json({ tiempos: times.map((t) => t.toPublic()) });
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const time = await this.#service.create(req.session.userId, req.body);
      res.status(201).json({ tiempo: time.toPublic() });
    } catch (err) {
      next(err);
    }
  };

  remove = async (req, res, next) => {
    try {
      await this.#service.delete(req.session.userId, req.params.id);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  };
}