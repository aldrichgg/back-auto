import { apiClient } from './client';

export interface Asset {
  id: string;
  vin: string;
  name: string;
  year: number;
  color: string | null;
  make: string | null;
  model: string | null;
  description: string | null;
  status: 'draft' | 'ipo' | 'secondary' | 'sold';
  totalFractions: number;
  availableFractions: number;
  fractionPrice: number;
  yieldTarget: number | null;
  investmentTermMonths: number | null;
  custodyLocation: string | null;
  custodyTemperature: number | null;
  custodyHumidity: number | null;
  insuranceValue: number | null;
  insurancePolicy: string | null;
  thumbnailUrl: string | null;
  photos: string[];
  ipoExpiresAt: string | null;
  lastPrice: number | null;
  evaluationUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AssetsListResponse {
  data: Asset[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ListAssetsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  sort?: 'yield_desc' | 'price_asc' | 'capture_desc' | 'created_at';
}

export async function getAssets(
  params: ListAssetsParams = {},
): Promise<AssetsListResponse> {
  const { data } = await apiClient.get<AssetsListResponse>('/assets', { params });
  return data;
}

export async function getAssetById(id: string): Promise<Asset> {
  const { data } = await apiClient.get<Asset>(`/assets/${id}`);
  return data;
}

export async function getAssetProvenance(id: string) {
  const { data } = await apiClient.get(`/assets/${id}/provenance`);
  return data;
}

/** Compute captured % */
export function capturedPercent(asset: Asset): number {
  const captured = asset.totalFractions - asset.availableFractions;
  return Math.round((captured / asset.totalFractions) * 100);
}

/** Format BRL */
export function formatBRL(value: number | string | null): string {
  if (value === null || value === undefined) return '—';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(num);
}
