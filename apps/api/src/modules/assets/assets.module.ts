import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { ProvenanceEntry } from './entities/provenance-entry.entity';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, ProvenanceEntry])],
  providers: [AssetsService],
  controllers: [AssetsController],
  exports: [AssetsService, TypeOrmModule],
})
export class AssetsModule {}
