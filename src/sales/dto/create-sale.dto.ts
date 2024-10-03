import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateSaleDto {
  @ApiProperty({ description: 'ID du produit vendu' })
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'Quantité vendue' })
  @IsNumber()
  @IsPositive()
  quantity: number;
}