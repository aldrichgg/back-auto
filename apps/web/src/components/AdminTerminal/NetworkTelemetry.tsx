import React from 'react';
import styles from './NetworkTelemetry.module.css';

export const NetworkTelemetry: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Telemetria da Rede</h3>
        <div className={styles.status}>
          <span className={styles.pulseDot}></span>
          <span>Online</span>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Último Bloco</span>
          <span className={styles.metricValue}>#14.285.901</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>TPS (Transações)</span>
          <span className={styles.metricValue}>12.4</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Gas Estimado</span>
          <span className={styles.metricValue}>0.001 MATIC</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>TVL (Total Value Locked)</span>
          <span className={styles.metricValue}>R$ 45,2 Mi</span>
        </div>
      </div>
      
      <div className={styles.logsArea}>
        <div className={styles.logsHeader}>Fluxo Recente</div>
        <div className={styles.logList}>
          <div className={styles.logItem}>
            <span className={styles.logTime}>10:45:02</span>
            <span className={styles.logAction}>COMPRA</span>
            <span className={styles.logDetails}>50 F40-TK @ R$ 1.500</span>
          </div>
          <div className={styles.logItem}>
            <span className={styles.logTime}>10:44:50</span>
            <span className={styles.logAction}>VENDA</span>
            <span className={styles.logDetails}>20 F40-TK @ R$ 1.510</span>
          </div>
          <div className={styles.logItem}>
            <span className={styles.logTime}>10:42:15</span>
            <span className={styles.logAction}>TRANSFER</span>
            <span className={styles.logDetails}>0x8a...3f2 ➔ 0x1b...9c1</span>
          </div>
        </div>
      </div>
    </div>
  );
};
