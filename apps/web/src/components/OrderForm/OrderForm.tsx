import React, { useState } from 'react';
import styles from './OrderForm.module.css';

interface OrderFormProps {
  side: 'buy' | 'sell';
}

export const OrderForm: React.FC<OrderFormProps> = ({ side }) => {
  const [orderType, setOrderType] = useState<'mercado' | 'limitada'>('limitada');
  const [amount, setAmount] = useState('1');
  const [price, setPrice] = useState('8500.00');

  const total = parseFloat(amount || '0') * parseFloat(price || '0');

  return (
    <div className={styles.formContainer}>
      <div className={styles.typeSelector}>
        <button 
          className={`${styles.typeBtn} ${orderType === 'limitada' ? styles.active : ''}`}
          onClick={() => setOrderType('limitada')}
        >
          Limitada
        </button>
        <button 
          className={`${styles.typeBtn} ${orderType === 'mercado' ? styles.active : ''}`}
          onClick={() => setOrderType('mercado')}
        >
          Mercado
        </button>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Preço (R$)</label>
        <input 
          type="number" 
          className={styles.input} 
          value={orderType === 'mercado' ? '' : price} 
          onChange={e => setPrice(e.target.value)}
          disabled={orderType === 'mercado'}
          placeholder={orderType === 'mercado' ? 'Preço a mercado' : '0.00'}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Quantidade (Cotas)</label>
        <input 
          type="number" 
          className={styles.input} 
          value={amount} 
          onChange={e => setAmount(e.target.value)}
          min="1"
        />
      </div>

      <div className={styles.summary}>
        <span className={styles.summaryLabel}>Total Estimado</span>
        <span className={styles.summaryValue}>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      </div>

      <button className={`${styles.submitBtn} ${side === 'buy' ? styles.btnBuy : styles.btnSell}`}>
        {side === 'buy' ? 'Confirmar Compra' : 'Confirmar Venda'}
      </button>
    </div>
  );
};
