"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import { MarketHeader } from '@/components/MarketHeader/MarketHeader';
import { OrderBook } from '@/components/OrderBook/OrderBook';
import { CandlestickChart } from '@/components/CandlestickChart/CandlestickChart';
import { OrderForm } from '@/components/OrderForm/OrderForm';
import { TradeHistory } from '@/components/TradeHistory/TradeHistory';

// Mock Data
const MOCK_SELL_ORDERS = [
  { price: 8550.00, amount: 2, total: 17100.00, type: 'sell' as const },
  { price: 8540.00, amount: 5, total: 42700.00, type: 'sell' as const },
  { price: 8520.00, amount: 1, total: 8520.00, type: 'sell' as const },
  { price: 8510.00, amount: 10, total: 85100.00, type: 'sell' as const },
];

const MOCK_BUY_ORDERS = [
  { price: 8490.00, amount: 3, total: 25470.00, type: 'buy' as const },
  { price: 8480.00, amount: 12, total: 101760.00, type: 'buy' as const },
  { price: 8450.00, amount: 4, total: 33800.00, type: 'buy' as const },
  { price: 8400.00, amount: 20, total: 168000.00, type: 'buy' as const },
];

const MOCK_TRADES = [
  { time: '14:32:05', price: 8500.00, amount: 2, type: 'buy' as const },
  { time: '14:31:12', price: 8500.00, amount: 1, type: 'sell' as const },
  { time: '14:28:45', price: 8490.00, amount: 5, type: 'sell' as const },
  { time: '14:25:33', price: 8510.00, amount: 10, type: 'buy' as const },
  { time: '14:20:10', price: 8510.00, amount: 3, type: 'buy' as const },
];

export default function MercadoPage() {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');

  return (
    <main className={styles.main}>
      <MarketHeader 
        assetName="Ferrari F40" 
        side={side} 
        onSideChange={setSide} 
      />

      <div className={styles.scrollArea}>
        <CandlestickChart />
        
        <OrderBook 
          buyOrders={MOCK_BUY_ORDERS} 
          sellOrders={MOCK_SELL_ORDERS.reverse()} 
          currentPrice={8500.00} 
        />
        
        <OrderForm side={side} />
        
        <TradeHistory trades={MOCK_TRADES} />
      </div>
    </main>
  );
}
