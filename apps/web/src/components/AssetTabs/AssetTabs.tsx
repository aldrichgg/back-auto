"use client";

import React, { useState } from 'react';
import styles from './AssetTabs.module.css';

const TABS = ['Ficha Técnica', 'Documentos', 'Rentabilidade', 'Histórico'];

interface AssetTabsProps {
  technicalData: Record<string, string>;
  documents: Array<{ title: string, type: string, url: string }>;
}

export const AssetTabs: React.FC<AssetTabsProps> = ({ technicalData, documents }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabHeader}>
        {TABS.map((tab, idx) => (
          <button
            key={idx}
            className={`${styles.tabButton} ${activeTab === idx ? styles.active : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        {activeTab === 0 && (
          <div className={styles.technicalData}>
            {Object.entries(technicalData).map(([key, value]) => (
              <div key={key} className={styles.dataRow}>
                <span className={styles.dataKey}>{key}</span>
                <span className={styles.dataValue}>{value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 1 && (
          <div className={styles.documents}>
            {documents.map((doc, idx) => (
              <a key={idx} href={doc.url} className={styles.documentCard}>
                <div className={styles.docIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div className={styles.docInfo}>
                  <span className={styles.docTitle}>{doc.title}</span>
                  <span className={styles.docType}>{doc.type}</span>
                </div>
                <div className={styles.docDownload}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Mocks for other tabs */}
        {activeTab === 2 && <p className={styles.placeholder}>Informações de rentabilidade projetada.</p>}
        {activeTab === 3 && <p className={styles.placeholder}>Histórico de leilões e eventos.</p>}
      </div>
    </div>
  );
};
