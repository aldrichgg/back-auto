import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '@modules/users/entities/user.entity';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  PURCHASE = 'purchase',
  SALE = 'sale',
  INCOME = 'income',
  FEE = 'fee',
  REFUND = 'refund',
}

export enum TransactionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
  REVERSED = 'reversed',
}

export enum PaymentMethod {
  PIX = 'pix',
  TED = 'ted',
  INTERNAL = 'internal',
}

@Entity('transactions')
@Index(['userId'])
@Index(['status'])
@Index(['type'])
@Index(['createdAt'])
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({ length: 3, default: 'BRL' })
  currency: string;

  @Column({ type: 'enum', enum: TransactionStatus, default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @Column({ type: 'enum', enum: PaymentMethod, name: 'payment_method', nullable: true })
  paymentMethod: PaymentMethod | null;

  @Column({ length: 255, nullable: true })
  reference: string | null; // ID do PIX, TED, etc.

  @Column({ name: 'external_id', length: 255, nullable: true })
  externalId: string | null; // ID na Celcoin / banco

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'asset_id', nullable: true })
  assetId: string | null; // Para compra/venda de cotas

  @Column({ name: 'ir_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
  irAmount: number; // IR retido na fonte

  @Column({ name: 'confirmed_at', type: 'timestamptz', nullable: true })
  confirmedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
