import { apiClient } from './client';

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'buy' | 'sell' | 'dividend';
  amount: number;
  status: 'pending' | 'confirmed' | 'failed';
  description: string;
  reference: string | null;
  createdAt: string;
}

export interface WalletBalance {
  available: number;
  blocked: number;
  total: number;
}

export async function getWalletBalance(): Promise<WalletBalance> {
  const { data } = await apiClient.get<WalletBalance>('/payments/balance');
  return data;
}

export async function getTransactions(params?: {
  page?: number;
  limit?: number;
  type?: string;
}): Promise<{ data: Transaction[]; meta: Record<string, number> }> {
  const { data } = await apiClient.get('/payments/transactions', { params });
  return data;
}

export async function createDeposit(payload: {
  amount: number;
  method: 'pix' | 'ted';
}): Promise<{ pixCode?: string; pixQr?: string; reference: string }> {
  const { data } = await apiClient.post('/payments/deposit', payload);
  return data;
}
