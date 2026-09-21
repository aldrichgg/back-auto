export interface Order {
  id: string;
  userId: string;
  assetId: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit';
  quantity: number;
  price?: number;
  status: 'open' | 'filled' | 'partial' | 'cancelled';
  filledQty: number;
  createdAt: string;
  expiresAt?: string;
}

export interface Trade {
  id: string;
  buyOrderId: string;
  sellOrderId: string;
  assetId: string;
  quantity: number;
  price: number;
  executedAt: string;
}
