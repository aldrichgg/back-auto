import React from 'react';
import styles from './RegulatoryDocs.module.css';

interface DocItem {
  id: string;
  title: string;
  date: string;
}

interface RegulatoryDocsProps {
  documents: DocItem[];
}

export const RegulatoryDocs: React.FC<RegulatoryDocsProps> = ({ documents }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Documentos Regulatórios</h3>
      
      <div className={styles.list}>
        {documents.map(doc => (
          <div key={doc.id} className={styles.docItem}>
            <div className={styles.iconBox}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <div className={styles.info}>
              <div className={styles.docTitle}>{doc.title}</div>
              <div className={styles.docDate}>{doc.date}</div>
            </div>
            <button className={styles.downloadBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
