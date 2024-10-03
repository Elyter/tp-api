import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../products/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Sale {
  @ApiProperty({ description: 'The ID of the sale' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @ApiProperty({ description: 'The product of the sale' })
  product: Product;

  @Column()
  @ApiProperty({ description: 'The quantity of the sale' })
  quantity: number;

  @Column()
  @ApiProperty({ description: 'The date of the sale' })
  date: Date;

}
