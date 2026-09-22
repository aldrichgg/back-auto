import { apiClient } from './client';
import type { Asset } from './assets';

export interface Holding {
  id: string;
  assetId: string;
  quantity: number;
  averageCost: number;
  asset: Asset;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioSummary {
  totalInvested: number;
  currentValue: number;
  totalReturn: number;
  returnPercent: number;
  holdings: Holding[];
}

export async function getPortfolio(): Promise<PortfolioSummary> {
  const { data } = await apiClient.get<PortfolioSummary>('/portfolio');
  return data;
}

export async function getHoldings(): Promise<Holding[]> {
  const { data } = await apiClient.get<Holding[]>('/portfolio/holdings');
  return data;
}
