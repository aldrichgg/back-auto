import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('health')
@Controller({ path: 'health', version: VERSION_NEUTRAL })
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
