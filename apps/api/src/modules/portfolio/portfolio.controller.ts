import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { User } from '@modules/users/entities/user.entity';
import { PortfolioService } from './portfolio.service';

@ApiTags('portfolio')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('AccessToken')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @ApiOperation({ summary: 'Portfólio completo do membro (holdings + resumo financeiro)' })
  getSummary(@CurrentUser() user: User) {
    return this.portfolioService.getSummary(user.id);
  }

  @Get('holdings')
  @ApiOperation({ summary: 'Lista de cotas em custódia' })
  getHoldings(@CurrentUser() user: User) {
    return this.portfolioService.getHoldings(user.id);
  }
}
