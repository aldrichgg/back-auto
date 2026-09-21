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
import { Asset } from '@modules/assets/entities/asset.entity';

export enum SubscriptionStatus {
  PENDING_PAYMENT = 'pending_payment',
  PAYMENT_CONFIRMED = 'payment_confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

@Entity('subscriptions')
@Index(['userId'])
@Index(['assetId'])
@Index(['status'])
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'asset_id' })
  assetId: string;

  @Column()
  quantity: number;

  @Column({ name: 'fraction_price', type: 'decimal', precision: 15, scale: 2 })
  fractionPrice: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2 })
  totalAmount: number;

  @Column({ type: 'enum', enum: SubscriptionStatus, default: SubscriptionStatus.PENDING_PAYMENT })
  status: SubscriptionStatus;

  @Column({ name: 'payment_method', length: 20, nullable: true })
  paymentMethod: string | null;

  @Column({ name: 'payment_id', length: 255, nullable: true })
  paymentId: string | null; // ID do pagamento na Celcoin

  @Column({ name: 'pix_qr_code', type: 'text', nullable: true })
  pixQrCode: string | null;

  @Column({ name: 'pix_copy_paste', type: 'text', nullable: true })
  pixCopyPaste: string | null;

  @Column({ name: 'payment_deadline', type: 'timestamptz', nullable: true })
  paymentDeadline: Date | null;

  @Column({ name: 'paid_at', type: 'timestamptz', nullable: true })
  paidAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'asset_id' })
  asset: Asset;
}
