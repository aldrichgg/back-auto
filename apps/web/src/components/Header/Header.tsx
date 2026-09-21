"use client";

import React from 'react';
import styles from './Header.module.css';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();
  
  if (pathname === '/portfolio') return null;

  return (
    <header className={styles.header}>
      <button className={styles.iconButton} aria-label="Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <div className={styles.logo}>
        <div className={styles.logoIcon}>A</div>
        APEX
      </div>

      <div className={styles.actions}>
        <button className={`${styles.iconButton} ${styles.notificationBadge}`} aria-label="Notificações">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className={styles.badge}></span>
        </button>
      </div>
    </header>
  );
};
