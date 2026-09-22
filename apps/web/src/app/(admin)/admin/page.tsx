"use client";

import React from 'react';
import s from '../admin.shared.module.css';

const monthlyRevenue = [52, 61, 48, 73, 80, 68, 91, 77, 65, 82, 95, 100];
const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

const recentDrops = [
  { name: 'Ferrari F40 LM — Drop #08', status: 'active', aum: 'R$ 4.100.000', captacao: '82%', date: 'Jun 2026' },
  { name: 'Porsche 911 RS 2.7 — Drop #05', status: 'final_stretch', aum: 'R$ 3.540.600', captacao: '94%', date: 'Jun 2026' },
  { name: 'Lamborghini Countach — Drop #06', status: 'done', aum: 'R$ 6.200.000', captacao: '100%', date: 'Mai 2026' },
  { name: 'Ayrton Senna McLaren — Drop #04', status: 'done', aum: 'R$ 18.000.000', captacao: '100%', date: 'Mar 2026' },
];

export default function AdminDashboardPage() {
  const maxRevenue = Math.max(...monthlyRevenue);

  return (
    <div className={s.pageContainer}>
      {/* Master Executive Banner */}
      <div style={{position:'relative', overflow:'hidden', borderRadius:'var(--rounded-lg)', background:'var(--color-surface-container-lowest)', padding:'var(--space-lg)', boxShadow:'var(--shadow-default)', border:'1px solid rgba(255,255,255,0.04)'}}>
        <div style={{position:'absolute', top:'-60px', right:'-60px', width:'200px', height:'200px', background:'rgba(242,202,80,0.04)', borderRadius:'50%', filter:'blur(40px)', pointerEvents:'none'}} />
        <div style={{position:'relative', display:'flex', flexDirection:'column', gap:'var(--space-md)'}}>
          <div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-sm)', alignItems:'center'}}>
            <span style={{background:'var(--color-primary)', color:'var(--color-on-primary)', fontFamily:'var(--font-jetbrains)', fontSize:'11px', fontWeight:800, letterSpacing:'0.1em', padding:'4px 10px', borderRadius:'2px'}}>SUPERADMIN ROOT</span>
            <span style={{fontFamily:'var(--font-jetbrains)', fontSize:'11px', color:'var(--color-outline)'}}>{'//'}</span>
            <span style={{fontFamily:'var(--font-jetbrains)', fontSize:'11px', color:'var(--color-primary-fixed-dim)', letterSpacing:'0.06em'}}>APEX COMMAND CORE SYSTEM v4.20</span>
            <span style={{display:'flex', alignItems:'center', gap:'6px', background:'var(--color-surface-container)', padding:'3px 10px', borderRadius:'2px', fontFamily:'var(--font-jetbrains)', fontSize:'10px', color:'var(--color-on-surface-variant)'}}>
              <span style={{width:'6px', height:'6px', borderRadius:'50%', background:'var(--color-primary)', animation:'pulse 2s infinite', display:'inline-block'}} />
              LATENCY: 8ms GRU-ZRH
            </span>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'var(--space-md)'}}>
            <div>
              <h1 className={s.pageTitle}>SALA DE COMANDO MASTER <span style={{color:'var(--color-primary)'}}>{'//'}</span> ROOT CONSOLE</h1>
              <p className={s.pageSubtitle}>Supervisão fiduciária consolidada, governança institucional de custódia física e execução de contratos inteligentes SPE sob diretrizes CVM 175.</p>
            </div>
            <div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-sm)'}}>
              {[
                { icon: '✓', text: 'Contratos Inteligentes 100% Auditados PwC' },
                { icon: '🏦', text: 'Fiança Bancária Itaú BBA R$ 50.000.000,00' },
                { icon: '⚙', text: 'Custo Operacional Otimizado (81.2 bps)' },
              ].map((b, i) => (
                <div key={i} style={{display:'flex', alignItems:'center', gap:'6px', background:'var(--color-surface-container-high)', padding:'6px 12px', borderRadius:'2px'}}>
                  <span style={{fontFamily:'var(--font-jetbrains)', fontSize:'10px', color:'var(--color-on-surface-variant)'}}>{b.icon} {b.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={s.actionsRow}>
            <button className={s.btnPrimary}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              NOVO VEÍCULO / DROP
            </button>
            <button className={s.btnSecondary}>EMITIR RELATÓRIO EXECUTIVO CVM</button>
            <button className={s.btnDanger}>⚡ TRAVAR PLATAFORMA (CIRCUIT BREAKER)</button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={s.kpiGrid}>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}>
            <span className={s.kpiLabel}>AUM Total em Custódia</span>
            <span className={`${s.kpiBadge} ${s.kpiBadgeGold}`}>+18.4% YoY</span>
          </div>
          <div className={`${s.kpiValue} ${s.kpiValueGold}`} style={{fontSize:'18px', fontVariantNumeric:'tabular-nums'}}>R$ 142.850.000</div>
          <p style={{fontFamily:'var(--font-jakarta)', fontSize:'12px', color:'var(--color-on-surface-variant)'}}>19 Supercarros SPE · 3 Bunkers Fiduciários</p>
          <div className={s.kpiFooter}><span style={{color:'var(--color-primary)', fontWeight:600}}>SP (11)</span><span style={{color:'var(--color-primary)'}}>ZRH (5)</span><span style={{color:'var(--color-primary)'}}>MIA (3)</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}>
            <span className={s.kpiLabel}>Receita Líquida Acumulada</span>
            <span className={`${s.kpiBadge} ${s.kpiBadgeGold}`}>+32.1% Trim.</span>
          </div>
          <div className={s.kpiValue} style={{fontSize:'18px', fontVariantNumeric:'tabular-nums'}}>R$ 9.420.800</div>
          <p style={{fontFamily:'var(--font-jakarta)', fontSize:'12px', color:'var(--color-on-surface-variant)'}}>Take rate médio ponderado: <strong style={{color:'var(--color-on-surface)'}}>2.74%</strong></p>
          <div className={s.kpiFooter}><span>IPO 2.5%</span><span>Sec 0.2%</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}>
            <span className={s.kpiLabel}>Base de Investidores</span>
            <span className={`${s.kpiBadge} ${s.kpiBadgeGold}`}>99.2% KYC/AML</span>
          </div>
          <div className={s.kpiValue} style={{fontSize:'22px', fontVariantNumeric:'tabular-nums'}}>1.248 <span style={{fontSize:'14px', fontWeight:400, color:'var(--color-on-surface-variant)'}}>Contas Ativas</span></div>
          <p style={{fontFamily:'var(--font-jakarta)', fontSize:'12px', color:'var(--color-on-surface-variant)'}}>842 Qualificados // 312 Profissionais</p>
          <div className={s.kpiFooter}><span>Apex Private VIP</span><span style={{color:'var(--color-primary)', fontWeight:600}}>94 Cotistas HNW</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}>
            <span className={s.kpiLabel}>Dividendos Próximas 30 Dias</span>
            <span className={`${s.kpiBadge} ${s.kpiBadgeGreen}`}>YLD 14.2%</span>
          </div>
          <div className={`${s.kpiValue} ${s.kpiValueGreen}`} style={{fontSize:'18px', fontVariantNumeric:'tabular-nums'}}>R$ 2.140.000</div>
          <p style={{fontFamily:'var(--font-jakarta)', fontSize:'12px', color:'var(--color-on-surface-variant)'}}>Próxima distribuição: 30 Jul 2026</p>
          <div className={s.kpiFooter}><span>1.842 Cotistas</span><span style={{color:'var(--color-verde-liquidacao)'}}>Smart Contract ✓</span></div>
        </div>
      </div>

      <div className={s.twoColLayout}>
        {/* Revenue Chart */}
        <div className={s.sectionPanel}>
          <div className={s.sectionPanelHeader}>
            <span className={s.sectionPanelTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              RECEITA MENSAL 2026 (YTD)
            </span>
            <span className={s.sectionPanelMeta}>R$ 9.42M acumulado</span>
          </div>
          <div style={{padding:'var(--space-md)', display:'flex', flexDirection:'column', gap:'var(--space-md)'}}>
            <div style={{display:'flex', alignItems:'flex-end', gap:'6px', height:'120px'}}>
              {monthlyRevenue.map((val, i) => (
                <div key={i} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', height:'100%', justifyContent:'flex-end'}}>
                  <div style={{
                    width:'100%',
                    height:`${(val/maxRevenue)*100}%`,
                    background: val === maxRevenue ? 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-container) 100%)' : 'rgba(242,202,80,0.25)',
                    borderRadius:'2px 2px 0 0',
                    transition:'filter 0.2s',
                    cursor:'pointer',
                  }} />
                </div>
              ))}
            </div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              {months.map((m, i) => (
                <span key={i} style={{fontFamily:'var(--font-jetbrains)', fontSize:'9px', color:'var(--color-outline)', flex:1, textAlign:'center'}}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Drops Recentes */}
        <div className={s.sectionPanel}>
          <div className={s.sectionPanelHeader}>
            <span className={s.sectionPanelTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              DROPS RECENTES
            </span>
          </div>
          <div>
            {recentDrops.map((drop, i) => (
              <div key={i} className={s.complianceItem}>
                <div className={s.complianceItemHeader}>
                  <div>
                    <div style={{fontFamily:'var(--font-jakarta)', fontSize:'13px', fontWeight:600, color:'var(--color-on-surface)'}}>{drop.name}</div>
                    <div className={s.complianceItemMeta}><span>{drop.date}</span><span>AUM: {drop.aum}</span></div>
                  </div>
                  <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                    <span style={{fontFamily:'var(--font-jetbrains)', fontSize:'12px', fontWeight:700, color: drop.captacao === '100%' ? 'var(--color-verde-liquidacao)' : drop.status === 'final_stretch' ? 'var(--color-tertiary)' : 'var(--color-primary)'}}>{drop.captacao}</span>
                    <span className={`${s.statusBadge} ${drop.status === 'done' ? s.statusDone : drop.status === 'active' ? s.statusBlocked : s.statusPending}`}>
                      {drop.status === 'done' ? 'CONCLUÍDO' : drop.status === 'active' ? 'DROP ABERTO' : 'RETA FINAL'}
                    </span>
                  </div>
                </div>
                <div className={s.progressBar}>
                  <div style={{height:'100%', borderRadius:'2px', width:drop.captacao, background: drop.captacao === '100%' ? 'var(--color-verde-liquidacao)' : 'linear-gradient(90deg, var(--color-primary-container), var(--color-primary))'}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className={s.sectionPanel}>
        <div className={s.sectionPanelHeader}>
          <span className={s.sectionPanelTitle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            STATUS DO SISTEMA — APEX COMMAND CORE
          </span>
          <span className={`${s.kpiBadge} ${s.kpiBadgeGreen}`}><span className={s.pulseDot} style={{background:'var(--color-verde-liquidacao)'}} />TODOS OS SISTEMAS OPERACIONAIS</span>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'1px', background:'rgba(255,255,255,0.03)'}}>
          {[
            { label: 'API Blockchain', value: '99.97% UP', status: 'ok' },
            { label: 'HSM Master Key', value: 'P-256 ACTIVE', status: 'ok' },
            { label: 'CVM 175 Compliance', value: '100% CONFORME', status: 'ok' },
            { label: 'KYC/AML Engine', value: '14 EM ANÁLISE', status: 'warn' },
            { label: 'Smart Contracts', value: 'AUDITADOS PwC', status: 'ok' },
            { label: 'Bunkers Telemetria', value: '1 ALERTA ATIVO', status: 'warn' },
            { label: 'Circuit Breaker', value: 'DESATIVADO', status: 'ok' },
            { label: 'Sistema de Dividendos', value: 'AUTOMÁTICO', status: 'ok' },
          ].map((sys, i) => (
            <div key={i} style={{background:'var(--color-surface-container)', padding:'var(--space-md)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <div style={{fontFamily:'var(--font-jetbrains)', fontSize:'10px', color:'var(--color-outline)', textTransform:'uppercase', letterSpacing:'0.06em'}}>{sys.label}</div>
                <div style={{fontFamily:'var(--font-jetbrains)', fontSize:'12px', fontWeight:600, color: sys.status === 'ok' ? 'var(--color-verde-liquidacao)' : 'var(--color-tertiary)', marginTop:'2px'}}>{sys.value}</div>
              </div>
              <span style={{width:'8px', height:'8px', borderRadius:'50%', background: sys.status === 'ok' ? 'var(--color-verde-liquidacao)' : 'var(--color-tertiary)', animation: sys.status === 'warn' ? 'pulse 2s infinite' : 'none'}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
