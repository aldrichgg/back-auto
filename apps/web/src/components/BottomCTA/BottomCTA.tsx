import React from 'react';
import styles from './BottomCTA.module.css';

interface BottomCTAProps {
  label: string;
  onClick?: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ label, onClick }) => {
  return (
    <div className={styles.ctaContainer}>
      <button className={styles.ctaButton} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};
