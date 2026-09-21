"use client";

import React, { useState } from 'react';
import styles from './PortfolioHero.module.css';

interface PortfolioHeroProps {
  netWorth: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
  accumulatedYield: number;
}

export const PortfolioHero = ({
  netWorth,
  unrealizedGain,
  unrealizedGainPercent,
  accumulatedYield,
}: PortfolioHeroProps) => {
  const [activeTab, setActiveTab] = useState('1A');

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);

  return (
    <div className={styles.container}>
      <div className={styles.statusTicker}>
        <div className={styles.statusText}>
          <div className={styles.statusDot} />
          Custódia Criptográfica Ativa
        </div>
        <div className={styles.statusBadge}>MULTI-SIG APEX</div>
      </div>

      <div className={`glass-card ${styles.heroCard}`}>
        <div>
          <div className={styles.netWorthLabel}>Patrimônio Líquido</div>
          <div className={`${styles.netWorthValue} tabular-nums`}>
            {formatCurrency(netWorth)}
          </div>
        </div>

        <div className={styles.metricsGrid}>
          <div>
            <div className={styles.metricLabel}>Ganho Não Realizado</div>
            <div className={`${styles.metricValue} ${styles.positive} tabular-nums`}>
              +{formatCurrency(unrealizedGain)} (+{unrealizedGainPercent}%)
            </div>
          </div>
          <div>
            <div className={styles.metricLabel}>Rendimentos Acumulados</div>
            <div className={`${styles.metricValue} tabular-nums`}>
              {formatCurrency(accumulatedYield)}
            </div>
          </div>
        </div>

        <div className={styles.chartSection}>
          <div className={styles.chartTabs}>
            {['1M', '6M', '1A', 'MAX'].map((tab) => (
              <button
                key={tab}
                className={`${styles.chartTab} ${activeTab === tab ? styles.chartTabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className={styles.chartPlaceholder}>
            <svg viewBox="0 0 300 80" preserveAspectRatio="none" className={styles.sparkline}>
              {/* Fake sparkline path */}
              <path d="M0,70 Q30,60 60,65 T120,40 T180,50 T240,20 T300,10" />
              {/* Area under curve */}
              <path 
                d="M0,70 Q30,60 60,65 T120,40 T180,50 T240,20 T300,10 L300,80 L0,80 Z" 
                fill="url(#gradient)" 
                stroke="none" 
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(242, 202, 80, 0.2)" />
                  <stop offset="100%" stopColor="rgba(242, 202, 80, 0)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
