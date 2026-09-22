import React from 'react';
import styles from './CustodyStatus.module.css';

interface CustodyData {
  location: string;
  temperature: number;
  humidity: number;
  lastInspectionDate: string;
  inspectionSignature: string;
  insuranceValue: number;
  insurancePolicy: string;
}

interface CustodyStatusProps {
  data: CustodyData;
}

export const CustodyStatus: React.FC<CustodyStatusProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Status de Custódia Física</h3>
      
      <div className={styles.grid}>
        <div className={styles.item}>
          <span className={styles.label}>Localização</span>
          <span className={styles.value}>{data.location}</span>
        </div>
        
        <div className={styles.item}>
          <span className={styles.label}>Ambiente (Temp / Umidade)</span>
          <span className={styles.valueTelemetry}>
            {data.temperature}°C <span className={styles.separator}>|</span> {data.humidity}%
          </span>
        </div>

        <div className={styles.item}>
          <span className={styles.label}>Última Inspeção</span>
          <div className={styles.inspectionWrapper}>
            <span className={styles.value}>{data.lastInspectionDate}</span>
            <span className={styles.signatureBadge}>Assinado: {data.inspectionSignature}</span>
          </div>
        </div>

        <div className={styles.item}>
          <span className={styles.label}>Seguro Ativo (Apólice {data.insurancePolicy})</span>
          <span className={styles.valueCurrency}>
            R$ {data.insuranceValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};
