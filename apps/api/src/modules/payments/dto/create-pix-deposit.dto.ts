import { IsNumber, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePixDepositDto {
  @ApiProperty({ example: 5000, description: 'Valor em BRL (mínimo R$ 1.000)' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(1000)
  amount: number;
}

export class CreateWithdrawalDto {
  @ApiProperty({ example: 2000, description: 'Valor a sacar em BRL (mínimo R$ 500)' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(500)
  amount: number;
}
