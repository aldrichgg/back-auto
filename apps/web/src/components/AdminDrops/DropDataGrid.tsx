import React from 'react';
import styles from './DropDataGrid.module.css';

const mockDrops = [
  { id: 'DRP-001', asset: 'Ferrari F40 (1987)', supply: 10000, price: 1500, target: 15000000, progress: 100, status: 'Finalizado' },
  { id: 'DRP-002', asset: 'Porsche 911 GT3 RS', supply: 5000, price: 500, target: 2500000, progress: 85, status: 'Ativo' },
  { id: 'DRP-003', asset: 'McLaren P1', supply: 8000, price: 1200, target: 9600000, progress: 0, status: 'Agendado' },
];

export const DropDataGrid: React.FC = () => {
  return (
    <div className={styles.gridContainer}>
      {/* Mobile Card View */}
      <div className={styles.mobileView}>
        {mockDrops.map((drop) => (
          <div key={drop.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.dropId}>{drop.id}</span>
              <span className={`${styles.badge} ${styles['badge' + drop.status]}`}>{drop.status}</span>
            </div>
            <h3 className={styles.assetName}>{drop.asset}</h3>
            
            <div className={styles.cardDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Meta:</span>
                <span className={styles.detailValue}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(drop.target)}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Supply:</span>
                <span className={styles.detailValue}>{drop.supply.toLocaleString()} tokens</span>
              </div>
            </div>

            <div className={styles.progressSection}>
              <div className={styles.progressHeader}>
                <span className={styles.progressLabel}>Captação</span>
                <span className={styles.progressValue}>{drop.progress}%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${drop.progress}%` }}></div>
              </div>
            </div>
            
            <div className={styles.cardActions}>
              <button className={styles.actionBtn}>Gerenciar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className={styles.desktopView}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ativo</th>
              <th>Supply</th>
              <th>Preço (Fração)</th>
              <th>Meta (BRL)</th>
              <th>Progresso</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {mockDrops.map((drop) => (
              <tr key={drop.id}>
                <td className={styles.monoText}>{drop.id}</td>
                <td className={styles.boldText}>{drop.asset}</td>
                <td className={styles.monoText}>{drop.supply.toLocaleString()}</td>
                <td className={styles.monoText}>R$ {drop.price.toLocaleString()}</td>
                <td className={styles.monoText}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(drop.target)}</td>
                <td>
                  <div className={styles.tableProgress}>
                    <div className={styles.tableProgressBar}>
                      <div className={styles.tableProgressFill} style={{ width: `${drop.progress}%` }}></div>
                    </div>
                    <span className={styles.monoText}>{drop.progress}%</span>
                  </div>
                </td>
                <td>
                  <span className={`${styles.badge} ${styles['badge' + drop.status]}`}>{drop.status}</span>
                </td>
                <td>
                  <button className={styles.tableActionBtn}>Gerenciar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
