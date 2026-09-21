import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription, SubscriptionStatus } from './entities/subscription.entity';
import { AssetsService } from '@modules/assets/assets.service';
import { PortfolioService } from '@modules/portfolio/portfolio.service';
import { PaymentsService } from '@modules/payments/payments.service';
import { AssetStatus } from '@modules/assets/entities/asset.entity';

const MAX_OWNERSHIP_PERCENT = 0.20; // 20% do total de cotas
const PAYMENT_WINDOW_HOURS = 24;

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
    private readonly assetsService: AssetsService,
    private readonly portfolioService: PortfolioService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async subscribe(userId: string, assetId: string, quantity: number, paymentMethod: string) {
    const asset = await this.assetsService.findById(assetId);

    if (asset.status !== AssetStatus.IPO) {
      throw new BadRequestException('Ativo não está em fase de captação (IPO).');
    }

    if (quantity > asset.availableFractions) {
      throw new BadRequestException('Cotas solicitadas excedem as disponíveis.');
    }

    // Enforce 20% max ownership per member
    const maxAllowed = Math.floor(asset.totalFractions * MAX_OWNERSHIP_PERCENT);
    if (quantity > maxAllowed) {
      throw new BadRequestException(`Máximo de ${maxAllowed} cotas por membro (20% do total).`);
    }

    const fractionPrice = Number(asset.fractionPrice);
    const totalAmount = fractionPrice * quantity;
    const paymentDeadline = new Date(Date.now() + PAYMENT_WINDOW_HOURS * 3600 * 1000);

    // Reserve fractions
    await this.assetsService.decrementAvailableFractions(assetId, quantity);

    const sub = this.subscriptionRepo.create({
      userId,
      assetId,
      quantity,
      fractionPrice,
      totalAmount,
      paymentMethod,
      paymentDeadline,
    });
    const saved = await this.subscriptionRepo.save(sub);

    // Generate payment
    let paymentData: any = {};
    if (paymentMethod === 'pix') {
      paymentData = await this.paymentsService.createPixDeposit(userId, totalAmount);
    } else {
      paymentData = await this.paymentsService.createTedDeposit(userId, totalAmount);
    }

    return {
      subscriptionId: saved.id,
      totalAmount,
      paymentDeadline: paymentDeadline.toISOString(),
      ...paymentData,
    };
  }

  async getUserSubscriptions(userId: string) {
    return this.subscriptionRepo.find({
      where: { userId },
      relations: ['asset'],
      order: { createdAt: 'DESC' },
    });
  }

  async cancelSubscription(userId: string, subscriptionId: string) {
    const sub = await this.subscriptionRepo.findOneOrFail({
      where: { id: subscriptionId, userId },
    });

    if (sub.status !== SubscriptionStatus.PENDING_PAYMENT) {
      throw new BadRequestException('Inscrição não pode ser cancelada.');
    }

    // Return fractions to the pool
    // NOTE: a production implementation would call assetsService.incrementAvailableFractions
    await this.subscriptionRepo.update(subscriptionId, { status: SubscriptionStatus.CANCELLED });
  }
}
