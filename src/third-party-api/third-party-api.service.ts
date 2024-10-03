import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ThirdPartyApiService {
  constructor(private productsService: ProductsService) {}

  async syncAmazonSales() {
    try {
      // Simulons un appel à l'API Amazon
      const response = await axios.get('https://api.amazon.com/sales');
      const amazonSales = response.data;

      for (const sale of amazonSales) {
        await this.productsService.updateStock(sale.productId, sale.quantity);
      }

      return { message: 'Amazon sales synced successfully' };
    } catch (error) {
      throw new Error('Failed to sync Amazon sales');
    }
  }
}
