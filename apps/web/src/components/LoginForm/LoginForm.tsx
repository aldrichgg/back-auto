"use client";

import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { useRouter } from 'next/navigation';
import { login, persistSession } from '@/lib/api/auth';

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login({ email, password });
      persistSession(response);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.inputGroup}>
          <label className={styles.label}>E-mail Corporativo ou ID</label>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="admin@autoequity.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.labelRow}>
            <label className={styles.label}>Chave de Segurança</label>
            <span className={styles.chipEd25519}>ED25519</span>
          </div>
          <div className={styles.passwordWrapper}>
            <input 
              type={showPassword ? "text" : "password"} 
              className={styles.input} 
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              className={styles.toggleBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
        </div>

        <div className={styles.optionsRow}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} defaultChecked />
            <span>Lembrar dispositivo (30 dias)</span>
          </label>
          <a href="#" className={styles.forgotLink}>Esqueceu a chave?</a>
        </div>

        <button type="submit" className={styles.ctaBtn} disabled={isLoading}>
          <span className={styles.ctaText}>{isLoading ? 'Iniciando...' : 'Iniciar Sessão no Terminal'}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12a10 10 0 1 0-20 0"/><path d="M12 17v-5"/><path d="M12 8h.01"/><path d="M16 14.5a4 4 0 0 0-8 0"/></svg>
        </button>

        <div className={styles.biometricDivider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>ou acesse com</span>
          <span className={styles.dividerLine}></span>
        </div>

        <button type="button" className={styles.bioBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M19 21a2 2 0 0 0 2-2"/><path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/></svg>
          Face ID / Touch ID
        </button>

        <div className={styles.registerPrompt}>
          Ainda não é membro Apex? <a href="/cadastro" className={styles.registerLink}>Solicitar Convite</a>
        </div>
      </form>
    </div>
  );
};
