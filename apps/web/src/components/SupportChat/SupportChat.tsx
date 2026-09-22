import React from 'react';
import styles from './SupportChat.module.css';

export const SupportChat: React.FC = () => {
  return (
    <div className={styles.container}>
      
      <div className={styles.chatAction}>
        <div className={styles.chatIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div className={styles.chatInfo}>
          <h4 className={styles.title}>Chat ao Vivo Apex</h4>
          <span className={styles.subtitle}>Suporte Dedicado 24/7</span>
        </div>
        <button className={styles.chatBtn}>
          Iniciar
        </button>
      </div>

      <div className={styles.historyLink}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span>Ver histórico de solicitações</span>
      </div>

    </div>
  );
};
