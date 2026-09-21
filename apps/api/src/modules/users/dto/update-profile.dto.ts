import { IsOptional, IsString, MaxLength, IsMobilePhone, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Ricardo Sanches' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  fullName?: string;

  @ApiPropertyOptional({ example: '+5511998765432' })
  @IsOptional()
  @IsMobilePhone('pt-BR')
  phone?: string;

  @ApiPropertyOptional({ example: 'https://cdn.apexcapital.com.br/avatars/user.jpg' })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
