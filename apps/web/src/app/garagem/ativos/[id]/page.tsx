"use client";

import React from 'react';
import styles from './page.module.css';
import { AssetGallery } from '@/components/AssetGallery/AssetGallery';
import { AssetMetrics } from '@/components/AssetMetrics/AssetMetrics';
import { ProvenanceTimeline } from '@/components/ProvenanceTimeline/ProvenanceTimeline';
import { AssetTabs } from '@/components/AssetTabs/AssetTabs';
import { BottomCTA } from '@/components/BottomCTA/BottomCTA';
import Link from 'next/link';

export default function AssetDetailsPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _id = params.id;
  // Mock data for the specific asset (Ferrari F40)
  const mockImages = [
    'https://images.unsplash.com/photo-1592853625511-adbc62214b6d?auto=format&fit=crop&q=80&w=800&h=600',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800&h=600',
    'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=800&h=600'
  ];

  const mockTimeline = [
    { year: '1992', title: 'Fabricação', description: 'Produzida em Maranello, finalizada em Rosso Corsa. Destinada ao mercado europeu.' },
    { year: '2005', title: 'Certificação Ferrari Classiche', description: 'Inspecionada e certificada pela própria Ferrari, garantindo originalidade de motor e chassi.' },
    { year: '2023', title: 'Aquisição Apex', description: 'Comprada em leilão fechado na Suíça e importada sob regime especial para custódia.' }
  ];

  const mockTechnical = {
    'Motor': 'V8 2.9L Bi-Turbo',
    'Potência': '478 cv',
    'Câmbio': 'Manual 5 marchas',
    'Quilometragem': '12.450 km',
    'Cor Externa': 'Rosso Corsa',
    'Cor Interna': 'Nero (Alcantara)'
  };

  const mockDocuments = [
    { title: 'Certificado Ferrari Classiche', type: 'PDF • 2.4 MB', url: '#' },
    { title: 'Laudo Cautelar Apex', type: 'PDF • 5.1 MB', url: '#' },
    { title: 'Contrato de Custódia', type: 'PDF • 1.2 MB', url: '#' }
  ];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        </Link>
        <div className={styles.headerActions}>
          <button className={styles.iconButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button className={styles.iconButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>
      </header>

      <AssetGallery images={mockImages} />

      <div className={styles.content}>
        <div className={styles.badgeRow}>
          <div className={styles.badge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>VERIFICADO · ORIG. HISTÓRICA CERTIFICADA</span>
          </div>
        </div>

        <h1 className={styles.title}>Ferrari F40 · 1992</h1>
        
        <div className={styles.vinWrapper}>
          <span className={styles.vinLabel}>VIN / CHASSI</span>
          <span className={styles.vinValue}>ZFFGJ34B000085***</span>
        </div>
      </div>

      <AssetMetrics 
        price="R$ 8.500"
        totalFractions={100}
        availableFractions={12}
        yieldTarget="14,2%"
        term="36 meses"
      />

      <ProvenanceTimeline events={mockTimeline} />

      <AssetTabs technicalData={mockTechnical} documents={mockDocuments} />

      <BottomCTA label="Comprar Cotas — R$ 8.500/cota" />
    </main>
  );
}
