import React from 'react';
import styles from './ConciergeServicesList.module.css';

const services = [
  {
    id: 1,
    title: 'Exibição em Museus e Feiras',
    desc: 'Monetize seu ativo em eventos de prestígio global.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  },
  {
    id: 2,
    title: 'Cessão para Filmagens e Editoriais',
    desc: 'Aluguel do veículo para produções cinematográficas.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
  },
  {
    id: 3,
    title: 'Transporte Especializado',
    desc: 'Logística segura para leilões ou realocação de custódia.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
  },
  {
    id: 4,
    title: 'Manutenção Preventiva',
    desc: 'Conservação e restauração por especialistas homologados.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
  },
  {
    id: 5,
    title: 'Seguro Apex Lloyd\'s',
    desc: 'Apólice internacional All-Risk com cobertura porta a porta.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  }
];

export const ConciergeServicesList: React.FC = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.headerTitle}>Serviços Concierge</h3>
      <div className={styles.list}>
        {services.map(service => (
          <div key={service.id} className={styles.card}>
            <div className={styles.iconWrapper}>{service.icon}</div>
            <div className={styles.info}>
              <h4 className={styles.title}>{service.title}</h4>
              <p className={styles.desc}>{service.desc}</p>
            </div>
            <div className={styles.action}>
              <button className={styles.requestBtn}>Solicitar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
