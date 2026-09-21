import { IsUUID, IsEnum, IsInt, Min, IsNumber, IsPositive, IsOptional, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderSide, OrderType } from '../entities/order.entity';

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-do-ativo' })
  @IsUUID()
  assetId: string;

  @ApiProperty({ enum: OrderSide, example: OrderSide.BUY })
  @IsEnum(OrderSide)
  side: OrderSide;

  @ApiProperty({ enum: OrderType, example: OrderType.LIMIT })
  @IsEnum(OrderType)
  type: OrderType;

  @ApiProperty({ example: 5, description: 'Número de cotas' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({ example: 9200, description: 'Preço por cota (obrigatório para ordens limitadas)' })
  @ValidateIf((o) => o.type === OrderType.LIMIT)
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price?: number;
}
