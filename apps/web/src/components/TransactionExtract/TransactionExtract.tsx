import React from 'react';
import styles from './TransactionExtract.module.css';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'in' | 'out';
  status: 'completed' | 'pending';
}

interface TransactionExtractProps {
  transactions: Transaction[];
}

export const TransactionExtract: React.FC<TransactionExtractProps> = ({ transactions }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Movimentações Recentes</h3>
      
      <div className={styles.list}>
        {transactions.map((tx) => (
          <div key={tx.id} className={styles.row}>
            <div className={styles.iconCol}>
              {tx.type === 'in' ? (
                <div className={`${styles.icon} ${styles.iconIn}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                </div>
              ) : (
                <div className={`${styles.icon} ${styles.iconOut}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                </div>
              )}
            </div>

            <div className={styles.infoCol}>
              <div className={styles.desc}>{tx.description}</div>
              <div className={styles.date}>{tx.date}</div>
            </div>

            <div className={styles.amountCol}>
              <div className={`${styles.amount} ${tx.type === 'in' ? styles.amountIn : styles.amountOut}`}>
                {tx.type === 'in' ? '+' : '-'} R$ {Math.abs(tx.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className={styles.status}>
                {tx.status === 'completed' ? 'Concluído' : 'Pendente'}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.viewMoreBtn}>Ver extrato completo</button>
    </div>
  );
};
