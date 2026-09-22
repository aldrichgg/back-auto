"use client";

import React, { useState } from 'react';
import styles from './CandlestickChart.module.css';

const PERIODS = ['24H', '7D', '30D', 'TUDO'];

interface Candle {
  high: number;
  low: number;
  open: number;
  close: number;
}

export const CandlestickChart: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState('24H');

  // Randomize some mock data for the chart depending on the period
  const candles: Candle[] = Array.from({ length: 24 }).map(() => {
    const base = 8000 + Math.random() * 1000;
    const isBull = Math.random() > 0.5;
    const open = isBull ? base : base + Math.random() * 200;
    const close = isBull ? open + Math.random() * 200 : open - Math.random() * 200;
    const high = Math.max(open, close) + Math.random() * 50;
    const low = Math.min(open, close) - Math.random() * 50;
    return { high, low, open, close };
  });

  const minPrice = Math.min(...candles.map(c => c.low));
  const maxPrice = Math.max(...candles.map(c => c.high));
  const range = maxPrice - minPrice;

  return (
    <div className={styles.chartContainer}>
      <div className={styles.header}>
        <div className={styles.title}>Gráfico de Preço</div>
        <div className={styles.periodSelector}>
          {PERIODS.map(p => (
            <button 
              key={p} 
              className={`${styles.periodBtn} ${activePeriod === p ? styles.active : ''}`}
              onClick={() => setActivePeriod(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chartArea}>
        {/* Y Axis Grid lines */}
        <div className={styles.gridLines}>
          <div className={styles.gridLine}><span className={styles.yLabel}>R$ {(maxPrice).toFixed(0)}</span></div>
          <div className={styles.gridLine}><span className={styles.yLabel}>R$ {(minPrice + range * 0.5).toFixed(0)}</span></div>
          <div className={styles.gridLine}><span className={styles.yLabel}>R$ {(minPrice).toFixed(0)}</span></div>
        </div>

        {/* Candles */}
        <div className={styles.candlesWrapper}>
          {candles.map((candle, idx) => {
            const isBull = candle.close >= candle.open;
            
            // Calculate percentages for positioning (0% is bottom, 100% is top)
            const topPct = ((candle.high - minPrice) / range) * 100;
            const bottomPct = ((candle.low - minPrice) / range) * 100;
            const bodyTopPct = ((Math.max(candle.open, candle.close) - minPrice) / range) * 100;
            const bodyBottomPct = ((Math.min(candle.open, candle.close) - minPrice) / range) * 100;

            return (
              <div key={idx} className={styles.candleGroup}>
                {/* Wick */}
                <div 
                  className={`${styles.wick} ${isBull ? styles.bullWick : styles.bearWick}`}
                  style={{
                    bottom: `${bottomPct}%`,
                    height: `${topPct - bottomPct}%`
                  }}
                />
                {/* Body */}
                <div 
                  className={`${styles.body} ${isBull ? styles.bullBody : styles.bearBody}`}
                  style={{
                    bottom: `${bodyBottomPct}%`,
                    height: `${Math.max(0.5, bodyTopPct - bodyBottomPct)}%`
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
