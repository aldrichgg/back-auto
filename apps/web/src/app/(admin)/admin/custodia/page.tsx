"use client";

import React from 'react';
import s from '../../admin.shared.module.css';

const vehicles = [
  {
    id: 'F40-001', name: '1992 Ferrari F40 LM', chassis: 'ZFFGJ34B000085511',
    location: 'Apex Vault SP — Vaga VIP 01', bunker: 'São Paulo',
    status: 'active', temp: '18°C', humidity: '45%', lastInspection: '15/06/2026',
    image: 'https://images.unsplash.com/photo-1592853625511-adbc62214b6d?auto=format&fit=crop&q=80&w=600&h=400',
    valuation: 'R$ 5.000.000', spe: 'Apex SPE 08 Maranello Ltda',
  },
  {
    id: 'GT3-001', name: '1973 Porsche 911 RS 2.7', chassis: '9113600982',
    location: 'Freeport Genebra — Box 8', bunker: 'Zurique',
    status: 'transit', temp: 'N/A', humidity: 'N/A', lastInspection: '10/06/2026',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=600&h=400',
    valuation: 'R$ 3.600.000', spe: 'Apex SPE 05 Stuttgart Ltda',
  },
  {
    id: 'F1-001', name: '1998 McLaren F1 Road Car', chassis: 'SA9AB2AC2W1048069',
    location: 'Apex Vault London — Salão Nobre', bunker: 'Londres',
    status: 'active', temp: '20°C', humidity: '42%', lastInspection: '20/06/2026',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=600&h=400',
    valuation: 'R$ 25.000.000', spe: 'Apex SPE 01 Woking Fiduciary',
  },
];

const telemetryEvents = [
  { time: '11:22:01', bunker: 'SP VIP 01', event: 'TEMPERATURA OK', value: '18°C', type: 'ok' },
  { time: '10:45:30', bunker: 'Zurique Box 8', event: 'VEÍCULO EM TRÂNSITO', value: 'ETA: 14:00h', type: 'warn' },
  { time: '09:00:00', bunker: 'Londres Salão', event: 'CHECK-IN SEGURANÇA', value: '✓ Autorizado', type: 'ok' },
  { time: '08:30:15', bunker: 'SP VIP 01', event: 'ACESSO TÉCNICO', value: 'Custodian #C012', type: 'info' },
  { time: '07:15:00', bunker: 'Miami Dock 3', event: 'ALERTA UMIDADE', value: '62% — Investigar', type: 'warn' },
];

export default function CustodiaPage() {
  return (
    <div className={s.pageContainer}>
      {/* Header */}
      <div className={s.pageHeader}>
        <div>
          <div className={s.pageBreadcrumb}>
            <span>ROOT ACCESS</span><span className={s.sep}>{'//'}</span><span>CUSTÓDIA FÍSICA</span>
          </div>
          <h1 className={s.pageTitle}>Custódia Física & Bunkers</h1>
          <p className={s.pageSubtitle}>Rastreabilidade de veículos, localização global, telemetria ambiental de bunkers, manutenções e documentação de ativos físicos.</p>
        </div>
        <div className={s.actionsRow}>
          <button className={s.btnPrimary}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            INSPECIONAR BUNKER
          </button>
          <button className={s.btnSecondary}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            MAPA BUNKERS
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={s.kpiGrid}>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}>
            <span className={s.kpiLabel}>Veículos em Custódia</span>
            <div className={s.kpiIconBox} style={{background:'rgba(242,202,80,0.08)'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2" ry="2"/><circle cx="12" cy="16" r="1"/></svg>
            </div>
          </div>
          <div className={s.kpiValue} style={{fontSize:'28px'}}>24</div>
          <div className={s.kpiFooter}><span>19 Em Bunkers</span><span>3 Em Trânsito</span><span style={{color:'var(--color-tertiary)'}}>2 SPE Setup</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}>
            <span className={s.kpiLabel}>Bunkers Globais Ativos</span>
            <div className={s.kpiIconBox} style={{background:'rgba(242,202,80,0.08)'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
          </div>
          <div className={s.kpiValue} style={{fontSize:'28px'}}>3</div>
          <div className={s.kpiFooter}><span>SP (11)</span><span>ZRH (5)</span><span>MIA+LDN (8)</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}>
            <span className={s.kpiLabel}>AUM Custódia Total</span>
            <span className={`${s.kpiBadge} ${s.kpiBadgeGold}`}>+18.4% YoY</span>
          </div>
          <div className={`${s.kpiValue} ${s.kpiValueGold}`} style={{fontSize:'20px', fontVariantNumeric:'tabular-nums'}}>R$ 168.450.000</div>
          <div className={s.progressBar}><div className={s.progressFill} style={{width:'85%'}} /></div>
          <div className={s.kpiFooter}><span>Hagerty AAA+</span><span>TÜV & PwC</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}>
            <span className={s.kpiLabel}>Alertas de Telemetria</span>
            <span className={`${s.kpiBadge} ${s.kpiBadgeAmber}`}>● ATIVO</span>
          </div>
          <div className={`${s.kpiValue} ${s.kpiValueAmber}`} style={{fontSize:'28px'}}>01</div>
          <p style={{fontFamily:'var(--font-jakarta)', fontSize:'12px', color:'var(--color-on-surface-variant)'}}>Umidade elevada — Miami Dock 3</p>
          <div className={s.kpiFooter}><span>Sensor #MD3-021</span><span>62% — Limite: 55%</span></div>
        </div>
      </div>

      {/* Vehicle Cards */}
      <div>
        <div style={{fontFamily:'var(--font-chivo)', fontSize:'16px', fontWeight:800, color:'var(--color-on-surface)', marginBottom:'var(--space-md)', textTransform:'uppercase', letterSpacing:'-0.01em'}}>
          Acervo de Ativos Físicos
        </div>
        <div className={s.threeColLayout}>
          {vehicles.map((v) => (
            <div key={v.id} className={s.custodyCard}>
              <div className={s.custodyCardImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.image} alt={v.name} />
                <div className={s.custodyCardOverlay} />
                <div style={{position:'absolute', top:'10px', left:'10px', display:'flex', gap:'6px'}}>
                  <span className={`${s.statusBadge} ${v.status === 'active' ? s.statusActive : s.statusPending}`} style={{fontSize:'9px'}}>
                    {v.status === 'active' ? <span className={s.pulseDot} style={{background:'var(--color-verde-liquidacao)'}} /> : null}
                    {v.status === 'active' ? 'EM CUSTÓDIA' : 'EM TRÂNSITO'}
                  </span>
                </div>
                <div style={{position:'absolute', bottom:'10px', left:'10px', fontFamily:'var(--font-jetbrains)', fontSize:'9px', color:'var(--color-outline)', background:'rgba(12,14,19,0.8)', padding:'3px 7px', borderRadius:'2px', letterSpacing:'0.05em'}}>
                  {v.id}
                </div>
              </div>
              <div className={s.custodyCardBody}>
                <div>
                  <div className={s.custodyCardName}>{v.name}</div>
                  <div style={{fontFamily:'var(--font-jetbrains)', fontSize:'10px', color:'var(--color-outline)', marginTop:'2px'}}>VIN: {v.chassis}</div>
                  <div style={{fontFamily:'var(--font-jetbrains)', fontSize:'10px', color:'var(--color-primary)', marginTop:'4px'}}>{v.valuation}</div>
                </div>
                <div className={s.custodyMetaGrid}>
                  <div className={s.custodyMetaItem}>
                    <div className={s.custodyMetaLabel}>Localização</div>
                    <div className={s.custodyMetaValue} style={{fontSize:'10px'}}>{v.location}</div>
                  </div>
                  <div className={s.custodyMetaItem}>
                    <div className={s.custodyMetaLabel}>SPE</div>
                    <div className={s.custodyMetaValue} style={{fontSize:'10px'}}>{v.spe.slice(0,20)}...</div>
                  </div>
                  <div className={s.custodyMetaItem}>
                    <div className={s.custodyMetaLabel}>Temp. Bunker</div>
                    <div className={s.custodyMetaValue}>{v.temp}</div>
                  </div>
                  <div className={s.custodyMetaItem}>
                    <div className={s.custodyMetaLabel}>Umidade</div>
                    <div className={s.custodyMetaValue}>{v.humidity}</div>
                  </div>
                </div>
              </div>
              <div className={s.custodyCardActions}>
                <button className={`${s.carActionBtn} ${s.carActionBtnGold}`}>GPS</button>
                <button className={`${s.carActionBtn} ${s.carActionBtnMuted}`}>DOCS</button>
                <button className={`${s.carActionBtn} ${s.carActionBtnMuted}`}>LAUDO</button>
                <button className={`${s.carActionBtn} ${s.carActionBtnGold}`} style={{marginLeft:'auto'}}>ABRIR BUNKER</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Telemetry Log */}
      <div className={s.sectionPanel}>
        <div className={s.sectionPanelHeader}>
          <span className={s.sectionPanelTitle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            STREAM DE TELEMETRIA — BUNKERS GLOBAIS
          </span>
          <span className={`${s.kpiBadge} ${s.kpiBadgeGreen}`}><span className={s.pulseDot} style={{background:'var(--color-verde-liquidacao)'}} />ONLINE</span>
        </div>
        <div style={{overflowX:'auto'}}>
          <table className={s.dataTable}>
            <thead>
              <tr>
                <th>Hora</th><th>Bunker</th><th>Evento</th><th>Leitura</th><th className="center">Status</th>
              </tr>
            </thead>
            <tbody>
              {telemetryEvents.map((e, i) => (
                <tr key={i}>
                  <td className="mono">{e.time}</td>
                  <td>{e.bunker}</td>
                  <td style={{fontWeight:600}}>{e.event}</td>
                  <td className="mono" style={{color: e.type === 'ok' ? 'var(--color-verde-liquidacao)' : e.type === 'warn' ? 'var(--color-tertiary)' : 'var(--color-on-surface)'}}>{e.value}</td>
                  <td className="center">
                    <span className={`${s.statusBadge} ${e.type === 'ok' ? s.statusActive : e.type === 'warn' ? s.statusPending : s.statusDone}`}>
                      {e.type === 'ok' ? 'OK' : e.type === 'warn' ? 'ATENÇÃO' : 'INFO'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
