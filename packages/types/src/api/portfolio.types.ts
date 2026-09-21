export interface Holding {
  id: string;
  userId: string;
  assetId: string;
  quantity: number;
  avgCost: number;
  acquiredAt: string;
}

export interface PortfolioSummary {
  netWorth: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
  accumulatedYield: number;
  holdings: Holding[];
}
