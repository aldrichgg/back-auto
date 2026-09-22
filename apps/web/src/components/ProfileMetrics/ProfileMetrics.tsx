import React from 'react';
import styles from './ProfileMetrics.module.css';

interface ProfileMetricsProps {
  totalInvested: number;
  totalYield: number;
  accessTier: string;
  joinDate: string;
}

export const ProfileMetrics: React.FC<ProfileMetricsProps> = ({ totalInvested, totalYield, accessTier, joinDate }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Métricas do Perfil</h3>
      
      <div className={styles.grid}>
        <div className={styles.metricCard}>
          <span className={styles.label}>Total Investido</span>
          <span className={styles.valueMonetary}>
            <span className={styles.currency}>R$</span>
            {totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        
        <div className={styles.metricCard}>
          <span className={styles.label}>Rendimento Histórico</span>
          <span className={styles.valueYield}>
            <span className={styles.currency}>R$</span>
            {totalYield.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.label}>Nível de Acesso</span>
          <span className={styles.valueText}>{accessTier}</span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.label}>Membro Desde</span>
          <span className={styles.valueText}>{joinDate}</span>
        </div>
      </div>
    </div>
  );
};
