import React from 'react';
import styles from './page.module.css';
import { CandlestickChart } from '@/components/CandlestickChart/CandlestickChart';
import { Orderbook } from '@/components/AdminTerminal/Orderbook';
import { NetworkTelemetry } from '@/components/AdminTerminal/NetworkTelemetry';

export default function TerminalPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Terminal de Operações</h1>
          <p className={styles.subtitle}>Mercado Secundário e Telemetria em Tempo Real</p>
        </div>
        
        <div className={styles.assetSelector}>
          <select className={styles.select}>
            <option value="F40-TK">F40-TK (Ferrari F40)</option>
            <option value="GT3-TK">GT3-TK (Porsche 911)</option>
            <option value="P1-TK">P1-TK (McLaren P1)</option>
          </select>
          <div className={styles.assetPrice}>
            <span className={styles.priceValue}>R$ 1.500,00</span>
            <span className={styles.priceChange}>+2.4%</span>
          </div>
        </div>
      </header>

      <div className={styles.terminalLayout}>
        <div className={styles.chartSection}>
          <CandlestickChart />
        </div>
        
        <div className={styles.sideSection}>
          <Orderbook />
          <NetworkTelemetry />
        </div>
      </div>
    </div>
  );
}
