import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Order } from './order.entity';
import { Asset } from '@modules/assets/entities/asset.entity';

@Entity('trades')
@Index(['assetId'])
@Index(['executedAt'])
export class Trade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'buy_order_id' })
  buyOrderId: string;

  @Column({ name: 'sell_order_id' })
  sellOrderId: string;

  @Column({ name: 'asset_id' })
  assetId: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  price: number;

  @Column({ name: 'total_value', type: 'decimal', precision: 15, scale: 2 })
  totalValue: number; // quantity × price

  @Column({ name: 'buyer_fee', type: 'decimal', precision: 15, scale: 2, default: 0 })
  buyerFee: number;

  @Column({ name: 'seller_fee', type: 'decimal', precision: 15, scale: 2, default: 0 })
  sellerFee: number;

  @CreateDateColumn({ name: 'executed_at', type: 'timestamptz' })
  executedAt: Date;

  @Column({ name: 'settled_at', type: 'timestamptz', nullable: true })
  settledAt: Date | null; // D+1

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'buy_order_id' })
  buyOrder: Order;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'sell_order_id' })
  sellOrder: Order;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'asset_id' })
  asset: Asset;
}
