import React from 'react';
import styles from './Orderbook.module.css';

const asks = [
  { price: 1515, size: 200, depth: 100 },
  { price: 1510, size: 350, depth: 85 },
  { price: 1505, size: 120, depth: 60 },
  { price: 1502, size: 50, depth: 30 },
];

const bids = [
  { price: 1498, size: 100, depth: 40 },
  { price: 1495, size: 250, depth: 75 },
  { price: 1490, size: 400, depth: 95 },
  { price: 1485, size: 150, depth: 55 },
];

export const Orderbook: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Livro de Ofertas</h3>
        <div className={styles.spread}>Spread: R$ 4,00</div>
      </div>
      
      <div className={styles.tableHeader}>
        <span>Preço (R$)</span>
        <span>Quantidade</span>
        <span>Total</span>
      </div>

      <div className={styles.bookArea}>
        {/* Asks (Venda) */}
        <div className={styles.asks}>
          {asks.map((ask, i) => (
            <div key={i} className={styles.row}>
              <div className={styles.depthBar} style={{ width: `${ask.depth}%`, backgroundColor: 'rgba(235, 87, 87, 0.1)' }} />
              <span className={styles.askPrice}>{ask.price.toLocaleString('pt-BR')}</span>
              <span>{ask.size}</span>
              <span>{(ask.price * ask.size).toLocaleString('pt-BR')}</span>
            </div>
          ))}
        </div>

        {/* Current Price */}
        <div className={styles.currentPriceArea}>
          <span className={styles.currentPrice}>R$ 1.500,00</span>
          <span className={styles.priceDirection}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          </span>
        </div>

        {/* Bids (Compra) */}
        <div className={styles.bids}>
          {bids.map((bid, i) => (
            <div key={i} className={styles.row}>
              <div className={styles.depthBar} style={{ width: `${bid.depth}%`, backgroundColor: 'rgba(56, 176, 0, 0.1)' }} />
              <span className={styles.bidPrice}>{bid.price.toLocaleString('pt-BR')}</span>
              <span>{bid.size}</span>
              <span>{(bid.price * bid.size).toLocaleString('pt-BR')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
