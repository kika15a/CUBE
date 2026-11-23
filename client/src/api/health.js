import { http } from './http';

/** GET /api/health → { status: 'ok', uptime } */
export async function fetchHealth() {
  const { data } = await http.get('/health');
  return data;
}
