import useSWR from 'swr';
import { fetcher } from '../api/client';

export function useAssets() {
  const { data, error, isLoading, mutate } = useSWR('/assets', fetcher);
  
  return {
    assets: data || [],
    isLoading,
    isError: error,
    mutate
  };
}

export function usePortfolio() {
  const { data, error, isLoading, mutate } = useSWR('/portfolio', fetcher);
  
  return {
    portfolio: data || { assets: [], netWorth: 0, unrealizedGain: 0, unrealizedGainPercent: 0, accumulatedYield: 0 },
    isLoading,
    isError: error,
    mutate
  };
}

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR('/users/me', fetcher);
  
  return {
    user: data,
    isLoading,
    isError: error,
    mutate
  };
}
