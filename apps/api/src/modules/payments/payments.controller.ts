import { Controller, Post, Get, Body, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { User } from '@modules/users/entities/user.entity';
import { PaymentsService } from './payments.service';
import { UsersService } from '@modules/users/users.service';
import { CreatePixDepositDto } from './dto/create-pix-deposit.dto';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';

@ApiTags('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('AccessToken')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly usersService: UsersService,
  ) {}

  @Post('deposit/pix')
  @ApiOperation({ summary: 'Gerar QR Code PIX para depósito' })
  createPixDeposit(@CurrentUser() user: User, @Body() dto: CreatePixDepositDto) {
    return this.paymentsService.createPixDeposit(user.id, dto.amount);
  }

  @Post('deposit/ted')
  @ApiOperation({ summary: 'Obter dados bancários para depósito via TED' })
  createTedDeposit(@CurrentUser() user: User, @Body() dto: CreatePixDepositDto) {
    return this.paymentsService.createTedDeposit(user.id, dto.amount);
  }

  @Post('withdraw')
  @ApiOperation({ summary: 'Solicitar saque para conta cadastrada' })
  requestWithdrawal(@CurrentUser() user: User, @Body() dto: CreateWithdrawalDto) {
    return this.paymentsService.requestWithdrawal(user.id, dto.amount);
  }

  @Get('history')
  @ApiOperation({ summary: 'Extrato de movimentações financeiras' })
  getHistory(
    @CurrentUser() user: User,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.paymentsService.getHistory(user.id, page, limit);
  }

  @Get('balance')
  @ApiOperation({ summary: 'Consultar saldo disponível e reservado' })
  getBalance(@CurrentUser() user: User) {
    return this.usersService.getBalance(user.id);
  }
}
