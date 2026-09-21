import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyMfaDto {
  @ApiProperty({ example: '123456', description: 'Código TOTP de 6 dígitos' })
  @IsString()
  @Matches(/^\d{6}$/, { message: 'Código MFA deve ter exatamente 6 dígitos.' })
  code: string;
}
