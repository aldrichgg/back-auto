import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { ConciergeService } from './concierge.service';

@ApiTags('concierge')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('AccessToken')
@Controller('concierge')
export class ConciergeController {
  constructor(private readonly conciergeService: ConciergeService) {}

  @Get('services')
  @ApiOperation({ summary: 'Listar serviços Apex Concierge disponíveis' })
  getServices() {
    return this.conciergeService.getServices();
  }

  @Get('manager')
  @ApiOperation({ summary: 'Obter dados do gerente de conta dedicado' })
  getManager() {
    return this.conciergeService.getManager();
  }
}
