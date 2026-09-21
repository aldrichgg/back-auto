import { Controller, Get, Patch, Body, UseGuards, SerializeOptions } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('AccessToken')
@Controller('profile')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Retornar perfil completo do membro autenticado' })
  getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizar dados de perfil do membro' })
  updateProfile(@CurrentUser() user: User, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(user.id, dto);
  }

  @Get('balance')
  @ApiOperation({ summary: 'Consultar saldo disponível e reservado' })
  getBalance(@CurrentUser() user: User) {
    return this.usersService.getBalance(user.id);
  }
}
