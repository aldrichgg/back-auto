"use client";

import React, { useState } from 'react';
import s from '../../admin.shared.module.css';

const kycQueue = [
  { id: '#APX-001829', name: 'Fabio Rezende Mattoso', type: 'Investidor Qualificado', status: 'pending', doc: 'CVM 175 Art. 12', days: 2 },
  { id: '#APX-001830', name: 'Marina Schreiber Luz', type: 'Apex Private', status: 'pending', doc: 'KYC Avançado + PEP', days: 1 },
  { id: '#APX-001814', name: 'Carlos Drummond Neto', type: 'Profissional CVM', status: 'active', doc: 'Renovação Anual', days: 0 },
  { id: '#APX-001807', name: 'Grupo Stellantis Family Office', type: 'Institucional', status: 'pending', doc: 'CNPJ + PEP Struct.', days: 3 },
  { id: '#APX-001795', name: 'Pedro Igor Valentim', type: 'Investidor Qualificado', status: 'blocked', doc: 'CVM Art. 32 Flag', days: 7 },
];

const auditLogs = [
  { time: '10:44:01', operator: 'Dr. Alexandre Vance', action: 'APROVAÇÃO KYC', target: 'Rodrigo Sanches #APX-882190', level: 'gold' },
  { time: '10:41:17', operator: 'Mesa Compliance', action: 'BLOQUEIO CAUTELAR', target: 'Pedro Valentim #APX-001795', level: 'red' },
  { time: '10:38:55', operator: 'Sistema AutoKit', action: 'EMISSÃO RELATÓRIO', target: 'CVM 175 — Junho 2026', level: 'muted' },
  { time: '10:30:02', operator: 'Dr. Alexandre Vance', action: 'CIRCUIT BREAKER OFF', target: 'Plataforma Global', level: 'red' },
  { time: '09:55:14', operator: 'Auditores PwC', action: 'AUDIT LOG PULL', target: 'Q2 2026 Completo', level: 'muted' },
];

export default function CompliancePage() {
  const [filter, setFilter] = useState('Todos');
  const filters = ['Todos', 'Pendente KYC', 'Aprovados', 'Flagged'];

  return (
    <div className={s.pageContainer}>
      {/* Header */}
      <div className={s.pageHeader}>
        <div>
          <div className={s.pageBreadcrumb}>
            <span>ROOT ACCESS</span><span className={s.sep}>{'//'}</span><span>COMPLIANCE</span>
          </div>
          <h1 className={s.pageTitle}>Mesa de Compliance & CVM 175</h1>
          <p className={s.pageSubtitle}>Análise regulatória, KYC/AML, relatórios de auditoria e adequação de investidores conforme CVM 175 e ANBIMA.</p>
        </div>
        <div className={s.actionsRow}>
          <button className={s.btnPrimary}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            EMITIR RELATÓRIO CVM
          </button>
          <button className={s.btnSecondary}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
            EXPORTAR LGPD
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={s.kpiGrid}>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}>
            <span className={s.kpiLabel}>Taxa KYC/AML Aprovação</span>
            <span className={`${s.kpiBadge} ${s.kpiBadgeGreen}`}>▲ +1.2%</span>
          </div>
          <div className={`${s.kpiValue} ${s.kpiValueGreen}`} style={{fontSize:'28px'}}>99.2%</div>
          <div className={s.progressBar}><div className={s.progressFillGreen} style={{width:'99.2%'}} /></div>
          <div className={s.kpiFooter}><span>1.237 Aprovados</span><span>14 Em Análise</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}>
            <span className={s.kpiLabel}>Fila KYC Ativa</span>
            <span className={`${s.kpiBadge} ${s.kpiBadgeAmber}`}>URGENTE</span>
          </div>
          <div className={`${s.kpiValue} ${s.kpiValueAmber}`} style={{fontSize:'28px'}}>14</div>
          <p style={{fontFamily:'var(--font-jakarta)', fontSize:'12px', color:'var(--color-on-surface-variant)'}}>Aguardando revisão manual</p>
          <div className={s.kpiFooter}><span>SLA: 48h</span><span>2 expiram hoje</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}>
            <span className={s.kpiLabel}>Bloqueios Cautelares</span>
            <span className={`${s.kpiBadge} ${s.kpiBadgeRed}`}>● QUARANTINE</span>
          </div>
          <div className={`${s.kpiValue} ${s.kpiValueRed}`} style={{fontSize:'28px'}}>02</div>
          <p style={{fontFamily:'var(--font-jakarta)', fontSize:'12px', color:'var(--color-on-surface-variant)'}}>CVM Art. 32 — Pendência Judicial</p>
          <div className={s.kpiFooter}><span>Alçadas Congeladas</span><span>Parecer Ativo</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}>
            <span className={s.kpiLabel}>Conformidade Regulatória</span>
            <span className={`${s.kpiBadge} ${s.kpiBadgeGold}`}>CVM 175</span>
          </div>
          <div className={`${s.kpiValue} ${s.kpiValueGold}`} style={{fontSize:'28px'}}>100%</div>
          <div className={s.progressBar}><div className={s.progressFill} style={{width:'100%'}} /></div>
          <div className={s.kpiFooter}><span>PwC Auditado</span><span>ANBIMA Cert.</span></div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className={`${s.alertBanner} ${s.alertBannerRed}`}>
        <div className={s.alertIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <div>
          <div className={s.alertTitle}>⚠ Compliance Flag Ativo — Pedro Igor Valentim (#APX-001795)</div>
          <div className={s.alertDesc}>Movimentação atípica detectada: 3 transferências superiores a R$ 50.000 em 24h. Conta bloqueada preventivamente. Aguardando laudo da mesa jurídica.</div>
        </div>
      </div>

      <div className={s.twoColLayout}>
        {/* KYC Queue */}
        <div className={s.sectionPanel}>
          <div className={s.sectionPanelHeader}>
            <span className={s.sectionPanelTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>
              FILA KYC / AML
            </span>
            <div className={s.toolbarRow} style={{gap:'4px'}}>
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`${s.filterPill} ${filter === f ? s.filterPillActive : ''}`}>{f}</button>
              ))}
            </div>
          </div>
          <div>
            {kycQueue.map((user) => (
              <div key={user.id} className={s.complianceItem}>
                <div className={s.complianceItemHeader}>
                  <div className={s.userCell}>
                    <div className={s.userAvatar}>{user.name.split(' ').map(n => n[0]).slice(0,2).join('')}</div>
                    <div>
                      <div className={s.userName}>{user.name}</div>
                      <div className={s.userId}>{user.id} · {user.type}</div>
                    </div>
                  </div>
                  <span className={`${s.statusBadge} ${user.status === 'pending' ? s.statusPending : user.status === 'blocked' ? s.statusBlocked : s.statusActive}`}>
                    {user.status === 'pending' ? 'KYC PENDENTE' : user.status === 'blocked' ? 'BLOQUEADO' : 'APROVADO'}
                  </span>
                </div>
                <div className={s.complianceItemMeta}>
                  <span>📋 {user.doc}</span>
                  {user.days > 0 && <span>⏱ {user.days}d na fila</span>}
                </div>
                {user.status === 'pending' && (
                  <div style={{display:'flex', gap:'6px', marginTop:'4px'}}>
                    <button className={s.btnPrimary} style={{padding:'5px 10px', fontSize:'9px'}}>APROVAR</button>
                    <button className={s.btnDanger} style={{padding:'5px 10px', fontSize:'9px'}}>RECUSAR</button>
                    <button className={s.btnSecondary} style={{padding:'5px 10px', fontSize:'9px', color:'var(--color-tertiary)'}}>SOLICITAR DOCS</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log */}
        <div className={s.sectionPanel}>
          <div className={s.sectionPanelHeader}>
            <span className={s.sectionPanelTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              LOG DE AUDITORIA — HOJE
            </span>
            <span className={s.sectionPanelMeta}>REAL-TIME</span>
          </div>
          <div>
            {auditLogs.map((log, i) => (
              <div key={i} className={s.complianceItem}>
                <div className={s.complianceItemHeader}>
                  <div style={{fontFamily:'var(--font-chivo)', fontSize:'13px', fontWeight:600, color:'var(--color-on-surface)'}}>
                    {log.action}
                  </div>
                  <span style={{fontFamily:'var(--font-jetbrains)', fontSize:'10px', color:'var(--color-outline)'}}>{log.time}</span>
                </div>
                <div className={s.complianceItemMeta}>
                  <span style={{color: log.level === 'gold' ? 'var(--color-primary)' : log.level === 'red' ? 'var(--color-secondary)' : 'inherit'}}>
                    {log.operator}
                  </span>
                  <span>→ {log.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Relatórios Regulatórios */}
      <div className={s.sectionPanel}>
        <div className={s.sectionPanelHeader}>
          <span className={s.sectionPanelTitle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
            RELATÓRIOS REGULATÓRIOS CVM 175
          </span>
          <span className={s.sectionPanelMeta}>EXIBINDO 5 DE 24</span>
        </div>
        <div style={{overflowX:'auto'}}>
          <table className={s.dataTable}>
            <thead>
              <tr>
                <th>Relatório</th>
                <th>Tipo</th>
                <th>Período</th>
                <th className="center">Status</th>
                <th className="center">Auditoria</th>
                <th className="right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'DFP — Demonstrações Financeiras Padronizadas', type: 'CVM 480', period: 'Q2 2026', status: 'done', audit: 'PwC ✓' },
                { name: 'Relatório de Movimentação de Cotas', type: 'CVM 175 Art. 28', period: 'Maio 2026', status: 'done', audit: 'PwC ✓' },
                { name: 'Informe de Custódia — Bunkers', type: 'CVM 175 Art. 44', period: 'Junho 2026', status: 'active', audit: 'Em revisão' },
                { name: 'KYC/AML Trimestral BACEN', type: 'Circular BACEN 3.978', period: 'Q2 2026', status: 'pending', audit: 'Pendente' },
                { name: 'Relatório PEP (Persons Exposed Politically)', type: 'FATF', period: 'Semestral', status: 'draft', audit: 'Rascunho' },
              ].map((rep, i) => (
                <tr key={i}>
                  <td>
                    <div style={{fontWeight:600, fontSize:'13px'}}>{rep.name}</div>
                  </td>
                  <td className="mono" style={{color:'var(--color-on-surface-variant)'}}>{rep.type}</td>
                  <td className="mono">{rep.period}</td>
                  <td className="center">
                    <span className={`${s.statusBadge} ${rep.status === 'done' ? s.statusDone : rep.status === 'active' ? s.statusActive : rep.status === 'pending' ? s.statusPending : s.statusDraft}`}>
                      {rep.status === 'done' ? 'CONCLUÍDO' : rep.status === 'active' ? 'REVISÃO' : rep.status === 'pending' ? 'PENDENTE' : 'RASCUNHO'}
                    </span>
                  </td>
                  <td className="center" style={{fontFamily:'var(--font-jetbrains)', fontSize:'11px', color: rep.audit.includes('✓') ? 'var(--color-verde-liquidacao)' : 'var(--color-outline)'}}>{rep.audit}</td>
                  <td className="right">
                    <div style={{display:'flex', gap:'4px', justifyContent:'flex-end'}}>
                      <button className={s.btnSecondary} style={{padding:'4px 8px', fontSize:'9px'}}>VER</button>
                      <button className={s.btnSecondary} style={{padding:'4px 8px', fontSize:'9px'}}>DOWNLOAD</button>
                    </div>
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
