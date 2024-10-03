import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ description: 'Le nom du produit', required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ description: 'La quantité du produit en stock', required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly quantity?: number;

  @ApiProperty({ description: "Le seuil d'alerte pour le stock bas", required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly lowStockThreshold?: number;
}
