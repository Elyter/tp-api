import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';
import { AnalyticsService } from '../analytics/analytics.service';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => SalesModule)
  ],
  providers: [ProductsService, AnalyticsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
