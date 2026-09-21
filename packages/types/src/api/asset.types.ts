export interface Asset {
  id: string;
  vin: string;
  name: string;
  year: number;
  color?: string;
  status: 'draft' | 'ipo' | 'secondary' | 'sold';
  totalFractions: number;
  fractionPrice: number;
  yieldTarget?: number;
  investmentTerm?: number;
  custodyLocation?: string;
  createdAt: string;
}
