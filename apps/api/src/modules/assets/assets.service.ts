import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, ILike } from 'typeorm';
import { Asset, AssetStatus } from './entities/asset.entity';
import { ProvenanceEntry } from './entities/provenance-entry.entity';
import { ListAssetsDto } from './dto/list-assets.dto';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepo: Repository<Asset>,
    @InjectRepository(ProvenanceEntry)
    private readonly provenanceRepo: Repository<ProvenanceEntry>,
  ) {}

  async findAll(dto: ListAssetsDto) {
    const { page = 1, limit = 20, status, search, sort = 'created_at' } = dto;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.name = ILike(`%${search}%`);
    }

    const sortMap: Record<string, any> = {
      yield_desc: { yieldTarget: 'DESC' },
      price_asc: { fractionPrice: 'ASC' },
      capture_desc: { availableFractions: 'ASC' },
      created_at: { createdAt: 'DESC' },
    };

    const [data, total] = await this.assetRepo.findAndCount({
      where,
      order: sortMap[sort] ?? { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }

  async findById(id: string): Promise<Asset> {
    const asset = await this.assetRepo.findOne({ where: { id } });
    if (!asset) throw new NotFoundException('Ativo não encontrado.');
    return asset;
  }

  async findProvenance(assetId: string): Promise<ProvenanceEntry[]> {
    return this.provenanceRepo.find({
      where: { assetId },
      order: { sortOrder: 'ASC', year: 'ASC' },
    });
  }

  async decrementAvailableFractions(assetId: string, quantity: number): Promise<void> {
    const asset = await this.findById(assetId);
    if (asset.availableFractions < quantity) {
      throw new BadRequestException('Cotas insuficientes disponíveis.');
    }
    await this.assetRepo.decrement({ id: assetId }, 'availableFractions', quantity);

    // Check if fully captado — update status to secondary
    const updated = await this.findById(assetId);
    if (updated.availableFractions === 0 && updated.status === AssetStatus.IPO) {
      await this.assetRepo.update(assetId, { status: AssetStatus.SECONDARY });
    }
  }

  async updateLastPrice(assetId: string, price: number): Promise<void> {
    await this.assetRepo.update(assetId, { lastPrice: price });
  }

  getCapturedPercent(asset: Asset): number {
    const captured = asset.totalFractions - asset.availableFractions;
    return Math.round((captured / asset.totalFractions) * 100);
  }
}
