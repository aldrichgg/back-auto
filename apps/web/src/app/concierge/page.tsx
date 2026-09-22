import React from 'react';
import styles from './page.module.css';
import { AccountManager } from '@/components/AccountManager/AccountManager';
import { ConciergeServicesList } from '@/components/ConciergeServicesList/ConciergeServicesList';
import { KnowledgeBase } from '@/components/KnowledgeBase/KnowledgeBase';
import { SupportChat } from '@/components/SupportChat/SupportChat';

export default function ConciergePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Concierge</h1>
          <span className={styles.badge}>Apex Private</span>
        </div>
      </header>

      <main className={styles.mainContent}>
        <AccountManager />
        <ConciergeServicesList />
        <KnowledgeBase />
        <SupportChat />
      </main>
    </div>
  );
}
