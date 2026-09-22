/**
 * Axios HTTP client — centralizado com JWT interceptor.
 * Toda requisição autenticada usa este cliente.
 */
import axios, { AxiosInstance, AxiosError } from 'axios';

const isServer = typeof window === 'undefined';

// No navegador, usamos o path relativo para bater no proxy/rewrites do Next.js.
// No lado do servidor (SSR), precisamos da URL absoluta.
const BASE_URL = isServer 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000') 
  : '';

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: inject JWT ─────────────────────────
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('apex_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ── Response interceptor: handle 401 ────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear auth and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('apex_access_token');
        localStorage.removeItem('apex_refresh_token');
        localStorage.removeItem('apex_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

/** SWR fetcher — uses authenticated apiClient */
export const fetcher = (url: string) =>
  apiClient.get(url).then((res) => res.data);
