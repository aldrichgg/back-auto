"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNav.module.css';

const NAV_ITEMS = [
  { id: 'garagem', label: 'Garagem', href: '/garagem', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
  )},
  { id: 'portfolio', label: 'Portfólio', href: '/portfolio', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
  )},
  { id: 'mercado', label: 'Mercado', href: '/mercado', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
  )},
  { id: 'deposito', label: 'Depósito', href: '/deposito', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  )},
  { id: 'perfil', label: 'Perfil', href: '/perfil', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  )},
];

export const BottomNav = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/garagem/ativos/')) return null;

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {NAV_ITEMS.map((item) => {
          // simple active check
          const isActive = pathname === item.href || (pathname === '/' && item.id === 'garagem');
          
          return (
            <Link key={item.id} href={item.href} className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
              {item.icon}
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
