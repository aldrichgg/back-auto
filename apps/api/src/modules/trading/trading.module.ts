import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Trade } from './entities/trade.entity';
import { TradingService } from './trading.service';
import { TradingController } from './trading.controller';
import { TradingGateway } from './trading.gateway';
import { AssetsModule } from '@modules/assets/assets.module';
import { PortfolioModule } from '@modules/portfolio/portfolio.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Trade]),
    AssetsModule,
    PortfolioModule,
    UsersModule,
  ],
  providers: [TradingService, TradingGateway],
  controllers: [TradingController],
  exports: [TradingService],
})
export class TradingModule {}
