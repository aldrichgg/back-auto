import React from 'react';
import styles from './MarketHeader.module.css';

interface MarketHeaderProps {
  assetName: string;
  side: 'buy' | 'sell';
  onSideChange: (side: 'buy' | 'sell') => void;
}

export const MarketHeader: React.FC<MarketHeaderProps> = ({ assetName, side, onSideChange }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.topRow}>
        <button className={styles.backButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className={styles.assetSelector}>
          <span className={styles.assetName}>{assetName}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <button className={styles.iconButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </button>
      </div>

      <div className={styles.toggleContainer}>
        <button 
          className={`${styles.toggleBtn} ${side === 'buy' ? styles.buyActive : ''}`}
          onClick={() => onSideChange('buy')}
        >
          COMPRAR
        </button>
        <button 
          className={`${styles.toggleBtn} ${side === 'sell' ? styles.sellActive : ''}`}
          onClick={() => onSideChange('sell')}
        >
          VENDER
        </button>
      </div>
    </div>
  );
};
