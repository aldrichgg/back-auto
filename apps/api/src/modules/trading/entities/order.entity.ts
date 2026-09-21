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

export enum OrderSide {
  BUY = 'buy',
  SELL = 'sell',
}

export enum OrderType {
  MARKET = 'market',
  LIMIT = 'limit',
}

export enum OrderStatus {
  OPEN = 'open',
  FILLED = 'filled',
  PARTIAL = 'partial',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

@Entity('orders')
@Index(['userId'])
@Index(['assetId'])
@Index(['status'])
@Index(['assetId', 'side', 'status'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'asset_id' })
  assetId: string;

  @Column({ type: 'enum', enum: OrderSide })
  side: OrderSide;

  @Column({ name: 'order_type', type: 'enum', enum: OrderType })
  orderType: OrderType;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  price: number | null; // null para ordens a mercado

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.OPEN })
  status: OrderStatus;

  @Column({ name: 'filled_quantity', default: 0 })
  filledQuantity: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  totalAmount: number | null; // valor total bloqueado para a ordem

  @Column({ name: 'fee_amount', type: 'decimal', precision: 15, scale: 2, default: 0 })
  feeAmount: number; // taxa de corretagem (1.5%)

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true })
  expiresAt: Date | null;

  @Column({ name: 'filled_at', type: 'timestamptz', nullable: true })
  filledAt: Date | null;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Asset, (asset) => asset.orders)
  @JoinColumn({ name: 'asset_id' })
  asset: Asset;
}
