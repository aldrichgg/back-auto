import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, KycStatus } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Membro não encontrado.');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<User> {
    await this.repo.update(userId, dto);
    return this.findById(userId);
  }

  async updateKycStatus(userId: string, status: KycStatus): Promise<void> {
    await this.repo.update(userId, { kycStatus: status });
  }

  async updateBalance(userId: string, amount: number): Promise<void> {
    await this.repo.increment({ id: userId }, 'balance', amount);
  }

  async deductBalance(userId: string, amount: number): Promise<void> {
    await this.repo.decrement({ id: userId }, 'balance', amount);
  }

  async reserveBalance(userId: string, amount: number): Promise<void> {
    await this.repo.decrement({ id: userId }, 'balance', amount);
    await this.repo.increment({ id: userId }, 'reservedBalance', amount);
  }

  async releaseReservedBalance(userId: string, amount: number): Promise<void> {
    await this.repo.decrement({ id: userId }, 'reservedBalance', amount);
    await this.repo.increment({ id: userId }, 'balance', amount);
  }

  async getBalance(userId: string): Promise<{ available: number; reserved: number; total: number }> {
    const user = await this.findById(userId);
    return {
      available: Number(user.balance),
      reserved: Number(user.reservedBalance),
      total: Number(user.balance) + Number(user.reservedBalance),
    };
  }
}
