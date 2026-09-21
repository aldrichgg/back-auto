import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyMfaDto } from './dto/verify-mfa.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from '@common/decorators/public.decorator';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { User } from '@modules/users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @ApiOperation({ summary: 'Cadastro de novo membro Apex' })
  @ApiResponse({ status: 201, description: 'Cadastro realizado, KYC pendente.' })
  @ApiResponse({ status: 409, description: 'E-mail já cadastrado.' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @ApiOperation({ summary: 'Login do membro — Terminal Apex Capital' })
  @ApiResponse({ status: 200, description: 'Autenticado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  @ApiResponse({ status: 403, description: 'MFA requerido ou conta bloqueada.' })
  login(@Request() req: any, @Body() dto: LoginDto) {
    return this.authService.login(req.user, dto.mfaCode);
  }

  @Post('mfa/enable')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation({ summary: 'Habilitar autenticação de dois fatores (TOTP)' })
  @ApiResponse({ status: 200, description: 'QR Code e secret retornados.' })
  enableMfa(@CurrentUser() user: User) {
    return this.authService.enableMfa(user.id);
  }

  @Post('mfa/verify')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation({ summary: 'Verificar e ativar MFA com código TOTP' })
  @ApiResponse({ status: 200, description: 'MFA ativado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Código MFA inválido.' })
  verifyMfa(@CurrentUser() user: User, @Body() dto: VerifyMfaDto) {
    return this.authService.verifyMfa(user.id, dto.code);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('AccessToken')
  @ApiOperation({ summary: 'Encerrar sessão e revogar refresh token' })
  @ApiResponse({ status: 204, description: 'Sessão encerrada.' })
  logout() {
    // Revoke refresh token from Redis in full implementation
    return;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation({ summary: 'Retornar dados do membro autenticado' })
  me(@CurrentUser() user: User) {
    return user;
  }
}
