import React from 'react';
import styles from './MemberCard.module.css';
import Image from 'next/image';

interface MemberCardProps {
  name: string;
  category: string;
  memberId: string;
  isVerified: boolean;
  avatarUrl?: string;
}

export const MemberCard: React.FC<MemberCardProps> = ({ name, category, memberId, isVerified, avatarUrl }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.avatarWrapper}>
        {avatarUrl ? (
          <Image src={avatarUrl} alt={name} className={styles.avatar} width={48} height={48} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      <div className={styles.info}>
        <div className={styles.nameRow}>
          <h2 className={styles.name}>{name}</h2>
          {isVerified && (
            <div className={styles.verifiedBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-verde-liquidacao)" stroke="var(--color-background)" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
          )}
        </div>
        
        <p className={styles.category}>{category}</p>
        
        <div className={styles.idBox}>
          <span className={styles.idLabel}>MEMBER ID</span>
          <span className={styles.idValue}>{memberId}</span>
        </div>
      </div>
    </div>
  );
};
