import React from 'react';
import styles from './OrderBook.module.css';

interface OrderLine {
  price: number;
  amount: number;
  total: number;
  type: 'buy' | 'sell';
}

interface OrderBookProps {
  buyOrders: OrderLine[];
  sellOrders: OrderLine[];
  currentPrice: number;
}

const formatPrice = (value: number) => value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatAmount = (value: number) => value.toString(); // Cotas are integers usually

export const OrderBook: React.FC<OrderBookProps> = ({ buyOrders, sellOrders, currentPrice }) => {
  return (
    <div className={styles.bookContainer}>
      <div className={styles.headerRow}>
        <span className={styles.colHeader}>Preço (R$)</span>
        <span className={styles.colHeader}>Qtd</span>
        <span className={styles.colHeaderRight}>Total</span>
      </div>

      <div className={styles.orderList}>
        {/* Sell orders (Red) - usually displayed descending price */}
        {sellOrders.map((order, idx) => (
          <div key={`sell-${idx}`} className={styles.row}>
            <span className={`${styles.price} ${styles.sellColor}`}>{formatPrice(order.price)}</span>
            <span className={styles.amount}>{formatAmount(order.amount)}</span>
            <span className={styles.total}>{formatPrice(order.total)}</span>
            <div className={styles.depthBar} style={{ width: `${(order.total / 50000) * 100}%`, backgroundColor: 'rgba(225, 29, 72, 0.1)' }} />
          </div>
        ))}
      </div>

      <div className={styles.currentPriceRow}>
        <span className={styles.currentPriceValue}>R$ {formatPrice(currentPrice)}</span>
        <span className={styles.spread}>Spread 0.5%</span>
      </div>

      <div className={styles.orderList}>
        {/* Buy orders (Green) - usually displayed descending price */}
        {buyOrders.map((order, idx) => (
          <div key={`buy-${idx}`} className={styles.row}>
            <span className={`${styles.price} ${styles.buyColor}`}>{formatPrice(order.price)}</span>
            <span className={styles.amount}>{formatAmount(order.amount)}</span>
            <span className={styles.total}>{formatPrice(order.total)}</span>
            <div className={styles.depthBar} style={{ width: `${(order.total / 50000) * 100}%`, backgroundColor: 'rgba(16, 185, 129, 0.1)' }} />
          </div>
        ))}
      </div>
    </div>
  );
};
