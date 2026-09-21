import { Controller, Post, Get, Delete, Body, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { User } from '@modules/users/entities/user.entity';
import { MarketplaceService } from './marketplace.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@ApiTags('marketplace')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('AccessToken')
@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Inscrever-se em um IPO e gerar pagamento' })
  subscribe(@CurrentUser() user: User, @Body() dto: CreateSubscriptionDto) {
    return this.marketplaceService.subscribe(user.id, dto.assetId, dto.quantity, dto.paymentMethod);
  }

  @Get('subscriptions')
  @ApiOperation({ summary: 'Listar inscrições do membro em IPOs' })
  getSubscriptions(@CurrentUser() user: User) {
    return this.marketplaceService.getUserSubscriptions(user.id);
  }

  @Delete('subscriptions/:id')
  @ApiOperation({ summary: 'Cancelar inscrição em IPO (apenas se pagamento pendente)' })
  cancelSubscription(@CurrentUser() user: User, @Param('id', ParseUUIDPipe) id: string) {
    return this.marketplaceService.cancelSubscription(user.id, id);
  }
}
