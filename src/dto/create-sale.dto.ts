import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty({ description: 'ID du produit vendu' })
  productId: number;

  @ApiProperty({ description: 'Quantité vendue' })
  quantity: number;
}