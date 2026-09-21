import { IsUUID, IsInt, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 'uuid-do-ativo' })
  @IsUUID()
  assetId: string;

  @ApiProperty({ example: 3 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ enum: ['pix', 'ted'], example: 'pix' })
  @IsEnum(['pix', 'ted'])
  paymentMethod: string;
}
