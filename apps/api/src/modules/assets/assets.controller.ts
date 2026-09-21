import { Controller, Get, Param, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { AssetsService } from './assets.service';
import { ListAssetsDto } from './dto/list-assets.dto';

@ApiTags('assets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('AccessToken')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar ativos disponíveis (marketplace / garagem)' })
  findAll(@Query() dto: ListAssetsDto) {
    return this.assetsService.findAll(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhe completo de um ativo' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.assetsService.findById(id);
  }

  @Get(':id/provenance')
  @ApiOperation({ summary: 'Linha do tempo de proveniência do ativo' })
  getProvenance(@Param('id', ParseUUIDPipe) id: string) {
    return this.assetsService.findProvenance(id);
  }
}
