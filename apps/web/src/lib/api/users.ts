import { apiClient } from './client';

export interface UserProfile {
  id: string;
  memberId: string;
  email: string;
  fullName: string;
  cpf: string | null;
  phone: string | null;
  tier: 'standard' | 'qualified' | 'professional' | 'private' | 'titanium';
  kycStatus: 'pending' | 'under_review' | 'approved' | 'rejected';
  mfaEnabled: boolean;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export async function getMe(): Promise<UserProfile> {
  const { data } = await apiClient.get<UserProfile>('/users/me');
  return data;
}

export async function updateMe(
  payload: Partial<Pick<UserProfile, 'fullName' | 'phone'>>,
): Promise<UserProfile> {
  const { data } = await apiClient.patch<UserProfile>('/users/me', payload);
  return data;
}
