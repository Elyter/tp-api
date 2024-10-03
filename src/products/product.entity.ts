import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty({ description: 'The unique identifier of the product', type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the product' })
  @Column()
  name: string;

  @ApiProperty({ description: 'The current quantity of the product in stock' })
  @Column()
  quantity: number;

  @ApiProperty({ description: 'The threshold for low stock alert' })
  @Column()
  lowStockThreshold: number;

  @ApiProperty({ description: 'The price of the product' })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}