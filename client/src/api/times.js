import { http } from './http';

/** GET /api/times → { tiempos: [{ id, ms, scramble, createdAt }] } */
export const fetchTimes = () => http.get('/times').then((r) => r.data.tiempos);

/** POST /api/times → { tiempo } */
export const createTime = ({ ms, scramble }) =>
  http.post('/times', { ms, scramble }).then((r) => r.data.tiempo);

/** DELETE /api/times/:id */
export const deleteTime = (id) => http.delete(`/times/${id}`).then((r) => r.data);
