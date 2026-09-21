import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import { User, KycStatus } from '@modules/users/entities/user.entity';
import { UsersService } from '@modules/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 30;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ── Registration ─────────────────────────────────────────
  async register(dto: RegisterDto): Promise<{ memberId: string; message: string }> {
    const existing = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new ConflictException('E-mail já cadastrado.');

    const hash = await bcrypt.hash(dto.password, this.config.get<number>('BCRYPT_ROUNDS', 12));
    const memberId = this.generateMemberId();

    const user = this.usersRepo.create({
      ...dto,
      memberId,
      passwordHash: hash,
      kycStatus: KycStatus.PENDING,
    });
    await this.usersRepo.save(user);

    return {
      memberId,
      message:
        'Cadastro realizado! Aguarde a aprovação do KYC em até 3 dias úteis.',
    };
  }

  // ── Validate Credentials (used by LocalStrategy) ─────────
  async validateCredentials(emailOrId: string, password: string): Promise<User> {
    const isEmail = emailOrId.includes('@');
    const user = isEmail
      ? await this.usersRepo.findOne({ where: { email: emailOrId } })
      : await this.usersRepo.findOne({ where: { memberId: emailOrId } });

    if (!user || !user.isActive) throw new UnauthorizedException('Credenciais inválidas.');

    // Lockout check
    if (user.lockedUntil && dayjs().isBefore(dayjs(user.lockedUntil))) {
      throw new ForbiddenException(
        `Conta bloqueada. Tente novamente após ${dayjs(user.lockedUntil).format('HH:mm')}.`,
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      await this.handleFailedLogin(user);
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // Reset failed attempts on success
    await this.usersRepo.update(user.id, {
      failedLoginAttempts: 0,
      lockedUntil: null,
      lastLoginAt: new Date(),
    });

    return user;
  }

  // ── Login ─────────────────────────────────────────────────
  async login(user: User, mfaCode?: string) {
    if (user.mfaEnabled) {
      if (!mfaCode) throw new ForbiddenException('MFA_REQUIRED');
      const valid = speakeasy.totp.verify({
        secret: user.mfaSecret!,
        encoding: 'base32',
        token: mfaCode,
        window: 1,
      });
      if (!valid) throw new UnauthorizedException('Código MFA inválido.');
    }

    const payload = { sub: user.id, email: user.email, tier: user.tier };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken();

    // Persist refresh token in Redis (via cache service) — simplified here
    return {
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 min in seconds
      member: {
        id: user.id,
        memberId: user.memberId,
        email: user.email,
        fullName: user.fullName,
        tier: user.tier,
        kycStatus: user.kycStatus,
        mfaEnabled: user.mfaEnabled,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
      },
    };
  }

  // ── Enable MFA ────────────────────────────────────────────
  async enableMfa(userId: string) {
    const secret = speakeasy.generateSecret({
      name: `Apex Capital (${userId})`,
      length: 32,
    });

    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url!);

    // Save secret (encrypted in production) temporarily for verification
    await this.usersRepo.update(userId, { mfaSecret: secret.base32 });

    return { qrCodeUrl, secret: secret.base32 };
  }

  // ── Verify & Activate MFA ─────────────────────────────────
  async verifyMfa(userId: string, code: string) {
    const user = await this.usersRepo.findOneOrFail({ where: { id: userId } });
    if (!user.mfaSecret) throw new BadRequestException('MFA não foi iniciado.');

    const valid = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: code,
      window: 1,
    });

    if (!valid) throw new UnauthorizedException('Código MFA inválido.');

    await this.usersRepo.update(userId, { mfaEnabled: true });
    return { confirmed: true };
  }

  // ── Helpers ───────────────────────────────────────────────
  private generateMemberId(): string {
    const num = Math.floor(100000 + Math.random() * 900000);
    return `APX-${num}`;
  }

  private generateRefreshToken(): string {
    return uuidv4();
  }

  private async handleFailedLogin(user: User): Promise<void> {
    const attempts = user.failedLoginAttempts + 1;
    const update: Partial<User> = { failedLoginAttempts: attempts };

    if (attempts >= MAX_FAILED_ATTEMPTS) {
      update.lockedUntil = dayjs().add(LOCKOUT_MINUTES, 'minute').toDate();
      update.failedLoginAttempts = 0;
    }

    await this.usersRepo.update(user.id, update);
  }
}
