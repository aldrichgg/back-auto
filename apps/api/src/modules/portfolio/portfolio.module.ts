import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holding } from './entities/holding.entity';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { AssetsModule } from '@modules/assets/assets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Holding]), AssetsModule],
  providers: [PortfolioService],
  controllers: [PortfolioController],
  exports: [PortfolioService, TypeOrmModule],
})
export class PortfolioModule {}
