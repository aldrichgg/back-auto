import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { MarketplaceService } from './marketplace.service';
import { MarketplaceController } from './marketplace.controller';
import { AssetsModule } from '@modules/assets/assets.module';
import { PortfolioModule } from '@modules/portfolio/portfolio.module';
import { PaymentsModule } from '@modules/payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    AssetsModule,
    PortfolioModule,
    PaymentsModule,
  ],
  providers: [MarketplaceService],
  controllers: [MarketplaceController],
  exports: [MarketplaceService],
})
export class MarketplaceModule {}
