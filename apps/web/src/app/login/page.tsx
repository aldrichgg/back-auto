import React from 'react';
import styles from './page.module.css';
import { AuthHeader } from '@/components/AuthHeader/AuthHeader';
import { LoginForm } from '@/components/LoginForm/LoginForm';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <AuthHeader />
        <LoginForm />
      </div>

      <footer className={styles.footer}>
        <div className={styles.securityBadges}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          SSL 256-bit
        </div>
        <span className={styles.dot}>•</span>
        <div className={styles.securityBadges}>
          CVM 175
        </div>
        <span className={styles.dot}>•</span>
        <div className={styles.securityBadges}>
          Dados Segregados
        </div>
      </footer>
    </div>
  );
}
