import React from 'react';
import styles from './AssetGallery.module.css';

interface AssetGalleryProps {
  images: string[];
}

export const AssetGallery: React.FC<AssetGalleryProps> = ({ images }) => {
  return (
    <div className={styles.gallery}>
      <div className={styles.imageScroll}>
        {images.map((src, idx) => (
          <div key={idx} className={styles.imageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Asset view ${idx + 1}`} className={styles.image} />
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {images.map((_, idx) => (
          <div key={idx} className={`${styles.dot} ${idx === 0 ? styles.active : ''}`} />
        ))}
      </div>
    </div>
  );
};
