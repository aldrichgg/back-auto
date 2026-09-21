import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Asset } from '@modules/assets/entities/asset.entity';

export enum ProvenanceEventType {
  MANUFACTURE = 'manufacture',
  OWNERSHIP_TRANSFER = 'ownership_transfer',
  RACE_WIN = 'race_win',
  RESTORATION = 'restoration',
  AUCTION = 'auction',
  INSPECTION = 'inspection',
  CUSTODY_APEX = 'custody_apex',
}

@Entity('provenance_entries')
@Index(['assetId'])
export class ProvenanceEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'asset_id' })
  assetId: string;

  @Column({ type: 'enum', enum: ProvenanceEventType })
  eventType: ProvenanceEventType;

  @Column()
  year: number;

  @Column({ length: 500 })
  event: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  owner: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string | null;

  @Column({ default: false })
  verified: boolean;

  @Column({ name: 'document_url', type: 'text', nullable: true })
  documentUrl: string | null;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'asset_id' })
  asset: Asset;
}
