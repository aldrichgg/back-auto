import { apiClient } from './client';

export interface LoginPayload {
  email: string;
  password: string;
  mfaCode?: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  cpf?: string;
  phone?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  member: {
    id: string;
    memberId: string;
    email: string;
    fullName: string;
    tier: string;
    kycStatus: string;
    mfaEnabled: boolean;
    avatarUrl: string | null;
    createdAt: string;
  };
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
  return data;
}

export async function register(
  payload: RegisterPayload,
): Promise<{ memberId: string; message: string }> {
  const { data } = await apiClient.post('/auth/register', payload);
  return data;
}

export async function enableMfa(): Promise<{ qrCodeUrl: string; secret: string }> {
  const { data } = await apiClient.post('/auth/mfa/enable');
  return data;
}

export async function verifyMfa(code: string): Promise<{ confirmed: boolean }> {
  const { data } = await apiClient.post('/auth/mfa/verify', { code });
  return data;
}

export function persistSession(auth: AuthResponse) {
  localStorage.setItem('apex_access_token', auth.accessToken);
  localStorage.setItem('apex_refresh_token', auth.refreshToken);
  localStorage.setItem('apex_user', JSON.stringify(auth.member));
}

export function clearSession() {
  localStorage.removeItem('apex_access_token');
  localStorage.removeItem('apex_refresh_token');
  localStorage.removeItem('apex_user');
}

export function getStoredUser(): AuthResponse['member'] | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('apex_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
