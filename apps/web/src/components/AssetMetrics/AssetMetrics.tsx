import React from 'react';
import styles from './AssetMetrics.module.css';

interface AssetMetricsProps {
  price: string;
  totalFractions: number;
  availableFractions: number;
  yieldTarget: string;
  term: string;
}

export const AssetMetrics: React.FC<AssetMetricsProps> = ({
  price,
  totalFractions,
  availableFractions,
  yieldTarget,
  term
}) => {
  const percentCap = ((totalFractions - availableFractions) / totalFractions) * 100;

  return (
    <div className={styles.metricsContainer}>
      <div className={styles.topRow}>
        <div className={styles.priceSection}>
          <span className={styles.label}>Preço da Fração</span>
          <span className={styles.price}>{price}</span>
        </div>
        <div className={styles.yieldSection}>
          <span className={styles.label}>Yield Alvo a.a.</span>
          <span className={styles.yieldValue}>{yieldTarget}</span>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressLabels}>
          <span className={styles.progressPercent}>{percentCap.toFixed(0)}% Captado</span>
          <span className={styles.fractionsLeft}>{availableFractions} cotas restantes</span>
        </div>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{ width: `${percentCap}%` }} />
        </div>
      </div>

      <div className={styles.termSection}>
        <span className={styles.label}>Prazo de Investimento</span>
        <span className={styles.termValue}>{term}</span>
      </div>
    </div>
  );
};
