"use client";

import React, { useState } from 'react';
import s from '../../admin.shared.module.css';

const users = [
  { id: '#APX-882190', initials: 'RS', name: 'Rodrigo Sanches da Silva', email: 'rsanches@sanchesasset.com.br', category: 'APEX PRIVATE / COLECIONADOR', aum: 'R$ 164.820,00', limit: 'R$ 250.000,00', status: 'active', auth: 'YubiKey' },
  { id: '#APX-771024', initials: 'EV', name: 'Dr. Eduardo Prado Vianna', email: 'eprado@viannawealth.ch', category: 'PROFISSIONAL CVM // FAMILY OFFICE', aum: 'R$ 3.000.000,00', limit: 'R$ 1.000.000,00', status: 'pending', auth: 'Key 5Ci' },
  { id: '#APX-553210', initials: 'CM', name: 'Carlos Henrique Mendes', email: 'carlos.mendes@mendescorp.com', category: 'INVESTIDOR QUALIFICADO', aum: 'R$ 850.000,00', limit: 'R$ 500.000,00', status: 'active', auth: 'YubiKey NFC' },
  { id: '#APX-994102', initials: 'RC', name: 'Roberto Civita Jr.', email: 'rcivita@apexvault.vip', category: 'APEX PRIVATE // TITANIUM FOUNDER', aum: 'R$ 5.400.000,00', limit: 'ILIMITADO', status: 'active', auth: 'HSM P-256' },
  { id: '#APX-001795', initials: 'PV', name: 'Pedro Igor Valentim', email: 'pedro.v@pvholding.com', category: 'INVESTIDOR QUALIFICADO', aum: 'R$ 120.000,00', limit: '—', status: 'blocked', auth: 'TOTP' },
  { id: '#APX-221033', initials: 'LR', name: 'Luciana Rocha Figueiredo', email: 'luciana@figueiredofamily.com.br', category: 'PROFISSIONAL CVM', aum: 'R$ 740.000,00', limit: 'R$ 300.000,00', status: 'active', auth: 'FaceID' },
];

const statusConfig = {
  active: { label: 'ATIVO', cls: 'statusActive' as const },
  pending: { label: 'REVISÃO DE LIMITE', cls: 'statusPending' as const },
  blocked: { label: 'SUSPENSO', cls: 'statusBlocked' as const },
};

export default function UsuariosPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === 'Todos' || (statusFilter === 'Ativos' && u.status === 'active') || (statusFilter === 'Em Análise' && u.status === 'pending') || (statusFilter === 'Suspensos' && u.status === 'blocked'))
  );

  return (
    <div className={s.pageContainer}>
      {/* Header Banner */}
      <div className={s.pageHeader}>
        <div>
          <div className={s.pageBreadcrumb}>
            <span>ROOT PRIVILEGE</span><span className={s.sep}>{'//'}</span><span>RBAC GOVERNANCE MODULE</span><span className={s.sep}>{'//'}</span><span>NODE: SA-EAST-BR-1</span>
          </div>
          <h1 className={s.pageTitle}>Gestão Global de Usuários, Investidores & Permissões RBAC</h1>
          <p className={s.pageSubtitle}>Supervisão de identidades, controle de limites operacionais, aprovação manual, revogação de acessos e concessão de privilégios fiduciários sob normas CVM 175 & custódia institucional de ativos físicos.</p>
        </div>
        <div className={s.actionsRow}>
          <button className={s.btnPrimary}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            + CONVIDAR MEMBRO INSTITUCIONAL
          </button>
          <button className={s.btnSecondary}>+ NOVO OPERADOR / AUDITOR</button>
          <button className={s.btnSecondary}>EXPORTAR BASE (LGPD)</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={s.kpiGrid}>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}><span className={s.kpiLabel}>Total Usuários Cadastrados</span><span className={`${s.kpiBadge} ${s.kpiBadgeGold}`}>+4.2% m/m</span></div>
          <div className={s.kpiValue} style={{fontSize:'28px', fontVariantNumeric:'tabular-nums'}}>1.412</div>
          <div className={s.progressBar}>
            <div style={{height:'100%', borderRadius:'2px', display:'flex', overflow:'hidden', width:'100%'}}>
              <div style={{width:'88.3%', background:'var(--color-primary)'}} />
              <div style={{width:'1%', background:'var(--color-tertiary-container)'}} />
              <div style={{width:'10.7%', background:'var(--color-outline)'}} />
            </div>
          </div>
          <div className={s.kpiFooter}><span>1.248 Aprovados</span><span style={{color:'var(--color-tertiary)'}}>14 KYC</span><span>150 Pré-Cad.</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}><span className={s.kpiLabel}>Volume Alocado Médio/Usuário</span></div>
          <div className={`${s.kpiValue} ${s.kpiValueGold}`} style={{fontSize:'18px', fontVariantNumeric:'tabular-nums'}}>R$ 114.460,00</div>
          <p style={{fontFamily:'var(--font-jetbrains)', fontSize:'10px', color:'var(--color-on-surface-variant)', marginTop:'4px'}}>AUM TOTAL: R$ 161.617.520,00</p>
          <div className={s.kpiFooter}><span>Fração Média: 18.4 cotas</span><span style={{color:'var(--color-primary)'}}>Ticket Max: R$ 5.4M</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}><span className={s.kpiLabel}>Investidores Black / Titanium</span><span className={`${s.kpiBadge} ${s.kpiBadgeGold}`}>6.6% BASE</span></div>
          <div className={s.kpiValue} style={{fontSize:'28px', fontVariantNumeric:'tabular-nums'}}>94</div>
          <p style={{fontFamily:'var(--font-jakarta)', fontSize:'12px', color:'var(--color-on-surface-variant)'}}>Concierge Exclusivo Ativo</p>
          <div className={s.kpiFooter}><span>Bunker Passes: 94</span><span style={{color:'var(--color-primary)'}}>Direito a Voto ESG</span></div>
        </div>
        <div className={s.kpiCard}>
          <div className={s.kpiHeader}><span className={s.kpiLabel}>Bloqueios & Travas Cautelares</span><span className={`${s.kpiBadge} ${s.kpiBadgeRed}`}>QUARANTINE</span></div>
          <div className={`${s.kpiValue} ${s.kpiValueRed}`} style={{fontSize:'28px', fontVariantNumeric:'tabular-nums'}}>02</div>
          <p style={{fontFamily:'var(--font-jakarta)', fontSize:'12px', color:'var(--color-on-surface-variant)'}}>CVM Art. 32 — Compliance Flag</p>
          <div className={s.kpiFooter}><span style={{color:'var(--color-secondary)'}}>Alçadas Congeladas</span><span>Ver Parecer</span></div>
        </div>
      </div>

      {/* Search + Filter Toolbar */}
      <div className={s.toolbar}>
        <div className={s.toolbarRow}>
          <input className={s.searchInput} value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por Nome, CPF/CNPJ, ID Fiduciário (#APX-), Chave HSM ou E-mail..." />
          <div style={{display:'flex', gap:'4px', alignItems:'center', flexWrap:'wrap'}}>
            <span style={{fontFamily:'var(--font-jetbrains)', fontSize:'10px', color:'var(--color-outline)', marginRight:'4px'}}>STATUS:</span>
            {['Todos', 'Ativos', 'Em Análise', 'Suspensos'].map(f => (
              <button key={f} onClick={() => setStatusFilter(f)} className={`${s.filterPill} ${statusFilter === f ? s.filterPillActive : ''}`}>{f} {f === 'Todos' ? `(${users.length})` : ''}</button>
            ))}
          </div>
        </div>
        <div className={s.toolbarRow} style={{borderTop:'1px solid rgba(255,255,255,0.04)', paddingTop:'8px', gap:'4px'}}>
          <span style={{fontFamily:'var(--font-jetbrains)', fontSize:'10px', color:'var(--color-outline)'}}>SEGMENTO & PAPEL:</span>
          {['Todos os Perfis', 'Apex Private (94)', 'Profissionais CVM (312)', 'Qualificados (842)', 'Mesa Compliance (6)', 'Custodiantes Bunker (4)', 'SuperAdmin Root (2)'].map(f => (
            <button key={f} className={`${s.filterPill}`} style={{fontSize:'9px'}}>{f}</button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className={s.sectionPanel}>
        <div className={s.sectionPanelHeader}>
          <span className={s.sectionPanelTitle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="9" x2="9" y2="21"/></svg>
            LIVRO DE USUÁRIOS & MATRIZ DE ACESSO HSM
          </span>
          <span className={s.sectionPanelMeta}>EXIBINDO {filtered.length} DE 1.412 REGISTROS AUDITADOS</span>
        </div>
        <div style={{overflowX:'auto'}}>
          <table className={s.dataTable}>
            <thead>
              <tr>
                <th>Usuário / ID Fiduciário</th>
                <th>Categoria / Perfil CVM</th>
                <th className="right">Patrimônio Apex (AUM)</th>
                <th className="right">Limite Diário Aprovado</th>
                <th className="center">Status da Conta</th>
                <th className="center">2FA / Hardware HSM</th>
                <th className="right">Ações Fiduciárias</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => {
                const st = statusConfig[user.status as keyof typeof statusConfig];
                return (
                  <tr key={user.id} style={{background: user.status === 'blocked' ? 'rgba(204,0,60,0.02)' : user.status === 'pending' ? 'rgba(255,195,123,0.02)' : undefined}}>
                    <td>
                      <div className={s.userCell}>
                        <div className={s.userAvatar} style={{color: user.status === 'blocked' ? 'var(--color-secondary)' : user.status === 'pending' ? 'var(--color-tertiary)' : undefined, borderColor: user.status === 'blocked' ? 'rgba(204,0,60,0.2)' : user.status === 'pending' ? 'rgba(255,195,123,0.2)' : undefined}}>
                          {user.initials}
                        </div>
                        <div>
                          <div className={s.userName}>{user.name}</div>
                          <div className={s.userId}>{user.id} · {user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{fontFamily:'var(--font-jetbrains)', fontSize:'10px', fontWeight:600, color:'var(--color-on-surface)', letterSpacing:'0.04em'}}>{user.category}</div>
                    </td>
                    <td className="right mono" style={{color:'var(--color-on-surface)', fontWeight:600}}>{user.aum}</td>
                    <td className="right mono" style={{color: user.status === 'pending' ? 'var(--color-tertiary)' : 'var(--color-primary)'}}>{user.limit}</td>
                    <td className="center">
                      <span className={`${s.statusBadge} ${s[st.cls]}`}>{st.label}</span>
                    </td>
                    <td className="center">
                      <span style={{fontFamily:'var(--font-jetbrains)', fontSize:'10px', background:'var(--color-surface-container-high)', padding:'3px 8px', borderRadius:'2px', color: user.auth.includes('HSM') ? 'var(--color-primary)' : 'var(--color-on-surface-variant)'}}>
                        🔑 {user.auth}
                      </span>
                    </td>
                    <td className="right">
                      <div style={{display:'flex', gap:'4px', justifyContent:'flex-end'}}>
                        {user.status === 'pending' ? (
                          <>
                            <button className={s.btnPrimary} style={{padding:'4px 8px', fontSize:'9px'}}>APROVAR LIMITE</button>
                            <button className={s.btnDanger} style={{padding:'4px 8px', fontSize:'9px'}}>RECUSAR</button>
                          </>
                        ) : (
                          <>
                            <button className={`${s.carActionBtn} ${s.carActionBtnMuted}`} style={{fontSize:'9px', padding:'4px 8px'}}>⚙ GERENCIAR</button>
                            {user.status !== 'blocked' && <button className={`${s.carActionBtn} ${s.carActionBtnDanger}`} style={{fontSize:'9px', padding:'4px 8px'}}>🚫 SUSPENDER</button>}
                          </>
                        )}
                        <button className={s.btnPrimary} style={{padding:'4px 8px', fontSize:'9px'}}>AUDITAR</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
