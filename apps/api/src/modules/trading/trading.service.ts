import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order, OrderSide, OrderStatus, OrderType } from './entities/order.entity';
import { Trade } from './entities/trade.entity';
import { AssetsService } from '@modules/assets/assets.service';
import { PortfolioService } from '@modules/portfolio/portfolio.service';
import { UsersService } from '@modules/users/users.service';
import { TradingGateway } from './trading.gateway';
import { CreateOrderDto } from './dto/create-order.dto';
import dayjs from 'dayjs';

const BROKER_FEE_RATE = 0.015; // 1.5%
const ORDER_TTL_DAYS = 30;

@Injectable()
export class TradingService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Trade) private readonly tradeRepo: Repository<Trade>,
    private readonly assetsService: AssetsService,
    private readonly portfolioService: PortfolioService,
    private readonly usersService: UsersService,
    private readonly gateway: TradingGateway,
    private readonly dataSource: DataSource,
  ) {}

  async createOrder(userId: string, dto: CreateOrderDto): Promise<Order> {
    const asset = await this.assetsService.findById(dto.assetId);

    if (dto.side === OrderSide.SELL) {
      const eligible = await this.portfolioService.isEligibleToSell(userId, dto.assetId, dto.quantity);
      if (!eligible) throw new ForbiddenException('Cotas em lock-up ou quantidade insuficiente.');
    }

    const price = dto.type === OrderType.MARKET
      ? Number(asset.lastPrice ?? asset.fractionPrice)
      : dto.price!;

    const totalAmount = price * dto.quantity;
    const feeAmount = totalAmount * BROKER_FEE_RATE;

    if (dto.side === OrderSide.BUY) {
      const balance = await this.usersService.getBalance(userId);
      if (balance.available < totalAmount + feeAmount) {
        throw new BadRequestException('Saldo insuficiente para cobrir o valor e a taxa.');
      }
      await this.usersService.reserveBalance(userId, totalAmount + feeAmount);
    }

    const order = this.orderRepo.create({
      userId,
      assetId: dto.assetId,
      side: dto.side,
      orderType: dto.type,
      quantity: dto.quantity,
      price: dto.type === OrderType.LIMIT ? dto.price : null,
      totalAmount,
      feeAmount,
      expiresAt: dto.type === OrderType.LIMIT
        ? dayjs().add(ORDER_TTL_DAYS, 'day').toDate()
        : null,
    });

    const saved = await this.orderRepo.save(order);
    await this.matchOrders(dto.assetId);
    return saved;
  }

  async cancelOrder(userId: string, orderId: string): Promise<void> {
    const order = await this.orderRepo.findOneOrFail({ where: { id: orderId, userId } });

    if (order.status !== OrderStatus.OPEN && order.status !== OrderStatus.PARTIAL) {
      throw new BadRequestException('Ordem não pode ser cancelada.');
    }

    const remainingQty = order.quantity - order.filledQuantity;
    const remainingAmount = (order.totalAmount ?? 0) * (remainingQty / order.quantity);

    if (order.side === OrderSide.BUY) {
      await this.usersService.releaseReservedBalance(userId, remainingAmount);
    }

    await this.orderRepo.update(orderId, { status: OrderStatus.CANCELLED });
  }

  async getOrderBook(assetId: string) {
    const bids = await this.orderRepo
      .createQueryBuilder('o')
      .select(['o.price', 'SUM(o.quantity - o.filled_quantity) AS quantity', 'COUNT(*) AS orderCount'])
      .where('o.assetId = :assetId AND o.side = :side AND o.status IN (:...statuses)', {
        assetId,
        side: OrderSide.BUY,
        statuses: [OrderStatus.OPEN, OrderStatus.PARTIAL],
      })
      .groupBy('o.price')
      .orderBy('o.price', 'DESC')
      .limit(10)
      .getRawMany();

    const asks = await this.orderRepo
      .createQueryBuilder('o')
      .select(['o.price', 'SUM(o.quantity - o.filled_quantity) AS quantity', 'COUNT(*) AS orderCount'])
      .where('o.assetId = :assetId AND o.side = :side AND o.status IN (:...statuses)', {
        assetId,
        side: OrderSide.SELL,
        statuses: [OrderStatus.OPEN, OrderStatus.PARTIAL],
      })
      .groupBy('o.price')
      .orderBy('o.price', 'ASC')
      .limit(10)
      .getRawMany();

    const asset = await this.assetsService.findById(assetId);

    return {
      assetId,
      lastPrice: asset.lastPrice ?? asset.fractionPrice,
      bids,
      asks,
      lastUpdatedAt: new Date().toISOString(),
    };
  }

  // ── Order Matching Engine ─────────────────────────────────
  private async matchOrders(assetId: string): Promise<void> {
    // Simple price-time priority matching
    const openAsks = await this.orderRepo.find({
      where: { assetId, side: OrderSide.SELL, status: OrderStatus.OPEN },
      order: { price: 'ASC', createdAt: 'ASC' },
    });

    const openBids = await this.orderRepo.find({
      where: { assetId, side: OrderSide.BUY, status: OrderStatus.OPEN },
      order: { price: 'DESC', createdAt: 'ASC' },
    });

    for (const bid of openBids) {
      for (const ask of openAsks) {
        if (!bid.price || !ask.price) continue;
        if (Number(bid.price) < Number(ask.price)) break;

        const tradeQty = Math.min(
          bid.quantity - bid.filledQuantity,
          ask.quantity - ask.filledQuantity,
        );
        const tradePrice = Number(ask.price);

        if (tradeQty <= 0) continue;

        await this.dataSource.transaction(async (em) => {
          const trade = em.create(Trade, {
            buyOrderId: bid.id,
            sellOrderId: ask.id,
            assetId,
            quantity: tradeQty,
            price: tradePrice,
            totalValue: tradePrice * tradeQty,
          });
          await em.save(trade);

          // Update orders
          const bidNewFilled = bid.filledQuantity + tradeQty;
          const askNewFilled = ask.filledQuantity + tradeQty;

          await em.update(Order, bid.id, {
            filledQuantity: bidNewFilled,
            status: bidNewFilled >= bid.quantity ? OrderStatus.FILLED : OrderStatus.PARTIAL,
            filledAt: bidNewFilled >= bid.quantity ? new Date() : undefined,
          });

          await em.update(Order, ask.id, {
            filledQuantity: askNewFilled,
            status: askNewFilled >= ask.quantity ? OrderStatus.FILLED : OrderStatus.PARTIAL,
            filledAt: askNewFilled >= ask.quantity ? new Date() : undefined,
          });
        });

        // Update portfolio and balances
        await this.portfolioService.upsertHolding(bid.userId, assetId, tradeQty, tradePrice);
        await this.portfolioService.decrementHolding(ask.userId, assetId, tradeQty);
        await this.assetsService.updateLastPrice(assetId, tradePrice);

        // Broadcast to WebSocket room
        const orderBook = await this.getOrderBook(assetId);
        this.gateway.emitOrderBookUpdate(assetId, orderBook);
        this.gateway.emitPriceTick(assetId, { assetId, lastPrice: tradePrice });
      }
    }
  }
}
