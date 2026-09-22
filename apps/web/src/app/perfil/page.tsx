"use client";

import React from 'react';
import styles from './page.module.css';
import { MemberCard } from '@/components/MemberCard/MemberCard';
import { ProfileMetrics } from '@/components/ProfileMetrics/ProfileMetrics';
import { RegulatoryDocs } from '@/components/RegulatoryDocs/RegulatoryDocs';
import { ProfileSettings } from '@/components/ProfileSettings/ProfileSettings';

// Mock Data
const MOCK_DOCS = [
  { id: "d1", title: "Contrato de Custódia Apex", date: "Assinado em 12/05/2026" },
  { id: "d2", title: "Declaração CVM 175", date: "Assinado em 12/05/2026" },
  { id: "d3", title: "DARF de Ganhos de Capital (Jul/26)", date: "Emitido em 01/08/2026" }
];

const MOCK_SETTINGS = [
  {
    id: "g1",
    title: "Conta",
    items: [
      {
        id: "s1",
        label: "Dados Pessoais (KYC)",
        description: "Atualize sua identidade e comprovantes",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      },
      {
        id: "s2",
        label: "Segurança",
        description: "2FA, Biometria e Chaves de Acesso",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      }
    ]
  },
  {
    id: "g2",
    title: "Preferências",
    items: [
      {
        id: "s3",
        label: "Notificações",
        description: "Push, Email e Alertas SMS",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      },
      {
        id: "s4",
        label: "Idioma e Moeda",
        description: "Português (BR) / BRL (R$)",
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      }
    ]
  }
];

export default function PerfilPage() {
  return (
    <main className={styles.main}>
      <div className={styles.scrollArea}>
        
        <MemberCard 
          name="Rodrigo Almeida"
          category="Membro Apex Select"
          memberId="APX-0982-BR"
          isVerified={true}
        />

        <ProfileMetrics 
          totalInvested={250000.00}
          totalYield={35840.50}
          accessTier="Select Tier 2"
          joinDate="Mai 2026"
        />
        
        <RegulatoryDocs documents={MOCK_DOCS} />
        
        <ProfileSettings groups={MOCK_SETTINGS} />

        <div className={styles.logoutWrapper}>
          <button className={styles.logoutBtn}>Sair da Conta</button>
          <span className={styles.version}>Apex Terminal v1.0.0</span>
        </div>
      </div>
    </main>
  );
}
