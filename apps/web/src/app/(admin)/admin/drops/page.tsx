import React from 'react';
import styles from './page.module.css';
import { DropDataGrid } from '@/components/AdminDrops/DropDataGrid';

export default function DropsPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Gestão de Drops</h1>
          <p className={styles.subtitle}>Ofertas primárias e tokenização de ativos.</p>
        </div>
        <button className={styles.primaryBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Novo Drop
        </button>
      </header>

      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Total Captado</span>
          <span className={styles.kpiValue}>R$ 16,5 Mi</span>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Drops Ativos</span>
          <span className={styles.kpiValue}>1</span>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Próximo Drop</span>
          <span className={styles.kpiValue}>McLaren P1</span>
        </div>
      </div>

      <div className={styles.contentArea}>
        <DropDataGrid />
      </div>
    </div>
  );
}
