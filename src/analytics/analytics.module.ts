import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { SalesModule } from '../sales/sales.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [SalesModule, ProductsModule],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
