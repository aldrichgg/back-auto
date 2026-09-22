"use client";

import React from 'react';
import styles from './page.module.css';
import { PortfolioHeader } from '@/components/PortfolioHeader/PortfolioHeader';
import { PortfolioHero } from '@/components/PortfolioHero/PortfolioHero';
import { PortfolioAssetCard } from '@/components/PortfolioAssetCard/PortfolioAssetCard';
import { usePortfolio, useUser } from '@/lib/hooks/useApi';

export default function PortfolioPage() {
  const { portfolio, isLoading: isPortfolioLoading } = usePortfolio();
  const { user, isLoading: isUserLoading } = useUser();

  if (isUserLoading || isPortfolioLoading) {
    return <div className={styles.container}><p style={{color: 'white', textAlign: 'center', marginTop: '2rem'}}>Carregando...</p></div>;
  }

  const activeUser = user || { fullName: 'Usuário', avatarUrl: null };
  const pData = portfolio || { assets: [], netWorth: 0, unrealizedGain: 0, unrealizedGainPercent: 0, accumulatedYield: 0 };

  return (
    <div className={styles.container}>
      <PortfolioHeader name={activeUser.fullName} avatarUrl={activeUser.avatarUrl} />
      
      <PortfolioHero 
        netWorth={pData.netWorth}
        unrealizedGain={pData.unrealizedGain}
        unrealizedGainPercent={pData.unrealizedGainPercent}
        accumulatedYield={pData.accumulatedYield}
      />

      <div className={styles.assetsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Ativos em Custódia</h2>
          <span className={styles.sectionCount}>{pData.assets.length} ativos</span>
        </div>

        <div className={styles.assetsList}>
          {pData.assets.length === 0 ? (
            <p style={{ color: 'var(--color-on-surface-variant)', textAlign: 'center', marginTop: '1rem' }}>
              Seu portfólio está vazio.
            </p>
          ) : (
            pData.assets.map((asset: any) => (
              <PortfolioAssetCard key={asset.id} {...asset} />
            ))
          )}
        </div>
      </div>

      <div className={styles.yieldsSection}>
        <div className={styles.yieldsCard}>
          <div className={styles.yieldsHeader}>
            <h3 className={styles.yieldsTitle}>Últimos Rendimentos</h3>
            <a href="#" className={styles.yieldsLink}>Ver Histórico Completo</a>
          </div>

          <div className={styles.yieldHistory}>
            {/* Mantido estático temporariamente, idealmente viria de um useYieldHistory() */}
            <div className={styles.yieldItem}>
              <div className={styles.yieldItemInfo}>
                <span className={styles.yieldItemDesc}>Locação: Exposição Museu Petersen (F40)</span>
                <span className={styles.yieldItemDate}>15 Setembro 2026</span>
              </div>
              <span className={`${styles.yieldItemValue} tabular-nums`}>+ R$ 840,00</span>
            </div>
            
            <div className={styles.yieldItem}>
              <div className={styles.yieldItemInfo}>
                <span className={styles.yieldItemDesc}>Cessão p/ Filmagem Netflix (GT3)</span>
                <span className={styles.yieldItemDate}>28 Agosto 2026</span>
              </div>
              <span className={`${styles.yieldItemValue} tabular-nums`}>+ R$ 1.250,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
