import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check da API' })
  check() {
    return {
      status: 'ok',
      service: 'AutoEquity Apex Capital API',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
