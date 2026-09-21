import React from 'react';
import styles from './PortfolioAssetCard.module.css';

interface PortfolioAssetCardProps {
  id: string;
  name: string;
  year: number;
  imageUrl: string;
  fractionsOwned: number;
  entryPrice: number;
  currentPrice: number;
}

export const PortfolioAssetCard = ({
  name,
  year,
  imageUrl,
  fractionsOwned,
  entryPrice,
  currentPrice,
}: PortfolioAssetCardProps) => {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(val);

  const profitLoss = (currentPrice - entryPrice) * fractionsOwned;
  const profitLossPercent = ((currentPrice - entryPrice) / entryPrice) * 100;
  const isPositive = profitLoss >= 0;

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={name} className={styles.thumbnail} />
        <div className={styles.titleArea}>
          <h3 className={styles.title}>{name} &middot; {year}</h3>
          <span className={styles.fractions}>
            <span className={styles.highlight}>{fractionsOwned}</span> cotas em custódia
          </span>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.metricsRow}>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>Preço de Entrada</span>
            <span className={`${styles.metricValue} tabular-nums`}>{formatCurrency(entryPrice)}</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>Preço Atual</span>
            <span className={`${styles.metricValue} tabular-nums`}>{formatCurrency(currentPrice)}</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>Resultado</span>
            <span className={`${styles.metricValue} ${isPositive ? styles.positive : styles.negative} tabular-nums`}>
              {isPositive ? '+' : ''}{formatCurrency(profitLoss)} ({isPositive ? '+' : ''}{profitLossPercent.toFixed(1)}%)
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.sellButton}>Vender no Mercado</button>
        </div>
      </div>
    </article>
  );
};
