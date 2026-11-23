import { http } from './http';

/** POST /api/auth/register → { success, usuario } */
export const registerUser = (payload) => http.post('/auth/register', payload).then((r) => r.data);

/** POST /api/auth/login → { success, usuario } */
export const loginUser = (credentials) => http.post('/auth/login', credentials).then((r) => r.data);

/** POST /api/auth/logout */
export const logoutUser = () => http.post('/auth/logout').then((r) => r.data);

/** GET /api/auth/me → { autenticado, usuario } */
export const fetchCurrentUser = () => http.get('/auth/me').then((r) => r.data);
