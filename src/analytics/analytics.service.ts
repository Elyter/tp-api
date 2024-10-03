import { Injectable } from '@nestjs/common';
import { SalesService } from '../sales/sales.service';
import { ProductsService } from '../products/products.service';
import * as tf from '@tensorflow/tfjs-node';

@Injectable()
export class AnalyticsService {
  constructor(
    private salesService: SalesService,
    private productsService: ProductsService,
  ) {}

  async getPredictions() {
    const salesData = await this.salesService.getHistoricalData();
    const model = await this.createAndTrainModel(salesData);
    const predictions = this.makePredictions(model, salesData);
    return predictions;
  }

  async generateLowStockAlerts() {
    const products = await this.productsService.findAll();
    const lowStockProducts = products.filter(product => product.quantity < product.lowStockThreshold);
    return lowStockProducts;
  }

  private async createAndTrainModel(salesData) {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    const xs = tf.tensor2d(salesData.map((_, i) => i), [salesData.length, 1]);
    const ys = tf.tensor2d(salesData.map(sale => sale.quantity), [salesData.length, 1]);

    await model.fit(xs, ys, { epochs: 250 });
    return model;
  }

  private makePredictions(model, salesData) {
    const lastDataPoint = salesData.length - 1;
    const prediction = model.predict(tf.tensor2d([lastDataPoint + 1], [1, 1]));
    return prediction.dataSync()[0];
  }

  async generateRestockSuggestions(): Promise<any[]> {
    const products = await this.productsService.findAll();
    const suggestions = [];

    for (const product of products) {
      const salesData = await this.salesService.getSalesByProductAndPeriod(
        product.id,
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 jours en arrière
        new Date()
      );

      const totalSales = salesData.reduce((sum, sale) => sum + sale.quantity, 0);
      const averageDailySales = totalSales / 30;
      const daysUntilStockout = product.quantity / averageDailySales;

      if (daysUntilStockout < 14) { // Si le stock sera épuisé dans moins de 14 jours
        suggestions.push({
          productId: product.id,
          productName: product.name,
          currentStock: product.quantity,
          suggestedRestock: Math.ceil(averageDailySales * 30) - product.quantity, // Suggérer un réapprovisionnement pour 30 jours
        });
      }
    }

    return suggestions;
  }
}