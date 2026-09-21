"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import { AssetCard } from '@/components/AssetCard/AssetCard';

const MOCK_ASSETS = [
  {
    id: 'f40-1992',
    name: 'Ferrari F40',
    year: 1992,
    vin: 'ZFFGJ34B000094***',
    pricePerFraction: 8500,
    yieldExpected: 14.2,
    progressPercent: 78,
    spotsRemaining: 44,
    status: 'IPO_LIVE' as const,
    imageUrl: 'https://images.unsplash.com/photo-1592853625601-bb11b629cb8e?auto=format&fit=crop&q=80&w=1200&h=675'
  },
  {
    id: 'gt3-2018',
    name: 'Porsche 911 GT3 RS',
    year: 2018,
    vin: 'WP0ZZZ99ZJS123***',
    pricePerFraction: 5200,
    yieldExpected: 11.8,
    progressPercent: 100,
    spotsRemaining: 0,
    status: 'VERIFIED' as const,
    imageUrl: 'https://images.unsplash.com/photo-1503376712344-6a0c20165e63?auto=format&fit=crop&q=80&w=1200&h=675'
  },
  {
    id: 'mclaren-p1',
    name: 'McLaren P1',
    year: 2014,
    vin: 'SBM11AAA6EW000***',
    pricePerFraction: 12000,
    yieldExpected: 16.5,
    progressPercent: 32,
    spotsRemaining: 170,
    status: 'IPO_LIVE' as const,
    imageUrl: 'https://images.unsplash.com/photo-1621245785023-eb56eb910bf1?auto=format&fit=crop&q=80&w=1200&h=675'
  }
];

const CATEGORIES = ['Todos', 'IPO', 'Secundário', 'Clássicos', 'Hipercarros'];

export default function GaragemPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');

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
          <span className={styles.titleCount}>3 ativos</span>
        </h2>
        
        <div>
          {MOCK_ASSETS.map((asset) => (
            <AssetCard key={asset.id} {...asset} />
          ))}
        </div>
      </div>
    </div>
  );
}
