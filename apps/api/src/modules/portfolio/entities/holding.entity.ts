import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { User } from '@modules/users/entities/user.entity';
import { Asset } from '@modules/assets/entities/asset.entity';

@Entity('holdings')
@Unique(['userId', 'assetId'])
@Index(['userId'])
@Index(['assetId'])
export class Holding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'asset_id' })
  assetId: string;

  @Column()
  quantity: number;

  @Column({ name: 'avg_cost', type: 'decimal', precision: 15, scale: 2 })
  avgCost: number; // Custo médio de aquisição por cota

  @Column({ name: 'lock_until', type: 'timestamptz', nullable: true })
  lockUntil: Date | null; // Lock-up de 90 dias após compra

  @CreateDateColumn({ name: 'acquired_at', type: 'timestamptz' })
  acquiredAt: Date;

  @ManyToOne(() => User, (user) => user.holdings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Asset, (asset) => asset.holdings)
  @JoinColumn({ name: 'asset_id' })
  asset: Asset;
}
