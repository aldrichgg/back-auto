import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holding } from './entities/holding.entity';
import dayjs from 'dayjs';

const LOCK_UP_DAYS = 90;
const BROKER_FEE = 0.015; // 1.5%

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Holding)
    private readonly holdingRepo: Repository<Holding>,
  ) {}

  async getHoldings(userId: string): Promise<Holding[]> {
    return this.holdingRepo.find({
      where: { userId },
      relations: ['asset'],
      order: { acquiredAt: 'DESC' },
    });
  }

  async getSummary(userId: string) {
    const holdings = await this.getHoldings(userId);

    let totalEquity = 0;
    let totalCost = 0;

    for (const h of holdings) {
      const currentPrice = Number(h.asset?.lastPrice ?? h.avgCost);
      const currentValue = currentPrice * h.quantity;
      const cost = Number(h.avgCost) * h.quantity;
      totalEquity += currentValue;
      totalCost += cost;
    }

    const unrealizedGain = totalEquity - totalCost;
    const unrealizedGainPercent = totalCost > 0 ? (unrealizedGain / totalCost) * 100 : 0;

    return {
      totalEquity,
      totalCost,
      unrealizedGain,
      unrealizedGainPercent: Math.round(unrealizedGainPercent * 100) / 100,
      holdings,
    };
  }

  async upsertHolding(userId: string, assetId: string, quantity: number, price: number): Promise<void> {
    const existing = await this.holdingRepo.findOne({ where: { userId, assetId } });

    if (existing) {
      // Recalculate weighted average cost
      const totalQuantity = existing.quantity + quantity;
      const newAvgCost =
        (Number(existing.avgCost) * existing.quantity + price * quantity) / totalQuantity;

      await this.holdingRepo.update(existing.id, {
        quantity: totalQuantity,
        avgCost: newAvgCost,
      });
    } else {
      const lockUntil = dayjs().add(LOCK_UP_DAYS, 'day').toDate();
      await this.holdingRepo.save(
        this.holdingRepo.create({ userId, assetId, quantity, avgCost: price, lockUntil }),
      );
    }
  }

  async decrementHolding(userId: string, assetId: string, quantity: number): Promise<void> {
    const holding = await this.holdingRepo.findOneOrFail({ where: { userId, assetId } });

    if (holding.lockUntil && dayjs().isBefore(dayjs(holding.lockUntil))) {
      throw new Error(`Cotas em lock-up até ${dayjs(holding.lockUntil).format('DD/MM/YYYY')}.`);
    }

    if (holding.quantity < quantity) throw new Error('Quantidade insuficiente de cotas.');

    const newQuantity = holding.quantity - quantity;
    if (newQuantity === 0) {
      await this.holdingRepo.delete(holding.id);
    } else {
      await this.holdingRepo.update(holding.id, { quantity: newQuantity });
    }
  }

  async isEligibleToSell(userId: string, assetId: string, quantity: number): Promise<boolean> {
    const holding = await this.holdingRepo.findOne({ where: { userId, assetId } });
    if (!holding || holding.quantity < quantity) return false;
    if (holding.lockUntil && dayjs().isBefore(dayjs(holding.lockUntil))) return false;
    return true;
  }
}
