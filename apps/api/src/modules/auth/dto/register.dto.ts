import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsMobilePhone,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Ricardo Sanches' })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  fullName: string;

  @ApiProperty({ example: 'r.sanches@apexprivate.com.br' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Apex@Capital2025!',
    description: 'Mínimo 8 caracteres, letras maiúsculas, minúsculas, números e símbolos.',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#^])[A-Za-z\d@$!%*?&_#^]{8,}$/,
    { message: 'Senha fraca. Use maiúsculas, minúsculas, números e símbolos.' },
  )
  password: string;

  @ApiPropertyOptional({ example: '123.456.789-00' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido.' })
  cpf?: string;

  @ApiPropertyOptional({ example: '+5511998765432' })
  @IsOptional()
  @IsMobilePhone('pt-BR', {}, { message: 'Telefone inválido.' })
  phone?: string;
}
