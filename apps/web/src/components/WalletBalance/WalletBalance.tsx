import React from 'react';
import styles from './WalletBalance.module.css';

interface WalletBalanceProps {
  balance: number;
}

export const WalletBalance: React.FC<WalletBalanceProps> = ({ balance }) => {
  return (
    <div className={styles.container}>
      <div className={styles.balanceHeader}>Saldo em Conta</div>
      <div className={styles.balanceValue}>
        <span className={styles.currency}>R$</span> 
        {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>

      <div className={styles.actionGrid}>
        <button className={styles.actionBtn}>
          <div className={styles.iconWrapper}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <span className={styles.actionLabel}>Depositar</span>
        </button>
        <button className={styles.actionBtn}>
          <div className={styles.iconWrapper}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <span className={styles.actionLabel}>Retirar</span>
        </button>
        <button className={styles.actionBtn}>
          <div className={styles.iconWrapper}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <span className={styles.actionLabel}>TED / PIX</span>
        </button>
      </div>
    </div>
  );
};
