/**
 * Capa HTTP: traduce request/response <-> servicio. Sin lógica de negocio.
 * Los errores se delegan al manejador global (next(err)).
 */
export class AuthController {
  #auth;

  /** @param {import('../services/AuthService.js').AuthService} authService */
  constructor(authService) {
    this.#auth = authService;
  }

  register = async (req, res, next) => {
    try {
      const user = await this.#auth.register(req.body);
      res.status(201).json({ success: true, usuario: user.toPublic() });
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const user = await this.#auth.authenticate(req.body);
      // Regenerar el id de sesión tras autenticar previene "session fixation".
      req.session.regenerate((err) => {
        if (err) return next(err);
        req.session.userId = user.id;
        req.session.user = user.toPublic();
        req.session.save((saveErr) => {
          if (saveErr) return next(saveErr);
          res.json({ success: true, usuario: user.toPublic() });
        });
      });
    } catch (err) {
      next(err);
    }
  };

  logout = (req, res, next) => {
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('cc.sid');
      res.json({ success: true, mensaje: 'Sesión cerrada correctamente' });
    });
  };

  /** Siempre 200: el front lo usa al arrancar para saber si hay sesión activa. */
  me = (req, res) => {
    const usuario = req.session?.user ?? null;
    res.json({ autenticado: usuario !== null, usuario });
  };
}
