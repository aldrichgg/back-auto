import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { Holding } from '@modules/portfolio/entities/holding.entity';
import { Order } from '@modules/trading/entities/order.entity';
import { Transaction } from '@modules/payments/entities/transaction.entity';

export enum UserTier {
  SELECT = 'select',
  PRIVATE = 'private',
  ULTRA = 'ultra',
}

export enum KycStatus {
  PENDING = 'pending',
  IN_REVIEW = 'in_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('users')
@Index(['email'], { unique: true })
@Index(['memberId'], { unique: true })
@Index(['cpf'], { unique: true, where: '"cpf" IS NOT NULL' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'member_id', length: 12, unique: true, nullable: true })
  memberId: string;

  @Column({ length: 255, unique: true })
  email: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ name: 'password_hash', type: 'text' })
  passwordHash: string;

  @Column({ name: 'full_name', length: 255 })
  fullName: string;

  @Column({ length: 14, nullable: true })
  cpf: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserTier,
    default: UserTier.SELECT,
  })
  tier: UserTier;

  @Column({
    name: 'kyc_status',
    type: 'enum',
    enum: KycStatus,
    default: KycStatus.PENDING,
  })
  kycStatus: KycStatus;

  @Column({ name: 'mfa_enabled', default: false })
  mfaEnabled: boolean;

  @ApiHideProperty()
  @Exclude()
  @Column({ name: 'mfa_secret', type: 'text', nullable: true })
  mfaSecret: string | null;

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl: string | null;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'is_pep', default: false })
  isPep: boolean; // Pessoa Exposta Politicamente

  @Column({ name: 'failed_login_attempts', default: 0 })
  failedLoginAttempts: number;

  @Column({ name: 'locked_until', type: 'timestamptz', nullable: true })
  lockedUntil: Date | null;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt: Date | null;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  balance: number; // Saldo disponível em BRL

  @Column({
    name: 'reserved_balance',
    type: 'decimal',
    precision: 15,
    scale: 2,
    default: 0,
  })
  reservedBalance: number; // Saldo reservado em ordens abertas

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Holding, (holding) => holding.user)
  holdings: Holding[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Transaction, (tx) => tx.user)
  transactions: Transaction[];
}
