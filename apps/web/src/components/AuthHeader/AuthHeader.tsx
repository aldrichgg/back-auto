import React from 'react';
import styles from './AuthHeader.module.css';
import Link from 'next/link';

export const AuthHeader: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </Link>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>A</div>
          <span className={styles.logoText}>APEX</span>
        </div>
        <div className={styles.placeholder}></div>
      </header>

      <div className={styles.badges}>
        <span className={styles.cvmBadge}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Protocolo CVM 175 Ativo
        </span>
      </div>

      <div className={styles.titles}>
        <h1 className={styles.mainTitle}>Autenticação de Membro</h1>
        <p className={styles.subTitle}>Garagem Institucional • Custódia Segregada</p>
      </div>

      <div className={styles.statusBar}>
        <span className={styles.statusLabel}>PORTFÓLIO TOTAL DE MEMBROS</span>
        <span className={styles.statusValue}>R$ 142.850.000,00</span>
      </div>
    </div>
  );
};
