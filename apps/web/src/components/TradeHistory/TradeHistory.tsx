import React from 'react';
import styles from './TradeHistory.module.css';

interface Trade {
  time: string;
  price: number;
  amount: number;
  type: 'buy' | 'sell';
}

interface TradeHistoryProps {
  trades: Trade[];
}

export const TradeHistory: React.FC<TradeHistoryProps> = ({ trades }) => {
  return (
    <div className={styles.historyContainer}>
      <h3 className={styles.title}>Histórico de Transações</h3>
      
      <div className={styles.headerRow}>
        <span className={styles.colHeader}>Hora</span>
        <span className={styles.colHeaderCenter}>Preço (R$)</span>
        <span className={styles.colHeaderRight}>Qtd</span>
      </div>

      <div className={styles.tradeList}>
        {trades.map((trade, idx) => (
          <div key={idx} className={styles.row}>
            <span className={styles.time}>{trade.time}</span>
            <span className={`${styles.price} ${trade.type === 'buy' ? styles.buyColor : styles.sellColor}`}>
              {trade.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={styles.amount}>{trade.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
