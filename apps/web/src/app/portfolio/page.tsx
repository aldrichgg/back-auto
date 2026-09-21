import React from 'react';
import styles from './page.module.css';
import { PortfolioHeader } from '@/components/PortfolioHeader/PortfolioHeader';
import { PortfolioHero } from '@/components/PortfolioHero/PortfolioHero';
import { PortfolioAssetCard } from '@/components/PortfolioAssetCard/PortfolioAssetCard';

const MOCK_USER = {
  name: 'Marcus Silva',
  avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256',
  netWorth: 164820.00,
  unrealizedGain: 28430.00,
  unrealizedGainPercent: 20.8,
  accumulatedYield: 3840.00,
};

const MOCK_PORTFOLIO_ASSETS = [
  {
    id: 'f40-1992',
    name: 'Ferrari F40',
    year: 1992,
    imageUrl: 'https://images.unsplash.com/photo-1592853625601-bb11b629cb8e?auto=format&fit=crop&q=80&w=600&h=400',
    fractionsOwned: 10,
    entryPrice: 8500,
    currentPrice: 9400, // Gain
  },
  {
    id: 'gt3-2018',
    name: 'Porsche 911 GT3 RS',
    year: 2018,
    imageUrl: 'https://images.unsplash.com/photo-1503376712344-6a0c20165e63?auto=format&fit=crop&q=80&w=600&h=400',
    fractionsOwned: 5,
    entryPrice: 5200,
    currentPrice: 5050, // Slight Loss
  }
];

export default function PortfolioPage() {
  return (
    <div className={styles.container}>
      <PortfolioHeader name={MOCK_USER.name} avatarUrl={MOCK_USER.avatarUrl} />
      
      <PortfolioHero 
        netWorth={MOCK_USER.netWorth}
        unrealizedGain={MOCK_USER.unrealizedGain}
        unrealizedGainPercent={MOCK_USER.unrealizedGainPercent}
        accumulatedYield={MOCK_USER.accumulatedYield}
      />

      <div className={styles.assetsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Ativos em Custódia</h2>
          <span className={styles.sectionCount}>2 ativos</span>
        </div>

        <div className={styles.assetsList}>
          {MOCK_PORTFOLIO_ASSETS.map((asset) => (
            <PortfolioAssetCard key={asset.id} {...asset} />
          ))}
        </div>
      </div>

      <div className={styles.yieldsSection}>
        <div className={styles.yieldsCard}>
          <div className={styles.yieldsHeader}>
            <h3 className={styles.yieldsTitle}>Últimos Rendimentos</h3>
            <a href="#" className={styles.yieldsLink}>Ver Histórico Completo</a>
          </div>

          <div className={styles.yieldHistory}>
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
