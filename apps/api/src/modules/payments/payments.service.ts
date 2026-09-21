import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Transaction, TransactionType, TransactionStatus, PaymentMethod } from './entities/transaction.entity';
import { UsersService } from '@modules/users/users.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {}

  async createPixDeposit(userId: string, amount: number) {
    // In production: call Celcoin API to generate PIX QR Code
    const tx = this.transactionRepo.create({
      userId,
      type: TransactionType.DEPOSIT,
      amount,
      currency: 'BRL',
      status: TransactionStatus.PENDING,
      paymentMethod: PaymentMethod.PIX,
    });
    const saved = await this.transactionRepo.save(tx);

    // Mock PIX response — replace with Celcoin integration
    const pixCopyPaste = `00020126580014br.gov.bcb.pix0136${saved.id}5204000053039865802BR5925APEX CAPITAL INVESTIMENTOS6009SAO PAULO62070503***6304ABCD`;

    return {
      transactionId: saved.id,
      pixCopyPaste,
      pixQrCode: `data:image/png;base64,iVBORw0KGgo=`, // QRCode gerado com lib qrcode
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
    };
  }

  async createTedDeposit(userId: string, amount: number) {
    const tx = this.transactionRepo.create({
      userId,
      type: TransactionType.DEPOSIT,
      amount,
      currency: 'BRL',
      status: TransactionStatus.PENDING,
      paymentMethod: PaymentMethod.TED,
    });
    const saved = await this.transactionRepo.save(tx);

    return {
      transactionId: saved.id,
      bankInfo: {
        bank: 'Banco Apex Capital',
        agency: '0001',
        account: `${userId.slice(0, 8).toUpperCase()}`,
        accountType: 'Corrente',
        holder: 'Apex Capital Investimentos LTDA',
        cnpj: '00.000.000/0001-00',
      },
    };
  }

  async requestWithdrawal(userId: string, amount: number) {
    const balance = await this.usersService.getBalance(userId);
    if (balance.available < amount) {
      throw new Error('Saldo insuficiente para saque.');
    }

    await this.usersService.deductBalance(userId, amount);

    const tx = this.transactionRepo.create({
      userId,
      type: TransactionType.WITHDRAWAL,
      amount,
      currency: 'BRL',
      status: TransactionStatus.PENDING,
    });
    const saved = await this.transactionRepo.save(tx);

    return {
      transactionId: saved.id,
      estimatedAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  // Called by Celcoin webhook when PIX is confirmed
  async confirmDeposit(transactionId: string, externalId: string): Promise<void> {
    const tx = await this.transactionRepo.findOneOrFail({ where: { id: transactionId } });
    await this.transactionRepo.update(transactionId, {
      status: TransactionStatus.CONFIRMED,
      externalId,
      confirmedAt: new Date(),
    });
    await this.usersService.updateBalance(tx.userId, Number(tx.amount));
  }

  async getHistory(userId: string, page = 1, limit = 20) {
    const [data, total] = await this.transactionRepo.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}
