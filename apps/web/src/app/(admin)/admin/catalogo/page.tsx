"use client";

import React, { useState } from 'react';
import s from '../../admin.shared.module.css';

const cars = [
  {
    id: '#88521', name: '1992 Ferrari F40 LM Competizione', spe: 'Apex SPE 08 Maranello Ltda · CNPJ: 54.192.401/0001-92',
    status: 'drop_open', valuation: 'R$ 5.000.000,00', progress: 82, raised: 'R$ 4.100.000', cotas: '20.000 @ R$ 250',
    location: 'São Paulo - Vaga VIP 01', countdown: '14h 22m 09s',
    img: 'https://images.unsplash.com/photo-1592853625511-adbc62214b6d?auto=format&fit=crop&q=80&w=800',
    cert: 'HAGERTY VERIFIED', investors: 328,
  },
  {
    id: '#9113600982', name: '1973 Porsche 911 Carrera RS 2.7 Lightweight', spe: 'Apex SPE 05 Stuttgart Ltda · Grand Prix White',
    status: 'final_stretch', valuation: 'R$ 3.600.000,00', progress: 94, raised: 'R$ 3.540.600', cotas: '20.000 @ R$ 180',
    location: 'Freeport Genebra - Box 8', countdown: '330 Cotas restantes',
    img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=800',
    cert: 'PORSCHE CLASSIC ARCHIVE', investors: 248,
  },
  {
    id: '#069', name: '1998 McLaren F1 Road Car', spe: 'Apex SPE 01 Woking Fiduciary · Magnesium Silver',
    status: 'private', valuation: 'R$ 25.000.000,00', progress: 0, raised: 'Bookbuilding', cotas: '100.000 @ R$ 250',
    location: 'Apex Vault London - Salão Nobre', countdown: '412 Investidores na fila',
    img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
    cert: 'TROFÉU CUSTÓDIA MONZA', investors: 412,
  },
];

const statusMap = {
  drop_open: { label: 'DROP PRIMÁRIO ABERTO', cls: 'statusBlocked' as const, progressCls: 'progressFillRed' as const },
  final_stretch: { label: 'RETA FINAL DE CAPTAÇÃO', cls: 'statusPending' as const, progressCls: 'progressFillAmber' as const },
  private: { label: 'PRÉ-LANÇAMENTO PRIVATE', cls: 'statusDraft' as const, progressCls: 'progressFill' as const },
};

export default function CatalogoPage() {
  const [activeTab, setActiveTab] = useState('Todos os Veículos (24)');
  const tabs = ['Todos os Veículos (24)', 'Em Venda Primária (3)', 'Mercado Secundário (18)', 'Em Homologação (2)', 'Acervo Privado (1)'];

  return (
    <div className={s.pageContainer}>
      {/* Header */}
      <div className={s.pageHeader}>
        <div>
          <div className={s.pageBreadcrumb}>
            <span>VAULT & SYNTHESIS</span><span className={s.sep}>{'//'}</span><span>SEC-CVM 175</span><span className={s.sep}>{'//'}</span><span>TOKENIZATION ENGINE v4.8</span>
          </div>
          <h1 className={s.pageTitle}>Catálogo Mestre de Veículos & Controle de Vendas</h1>
          <p className={s.pageSubtitle}>Gestão completa do acervo: cadastro de hipercarros, parametrização de frações, abertura/encerramento de vendas primárias (Drops), controle de liquidez secundária e alocação física em bunkers.</p>
        </div>
        <div className={s.actionsRow}>
          <button className={s.btnPrimary}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            + CADASTRAR NOVO VEÍCULO
          </button>
          <button className={s.btnSecondary}>CONFIGURAR NOVO DROP</button>
          <button className={s.btnSecondary}>ATUALIZAR LAUDOS EM LOTE</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={s.kpiGrid}>
        {[
          { label: 'Total Veículos Catalogados', value: '24', badge: 'UNIDADES', badgeCls: s.kpiBadgeGold, footer: ['19 Bunkers', '3 Em Trânsito', '2 SPE Setup'] },
          { label: 'Valuation Consolidado', value: 'R$ 168.450.000', badge: '+18.4% LTM', badgeCls: s.kpiBadgeGreen, footer: ['Hagerty AAA+', 'TÜV & PwC'] },
          { label: 'Status Vendas Primárias', value: '2', badge: 'DROPS ATIVAS', badgeCls: s.kpiBadgeRed, footer: ['1 Pré-Venda Private', '15 Concluídos'] },
          { label: 'Cotas Totais Escrituradas', value: '480.000', badge: '98.4% OCUPAÇÃO', badgeCls: s.kpiBadgeGold, footer: ['1.842 Investidores'] },
        ].map((k, i) => (
          <div key={i} className={s.kpiCard}>
            <div className={s.kpiHeader}>
              <span className={s.kpiLabel}>{k.label}</span>
              <span className={`${s.kpiBadge} ${k.badgeCls}`}>{k.badge}</span>
            </div>
            <div className={s.kpiValue} style={{fontSize: i === 1 ? '16px' : '26px', color: i === 2 ? 'var(--color-secondary)' : i === 1 ? 'var(--color-primary)' : 'var(--color-on-surface)', fontVariantNumeric:'tabular-nums'}}>{k.value}</div>
            <div className={s.kpiFooter}>{k.footer.map((f, j) => <span key={j}>{f}</span>)}</div>
          </div>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className={s.toolbar}>
        <div className={s.toolbarRow} style={{flexWrap:'nowrap', overflowX:'auto', paddingBottom:'4px'}}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`${s.filterPill} ${activeTab === t ? s.filterPillActive : ''}`} style={{whiteSpace:'nowrap'}}>{t}</button>
          ))}
          <div style={{marginLeft:'auto'}}>
            <input className={s.searchInput} placeholder="Nome, Chassis/VIN, Ano, SPE CNPJ, Bunker..." style={{minWidth:'260px'}} />
          </div>
        </div>
      </div>

      {/* Car Cards */}
      <div className={s.carGrid}>
        {cars.map((car) => {
          const st = statusMap[car.status as keyof typeof statusMap];
          return (
            <div key={car.id} className={s.carCard}>
              <div className={s.carImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={car.img} alt={car.name} />
                <div className={s.carImageOverlay} />
                <div className={s.carImageBadges}>
                  <span className={s.carImageBadge} style={{color:'var(--color-on-surface)'}}>
                    ✓ {car.cert}
                  </span>
                </div>
                <div className={s.carImageFooter}>
                  <div className={s.carFooterBadge}>LOCALIZAÇÃO: <span>{car.location}</span></div>
                  <div className={s.carFooterBadge}>
                    {car.status === 'drop_open' ? 'FECHA EM:' : car.status === 'final_stretch' ? 'RESTANTE:' : 'FILA:'}
                    <span style={{color: car.status === 'drop_open' ? 'var(--color-secondary)' : car.status === 'final_stretch' ? 'var(--color-tertiary)' : 'var(--color-primary)'}}> {car.countdown}</span>
                  </div>
                </div>
              </div>
              <div className={s.carBody}>
                <div>
                  <div className={s.carStatus}>
                    <span className={`${s.statusBadge} ${s[st.cls]}`}>
                      {car.status !== 'private' && <span className={s.pulseDot} />}
                      {st.label}
                    </span>
                    <span style={{marginLeft:'8px', fontFamily:'var(--font-jetbrains)', fontSize:'10px', color:'var(--color-outline)'}}>CHASSIS {car.id}</span>
                  </div>
                  <div className={s.carName}>{car.name}</div>
                  <div className={s.carSPE}>{car.spe}</div>
                </div>
                <div className={s.carValuation}>
                  <div>
                    <div className={s.carValuationLabel}>VALUATION DE EMISSÃO</div>
                    <div className={s.carValuationValue}>{car.valuation}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div className={s.carValuationLabel}>COTISTAS</div>
                    <div style={{fontFamily:'var(--font-jetbrains)', fontSize:'16px', fontWeight:700, color: car.status === 'drop_open' ? 'var(--color-secondary)' : 'var(--color-on-surface)', fontVariantNumeric:'tabular-nums'}}>{car.investors}</div>
                  </div>
                </div>
                {car.progress > 0 && (
                  <div className={s.captureProgress}>
                    <div className={s.captureProgressHeader}>
                      <span>PROGRESSO DE CAPTAÇÃO: {car.progress}%</span>
                      <span>{car.raised} / {car.valuation}</span>
                    </div>
                    <div className={s.progressBar}>
                      <div className={`${s[st.progressCls as keyof typeof s]}`} style={{width:`${car.progress}%`, height:'100%', borderRadius:'2px'}} />
                    </div>
                    <div className={s.statRowGrid}>
                      <div className={s.statCell}><div className={s.statCellLabel}>COTAS EMITIDAS</div><div className={s.statCellValue}>{car.cotas}</div></div>
                      <div className={s.statCell}><div className={s.statCellLabel}>MÍNIMO</div><div className={s.statCellValue}>1 COTA</div></div>
                      <div className={s.statCell}><div className={s.statCellLabel}>COTISTAS</div><div className={s.statCellValue}>{car.investors}</div></div>
                    </div>
                  </div>
                )}
                {car.status === 'private' && (
                  <div className={`${s.alertBanner} ${s.alertBannerGold}`}>
                    <div><div className={s.alertTitle}>💎 PRÉ-LANÇAMENTO PRIVATE</div><div className={s.alertDesc}>Bookbuilding em 48 horas. 412 investidores qualificados na fila de espera.</div></div>
                  </div>
                )}
              </div>
              <div className={s.carActions}>
                <div className={s.carActionGroup}>
                  {car.status === 'drop_open' && <>
                    <button className={`${s.carActionBtn} ${s.carActionBtnDanger}`}>⏸ Pausar Venda</button>
                    <button className={`${s.carActionBtn} ${s.carActionBtnMuted}`}>🔒 Forçar Fechamento</button>
                    <button className={`${s.carActionBtn} ${s.carActionBtnMuted}`}>💰 Alterar Preço</button>
                  </>}
                  {car.status === 'final_stretch' && <>
                    <button className={`${s.carActionBtn} ${s.carActionBtnGold}`}>⏩ Antecipar Fechamento</button>
                    <button className={`${s.carActionBtn} ${s.carActionBtnMuted}`}>🏦 Market Maker</button>
                  </>}
                  {car.status === 'private' && <>
                    <button className={`${s.carActionBtn} ${s.carActionBtnGold}`}>🚀 Iniciar Bookbuilding</button>
                  </>}
                </div>
                <div style={{display:'flex', gap:'6px', marginLeft:'auto'}}>
                  <button className={`${s.carActionBtn} ${s.carActionBtnMuted}`}>📄 Laudo Forense</button>
                  <button className={`${s.carActionBtn} ${s.carActionBtnGold}`}>🔑 Liberar Bunker</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
