'use client';

import React, { useState } from 'react';
import styles from './layout.module.css';
import { AdminSidebar } from '@/components/AdminSidebar/AdminSidebar';
import { AdminTopbar } from '@/components/AdminTopbar/AdminTopbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className={styles.mainWrapper}>
        <AdminTopbar onMenuClick={toggleSidebar} />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
      
      {/* Overlay para mobile quando a sidebar está aberta */}
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}
