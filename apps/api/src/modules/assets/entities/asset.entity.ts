import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Holding } from '@modules/portfolio/entities/holding.entity';
import { Order } from '@modules/trading/entities/order.entity';

export enum AssetStatus {
  DRAFT = 'draft',
  IPO = 'ipo',
  SECONDARY = 'secondary',
  SOLD = 'sold',
}

@Entity('assets')
@Index(['vin'], { unique: true })
@Index(['status'])
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 17, unique: true })
  vin: string; // Vehicle Identification Number

  @Column({ length: 255 })
  name: string; // ex: "Ferrari F40"

  @Column()
  year: number;

  @Column({ length: 100, nullable: true })
  color: string;

  @Column({ length: 100, nullable: true })
  make: string; // Fabricante: "Ferrari"

  @Column({ length: 100, nullable: true })
  model: string; // Modelo: "F40"

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: AssetStatus, default: AssetStatus.DRAFT })
  status: AssetStatus;

  @Column({ name: 'total_fractions' })
  totalFractions: number;

  @Column({ name: 'available_fractions' })
  availableFractions: number;

  @Column({ name: 'fraction_price', type: 'decimal', precision: 15, scale: 2 })
  fractionPrice: number; // Preço por cota em BRL

  @Column({
    name: 'yield_target',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  yieldTarget: number | null; // % a.a.

  @Column({ name: 'investment_term_months', type: 'int', nullable: true })
  investmentTermMonths: number | null;

  @Column({ type: 'varchar', name: 'custody_location', length: 255, nullable: true })
  custodyLocation: string | null;

  @Column({ name: 'custody_temperature', type: 'decimal', scale: 1, nullable: true })
  custodyTemperature: number | null; // °C

  @Column({ name: 'custody_humidity', type: 'decimal', scale: 1, nullable: true })
  custodyHumidity: number | null; // %

  @Column({ name: 'insurance_value', type: 'decimal', precision: 15, scale: 2, nullable: true })
  insuranceValue: number | null;

  @Column({ type: 'varchar', name: 'insurance_policy', length: 100, nullable: true })
  insurancePolicy: string | null;

  @Column({ name: 'thumbnail_url', type: 'text', nullable: true })
  thumbnailUrl: string | null;

  @Column({ name: 'photos', type: 'text', array: true, default: [] })
  photos: string[];

  @Column({ name: 'ipo_expires_at', type: 'timestamptz', nullable: true })
  ipoExpiresAt: Date | null;

  @Column({ name: 'last_price', type: 'decimal', precision: 15, scale: 2, nullable: true })
  lastPrice: number | null; // Último preço negociado no mercado secundário

  @Column({ name: 'evaluation_url', type: 'text', nullable: true })
  evaluationUrl: string | null; // URL do laudo de avaliação

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Holding, (holding) => holding.asset)
  holdings: Holding[];

  @OneToMany(() => Order, (order) => order.asset)
  orders: Order[];
}
