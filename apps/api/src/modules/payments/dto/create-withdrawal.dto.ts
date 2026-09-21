import { IsNumber, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWithdrawalDto {
  @ApiProperty({ example: 2000, description: 'Valor a sacar em BRL (mínimo R$ 500)' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(500)
  amount: number;
}
