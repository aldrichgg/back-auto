import { Controller, Post, Delete, Get, Body, Param, ParseUUIDPipe, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { User } from '@modules/users/entities/user.entity';
import { TradingService } from './trading.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('trading')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('AccessToken')
@Controller('trading')
export class TradingController {
  constructor(private readonly tradingService: TradingService) {}

  @Get('orderbook/:assetId')
  @ApiOperation({ summary: 'Livro de ordens de um ativo' })
  getOrderBook(@Param('assetId', ParseUUIDPipe) assetId: string) {
    return this.tradingService.getOrderBook(assetId);
  }

  @Post('orders')
  @ApiOperation({ summary: 'Criar ordem de compra ou venda no mercado secundário' })
  createOrder(@CurrentUser() user: User, @Body() dto: CreateOrderDto) {
    return this.tradingService.createOrder(user.id, dto);
  }

  @Delete('orders/:id')
  @ApiOperation({ summary: 'Cancelar ordem aberta' })
  cancelOrder(@CurrentUser() user: User, @Param('id', ParseUUIDPipe) id: string) {
    return this.tradingService.cancelOrder(user.id, id);
  }
}
