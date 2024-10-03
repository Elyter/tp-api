import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The current quantity of the product in stock' })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({ description: 'The threshold for low stock alert' })
  @IsNumber()
  @IsPositive()
  lowStockThreshold: number;

  @ApiProperty({ description: 'The price of the product' })
  @IsNumber()
  @IsPositive()
  price: number;
}
