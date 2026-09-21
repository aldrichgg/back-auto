import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'r.sanches@apexprivate.com.br',
    description: 'E-mail corporativo ou ID de Membro (ex: #APX-882190)',
  })
  @IsString()
  email: string;

  @ApiProperty({ example: 'MinhaChave@2025!', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({ example: '123456', description: 'Código TOTP (6 dígitos) — obrigatório se MFA ativo' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{6}$/, { message: 'Código MFA deve ter exatamente 6 dígitos.' })
  mfaCode?: string;
}
