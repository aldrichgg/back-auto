export interface User {
  id: string;
  memberId: string;
  email: string;
  fullName: string;
  cpf?: string;
  tier: 'select' | 'private' | 'ultra';
  kycStatus: 'pending' | 'approved' | 'rejected';
  mfaEnabled: boolean;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
