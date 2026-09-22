import React from 'react';
import styles from './AdminTopbar.module.css';

interface AdminTopbarProps {
  onMenuClick: () => void;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({ onMenuClick }) => {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <span className={styles.title}>Apex Master</span>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className={styles.badge}>3</span>
        </button>
      </div>
    </header>
  );
};
