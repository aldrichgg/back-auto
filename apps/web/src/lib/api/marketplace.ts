import { apiClient } from './client';
import type { Asset } from './assets';

export interface MarketListing {
  id: string;
  assetId: string;
  sellerId: string;
  quantity: number;
  pricePerFraction: number;
  status: 'open' | 'filled' | 'cancelled';
  asset: Asset;
  createdAt: string;
}

export async function getMarketListings(params?: { assetId?: string; page?: number; limit?: number }) {
  const { data } = await apiClient.get('/marketplace/listings', { params });
  return data;
}

export async function buyFromMarket(payload: {
  assetId: string;
  quantity: number;
  maxPricePerFraction?: number;
}) {
  const { data } = await apiClient.post('/marketplace/buy', payload);
  return data;
}

export async function getAssetOrderBook(assetId: string) {
  const { data } = await apiClient.get(`/trading/orderbook/${assetId}`);
  return data;
}

export async function getRecentTrades(assetId: string) {
  const { data } = await apiClient.get(`/trading/trades/${assetId}`);
  return data;
}
