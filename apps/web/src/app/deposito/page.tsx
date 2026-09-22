"use client";

import React from 'react';
import styles from './page.module.css';
import { WalletBalance } from '@/components/WalletBalance/WalletBalance';
import { CustodyStatus } from '@/components/CustodyStatus/CustodyStatus';
import { ConciergeServices } from '@/components/ConciergeServices/ConciergeServices';
import { TransactionExtract } from '@/components/TransactionExtract/TransactionExtract';

// Mock Data
const MOCK_CUSTODY = {
  location: "Cofre Apex São Paulo — Zona Sul",
  temperature: 22.4,
  humidity: 45,
  lastInspectionDate: "15/09/2026",
  inspectionSignature: "0x8F4A...B91C",
  insuranceValue: 8500000.00,
  insurancePolicy: "APX-2026-9938"
};

const MOCK_SERVICES = [
  {
    id: "s1",
    title: "Exibição em Museu",
    description: "Autorizar transporte para a exposição 'Lendas Italianas' no MAC-USP.",
    actionLabel: "Autorizar",
    yieldExtra: "1.2%",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
  },
  {
    id: "s2",
    title: "Editorial & Filmagens",
    description: "Cessão do ativo para editorial da revista Quatro Rodas (3 dias).",
    actionLabel: "Ver Proposta",
    yieldExtra: "0.8%",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
  },
  {
    id: "s3",
    title: "Manutenção Preventiva",
    description: "Revisão programada (Troca de fluidos e inspeção técnica).",
    actionLabel: "Agendar",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
  }
];

const MOCK_TRANSACTIONS = [
  { id: "tx1", date: "21 Set 2026, 14:32", description: "Venda - Ferrari F40", amount: 17100.00, type: 'in' as const, status: 'completed' as const },
  { id: "tx2", date: "19 Set 2026, 09:15", description: "Compra - Porsche 911 GT3", amount: -45000.00, type: 'out' as const, status: 'completed' as const },
  { id: "tx3", date: "18 Set 2026, 16:40", description: "TED Recebida", amount: 100000.00, type: 'in' as const, status: 'completed' as const },
  { id: "tx4", date: "10 Set 2026, 11:00", description: "Taxa de Custódia", amount: -150.00, type: 'out' as const, status: 'completed' as const },
];

export default function DepositoPage() {
  return (
    <main className={styles.main}>
      <div className={styles.scrollArea}>
        <h1 className={styles.pageTitle}>Apex Concierge</h1>
        <p className={styles.pageSubtitle}>Gestão de Patrimônio & Custódia</p>

        <WalletBalance balance={125430.50} />
        
        <CustodyStatus data={MOCK_CUSTODY} />
        
        <ConciergeServices services={MOCK_SERVICES} />
        
        <TransactionExtract transactions={MOCK_TRANSACTIONS} />
      </div>
    </main>
  );
}
