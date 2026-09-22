import React from 'react';
import styles from './ConciergeServices.module.css';

interface Service {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  yieldExtra?: string;
  icon: React.ReactNode;
}

interface ConciergeServicesProps {
  services: Service[];
}

export const ConciergeServices: React.FC<ConciergeServicesProps> = ({ services }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Solicitações Concierge</h3>
      <div className={styles.list}>
        {services.map((service) => (
          <div key={service.id} className={styles.card}>
            <div className={styles.iconBox}>{service.icon}</div>
            <div className={styles.info}>
              <h4 className={styles.serviceTitle}>{service.title}</h4>
              <p className={styles.serviceDesc}>{service.description}</p>
              {service.yieldExtra && (
                <span className={styles.yieldBadge}>+{service.yieldExtra} Yield</span>
              )}
            </div>
            <button className={styles.actionBtn}>{service.actionLabel}</button>
          </div>
        ))}
      </div>
    </div>
  );
};
