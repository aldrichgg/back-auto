import React from 'react';
import styles from './KnowledgeBase.module.css';

const items = [
  { id: 1, type: 'faq', title: 'Perguntas Frequentes', subtitle: 'Custódia, Tributação e Liquidez', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  { id: 2, type: 'video', title: 'Apex Masterclass', subtitle: 'Vídeos explicativos sobre mercado secundário', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg> },
  { id: 3, type: 'doc', title: 'Regulamentos Oficiais', subtitle: 'Manuais e Termos de Custódia Apex', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> }
];

export const KnowledgeBase: React.FC = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.headerTitle}>Base de Conhecimento</h3>
      <div className={styles.list}>
        {items.map(item => (
          <div key={item.id} className={styles.item}>
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.info}>
              <h4 className={styles.title}>{item.title}</h4>
              <span className={styles.subtitle}>{item.subtitle}</span>
            </div>
            <div className={styles.arrow}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
