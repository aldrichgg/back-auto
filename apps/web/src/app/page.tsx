"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import { AssetCard } from '@/components/AssetCard/AssetCard';
import { useAssets } from '@/lib/hooks/useApi';

const CATEGORIES = ['Todos', 'IPO', 'Secundário', 'Clássicos', 'Hipercarros'];

export default function GaragemPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const { assets, isLoading, isError } = useAssets();

  return (
    <div className={styles.container}>
      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input 
          type="text" 
          className={styles.searchInput} 
          placeholder="Buscar chassi, modelo ou fabricante..." 
        />
        <button className={styles.filterButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </button>
      </div>

      {/* Categories Tabs */}
      <div className={styles.tabsContainer}>
        {CATEGORIES.map(category => (
          <button 
            key={category}
            className={`${styles.tab} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div>
        <h2 className={styles.sectionTitle}>
          Em Destaque
          <span className={styles.titleCount}>
            {isLoading ? '...' : `${assets.length} ativos`}
          </span>
        </h2>
        
        <div>
          {isLoading && <p style={{ color: 'var(--color-on-surface-variant)', textAlign: 'center', margin: '20px' }}>Carregando ativos...</p>}
          {isError && <p style={{ color: '#ef4444', textAlign: 'center', margin: '20px' }}>Erro ao carregar ativos.</p>}
          
          {!isLoading && !isError && assets.length === 0 && (
            <p style={{ color: 'var(--color-on-surface-variant)', textAlign: 'center', margin: '20px' }}>
              Nenhum ativo disponível no momento.
            </p>
          )}

          {!isLoading && assets.map((asset: any) => (
            <AssetCard key={asset.id} {...asset} />
          ))}
        </div>
      </div>
    </div>
  );
}
