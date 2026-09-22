"use client";

import React from 'react';
import s from '../../admin.shared.module.css';

const dreItems = [
  { label: 'Receita Bruta de Taxas de Estruturação (IPO/Drops)', value: 'R$ 8.452.500,00', change: '+31.2%', changeType: 'gold' },
  { label: 'Receita de Spread — Mercado Secundário (0.2%)', value: 'R$ 2.188.000,00', change: '+28.6%', changeType: 'gold' },
  { label: 'Receita de Custódia & Manutenção de Bunkers', value: 'R$ 1.240.000,00', change: '+15.4%', changeType: 'gold' },
  { label: 'Receita de Gestão SPE (Performance 18%)', value: 'R$ 3.040.000,00', change: '+22.1%', changeType: 'gold' },
  { label: 'Receita Concierge & Consultorias Apex Private', value: 'R$ 920.000,00', change: '+44.8%', changeType: 'gold' },
  { label: '(-) Custo de Custódia Física (Bunkers + Seguro)', value: '(R$ 680.000,00)', change: '-5.2%', changeType: 'red' },
  { label: '(-) Custo Operacional Tech & Compliance', value: '(R$ 420.000,00)', change: '+2.1%', changeType: 'red' },
  { label: '(-) Custo PwC Auditoria & Estruturação CVM', value: '(R$ 280.000,00)', change: '=', changeType: 'muted' },
  { label: '(-) Impostos sobre Receita (ISS + PIS/COFINS)', value: '(R$ 1.620.000,00)', change: '+6.8%', changeType: 'red' },
  { label: 'EBITDA Apex Capital', value: 'R$ 8.765.000,00', change: '+32.1%', changeType: 'green', bold: true },
  { label: 'Margem EBITDA', value: '68.2%', change: 'Target: 70%', changeType: 'gold', bold: true },
  { label: 'LUCRO LÍQUIDO DISTRIBUÍVEL', value: 'R$ 6.840.500,00', change: '+26.8%', changeType: 'green', bold: true, total: true },
];

const dividendEvents = [
  { date: '30/07/2026', asset: 'Ferrari F40 LM · Drop #08', amount: 'R$ 480.000,00', yield: '14.2% a.a.', status: 'pending', cotistas: 328 },
  { date: '30/07/2026', asset: 'McLaren F1 · Drop #04', amount: 'R$ 860.000,00', yield: '16.8% a.a.', status: 'pending', cotistas: 412 },
  { date: '30/06/2026', asset: 'Lambo Countach · Drop #06', amount: 'R$ 540.000,00', yield: '13.5% a.a.', status: 'done', cotistas: 284 },
  { date: '30/06/2026', asset: 'Ayrton Senna McLaren · Drop #04', amount: 'R$ 1.820.000,00', yield: '12.1% a.a.', status: 'done', cotistas: 694 },
];

const taxTable = [
  { tipo: 'Taxa de Estruturação (IPO/Drop)', base: 'Total Captado', rate: '2.5%', modelo: 'Fixo', incidencia: 'No fechamento' },
  { tipo: 'Spread Mercado Secundário', base: 'Valor de Cada Transação', rate: '0.2%', modelo: 'Por operação', incidencia: 'Instantâneo' },
  { tipo: 'Taxa de Gestão SPE', base: 'AUM em Custódia', rate: '1.5% a.a.', modelo: 'Mensal', incidencia: 'Pro-rata' },
  { tipo: 'Performance (Superar IPCA+6%)', base: 'Ganho Acima do Benchmark', rate: '18%', modelo: 'Anual', incidencia: 'Aniversário' },
  { tipo: 'Taxa de Custódia Física', base: 'Valuation do Ativo', rate: '0.4% a.a.', modelo: 'Mensal', incidencia: 'Pro-rata' },
];

export default function LucrosPage() {
  return (
    <div className={s.pageContainer}>
      {/* Header */}
      <div style={{position:'relative', overflow:'hidden', borderRadius:'var(--rounded-lg)', background:'var(--color-surface-container-low)', padding:'var(--space-lg)', boxShadow:'var(--shadow-default)', border:'1px solid rgba(255,255,255,0.04)'}}>
        <div style={{position:'absolute', top:'-60px', right:'-60px', width:'200px', height:'200px', background:'rgba(242,202,80,0.03)', borderRadius:'50%', filter:'blur(40px)', pointerEvents:'none'}} />
        <div className={s.pageHeader} style={{alignItems:'flex-start'}}>
          <div>
            <div className={s.pageBreadcrumb}>
              <span>MÓDULO 03</span><span className={s.sep}>{'//'}</span><span>FIDUCIARY RESERVE</span><span className={s.sep}>{'//'}</span><span>CVM 175 ANBIMA COMPLIANT</span>
            </div>
            <h1 className={s.pageTitle}>Tesouraria Master <span style={{color:'var(--color-primary)'}}>{'//'}</span> Controle de Lucros, Taxas & Repasse Fiduciário</h1>
            <p className={s.pageSubtitle}>Controle financeiro centralizado: gestão de fluxos de receitas da plataforma, taxas de estruturação de SPEs, custódia balística, spreads em mercado secundário e governança do pool de dividendos aos cotistas qualificados.</p>
          </div>
          <div className={s.actionsRow}>
            <button className={s.btnPrimary}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              DISTRIBUIR DIVIDENDOS (SMART CONTRACT)
            </button>
            <button className={s.btnSecondary}>EDITAR TABELA DE TAXAS</button>
            <button className={s.btnSecondary}>RECOLHER TAXAS MASTER</button>
            <button className={s.btnSecondary}>GERAR DRE AUDITADO</button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={s.kpiGrid}>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}><span className={s.kpiLabel}>LUCRO BRUTO DA PLATAFORMA (YTD)</span><span className={`${s.kpiBadge} ${s.kpiBadgeGold}`}>+26.8% a.a.</span></div>
          <div className={`${s.kpiValue} ${s.kpiValueGold}`} style={{fontSize:'18px', fontVariantNumeric:'tabular-nums'}}>R$ 12.840.500,00</div>
          <div className={s.progressBar}><div className={s.progressFill} style={{width:'68.2%'}} /></div>
          <div className={s.kpiFooter}><span>Margem EBITDA: 68.2%</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}><span className={s.kpiLabel}>TAXAS DE ESTRUTURAÇÃO (DROPS)</span><span className={`${s.kpiBadge} ${s.kpiBadgeAmber}`}>2.5% FIXO</span></div>
          <div className={s.kpiValue} style={{fontSize:'18px', fontVariantNumeric:'tabular-nums'}}>R$ 4.850.000,00</div>
          <div className={s.progressBar}><div className={s.progressFillAmber} style={{width:'74%'}} /></div>
          <div className={s.kpiFooter}><span>Taxa Fixa SPE: 2.5%</span><span>R$ 84.5M em Primárias</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}><span className={s.kpiLabel}>RECEITA MERCADO SECUNDÁRIO</span><span className={`${s.kpiBadge} ${s.kpiBadgeGreen}`}>+28.6%</span></div>
          <div className={`${s.kpiValue} ${s.kpiValueGreen}`} style={{fontSize:'18px', fontVariantNumeric:'tabular-nums'}}>R$ 2.188.000,00</div>
          <div className={s.progressBar}><div className={s.progressFillGreen} style={{width:'58%'}} /></div>
          <div className={s.kpiFooter}><span>Volume: R$ 1.09B</span><span>Spread: 0.2%</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}><span className={s.kpiLabel}>DIVIDENDOS A DISTRIBUIR</span><span className={`${s.kpiBadge} ${s.kpiBadgeGold}`}>30 JUL 2026</span></div>
          <div className={`${s.kpiValue} ${s.kpiValueGold}`} style={{fontSize:'18px', fontVariantNumeric:'tabular-nums'}}>R$ 2.140.000,00</div>
          <p style={{fontFamily:'var(--font-jakarta)', fontSize:'12px', color:'var(--color-on-surface-variant)'}}>Para 1.842 cotistas ativos</p>
          <div className={s.kpiFooter}><span style={{color:'var(--color-verde-liquidacao)'}}>Smart Contract ✓</span><span>YLD Médio: 14.2%</span></div>
        </div>
      </div>

      <div className={s.twoColLayout}>
        {/* DRE */}
        <div className={s.sectionPanel}>
          <div className={s.sectionPanelHeader}>
            <span className={s.sectionPanelTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
              DRE — DEMONSTRAÇÃO DO RESULTADO (YTD 2026)
            </span>
            <span className={s.sectionPanelMeta}>AUDITADO PwC</span>
          </div>
          <div>
            {dreItems.map((item, i) => (
              <div key={i} className={`${s.dreRow} ${item.total ? s.dreRowTotal : ''}`}>
                <span className={item.bold ? s.dreLabelBold : s.dreLabel}>{item.label}</span>
                <span className={`${s.dreChange} ${item.changeType === 'gold' ? s.dreValueGold : item.changeType === 'green' ? s.dreValueGreen : item.changeType === 'red' ? s.dreValueRed : ''}`} style={{color: item.changeType === 'muted' ? 'var(--color-outline)' : undefined}}>{item.change}</span>
                <span className={`${s.dreValue} ${item.bold ? (item.total ? s.dreValueGreen : s.dreValueGold) : ''}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dividend Events */}
        <div className={s.sectionPanel}>
          <div className={s.sectionPanelHeader}>
            <span className={s.sectionPanelTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              CALENDÁRIO DE DIVIDENDOS
            </span>
            <button className={`${s.kpiBadge} ${s.kpiBadgeGold}`}>DISTRIBUIR TODOS</button>
          </div>
          <div>
            {dividendEvents.map((ev, i) => (
              <div key={i} className={s.complianceItem}>
                <div className={s.complianceItemHeader}>
                  <div>
                    <div className={s.userName}>{ev.asset}</div>
                    <div className={s.complianceItemMeta}><span>{ev.date}</span><span>{ev.cotistas} cotistas</span></div>
                  </div>
                  <span className={`${s.statusBadge} ${ev.status === 'done' ? s.statusDone : s.statusDraft}`}>
                    {ev.status === 'done' ? 'PAGO' : 'PENDENTE'}
                  </span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', marginTop:'4px'}}>
                  <span style={{fontFamily:'var(--font-jetbrains)', fontSize:'14px', fontWeight:700, color:'var(--color-primary)', fontVariantNumeric:'tabular-nums'}}>{ev.amount}</span>
                  <span style={{fontFamily:'var(--font-jetbrains)', fontSize:'11px', color:'var(--color-verde-liquidacao)'}}>{ev.yield}</span>
                </div>
                {ev.status === 'pending' && (
                  <button className={s.btnPrimary} style={{marginTop:'6px', width:'100%', justifyContent:'center', fontSize:'10px'}}>
                    ⚡ DISPARAR SMART CONTRACT — DISTRIBUIR DIVIDENDO
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tax Table */}
      <div className={s.sectionPanel}>
        <div className={s.sectionPanelHeader}>
          <span className={s.sectionPanelTitle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            TABELA DE TAXAS & SPREAD — APEX CAPITAL
          </span>
          <button className={s.btnSecondary} style={{padding:'4px 10px', fontSize:'9px'}}>EDITAR TABELA</button>
        </div>
        <div style={{overflowX:'auto'}}>
          <table className={s.dataTable}>
            <thead>
              <tr>
                <th>Tipo de Taxa</th>
                <th>Base de Cálculo</th>
                <th className="center">Taxa</th>
                <th className="center">Modelo</th>
                <th className="right">Incidência</th>
              </tr>
            </thead>
            <tbody>
              {taxTable.map((t, i) => (
                <tr key={i}>
                  <td style={{fontWeight:600}}>{t.tipo}</td>
                  <td className="mono" style={{color:'var(--color-on-surface-variant)'}}>{t.base}</td>
                  <td className="center">
                    <span style={{fontFamily:'var(--font-jetbrains)', fontSize:'13px', fontWeight:800, color:'var(--color-primary)', background:'rgba(242,202,80,0.08)', padding:'3px 8px', borderRadius:'2px'}}>{t.rate}</span>
                  </td>
                  <td className="center mono" style={{color:'var(--color-on-surface-variant)'}}>{t.modelo}</td>
                  <td className="right mono">{t.incidencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
