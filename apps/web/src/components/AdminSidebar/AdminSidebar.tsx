import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminSidebar.module.css';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuGroups = [
  {
    section: '1. NÚCLEO MASTER',
    items: [
      { label: 'Visão Geral', href: '/admin', tag: 'ROOT', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
      { label: 'Gestão de Usuários', href: '/admin/usuarios', tag: 'RBAC', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    ],
  },
  {
    section: '2. OPERAÇÕES & MERCADO',
    items: [
      { label: 'Terminal de Operações', href: '/admin/terminal', tag: 'LIVE', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
      { label: 'Gestão de Drops', href: '/admin/drops', tag: 'IPO', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
    ],
  },
  {
    section: '3. ATIVOS & VEÍCULOS',
    items: [
      { label: 'Catálogo de Carros', href: '/admin/catalogo', tag: 'VAULT', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2" ry="2"/></svg> },
      { label: 'Custódia Física', href: '/admin/custodia', tag: 'BUNKER', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> },
    ],
  },
  {
    section: '4. TESOURARIA & GOVERNANÇA',
    items: [
      { label: 'Lucros & Taxas', href: '/admin/lucros', tag: 'DRE', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
      { label: 'Mesa Compliance', href: '/admin/compliance', tag: 'CVM', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> },
    ],
  },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>A</span>
          <span className={styles.logoText}>APEX <span className={styles.logoHighlight}>MASTER</span></span>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div className={styles.accessLevel}>
        <span className={styles.accessLevelLabel}>NÍVEL DE ACESSO</span>
        <span className={styles.accessLevelValue}>SUPERADMIN ROOT</span>
      </div>

      <nav className={styles.nav}>
        {menuGroups.map((group) => (
          <div key={group.section}>
            <span className={styles.navSection}>{group.section}</span>
            {group.items.map((item) => {
              const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} onClick={onClose} className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                  <span className={styles.navTag}>{item.tag}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.hsmBadge}>
          <div className={styles.hsmRow}><span>HARDWARE SECURITY</span><span style={{color:'var(--color-primary)'}}>HSM LVL 5</span></div>
          <div className={styles.hsmRow}><span>SIGNATURE CORE</span><span>P-256 ACTIVE</span></div>
          <div className={styles.hsmRow} style={{borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:'4px', marginTop:'2px'}}><span>BUILD</span><span style={{color:'var(--color-on-surface-variant)'}}>v4.20.0-PROD</span></div>
        </div>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>AV</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Dr. Alexandre Vance</span>
            <span className={styles.userRole}>Chief Admin / MASTER ROOT</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
