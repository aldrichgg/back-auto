import React from 'react';
import styles from './page.module.css';
import { RegistrationFlow } from '@/components/RegistrationStepper/RegistrationFlow';
import Link from 'next/link';

export default function CadastroPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/login" className={styles.backBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </Link>
        <div className={styles.headerTitles}>
          <h1 className={styles.title}>Admissão de Membro</h1>
          <p className={styles.subtitle}>Apex Capital</p>
        </div>
        <div className={styles.placeholder}></div>
      </header>

      <RegistrationFlow />
    </div>
  );
}
