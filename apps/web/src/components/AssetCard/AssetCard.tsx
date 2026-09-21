import React from 'react';
import styles from './AssetCard.module.css';

interface AssetCardProps {
  id: string;
  name: string;
  year: number;
  vin: string;
  pricePerFraction: number;
  yieldExpected: number;
  progressPercent: number;
  spotsRemaining: number;
  status: 'IPO_LIVE' | 'VERIFIED' | 'SOLD';
  imageUrl: string;
}

export const AssetCard = ({
  name,
  year,
  vin,
  pricePerFraction,
  yieldExpected,
  progressPercent,
  spotsRemaining,
  status,
  imageUrl,
}: AssetCardProps) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(pricePerFraction);

  const formattedYield = new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(yieldExpected / 100);

  return (
    <article className={`${styles.card} glass-card`}>
      <div className={styles.imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={`${name} ${year}`} className={styles.image} />
        <div className={styles.badgeContainer}>
          {status === 'IPO_LIVE' && (
            <span className={`${styles.badge} ${styles.badgeIpo}`}>IPO LIVE</span>
          )}
          {status === 'VERIFIED' && (
            <span className={`${styles.badge} ${styles.badgeVerified}`}>CERTIFICADO</span>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{name} &middot; {year}</h3>
          <span className={`${styles.vin} tabular-nums`}>VIN {vin}</span>
        </div>

        <div className={styles.metrics}>
          <div>
            <div className={styles.priceLabel}>Fração (Cota)</div>
            <div className={`${styles.priceValue} tabular-nums`}>{formattedPrice}</div>
          </div>
          <div className={styles.yield}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
            Yield {formattedYield} a.a.
          </div>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }} 
            />
          </div>
          <div className={styles.progressDetails}>
            <span>Captação: <span className={styles.highlight}>{progressPercent}%</span></span>
            <span>Restam {spotsRemaining} cotas</span>
          </div>
        </div>
      </div>
    </article>
  );
};
