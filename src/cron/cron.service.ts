import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SalesService } from '../sales/sales.service';

@Injectable()
export class CronService {
  constructor(private salesService: SalesService) {}

  @Cron(CronExpression.EVERY_WEEK)
  async generateWeeklySalesReport() {
    const report = await this.salesService.generateWeeklyReport();
    // Logique pour envoyer le rapport par email ou le sauvegarder
    console.log('Rapport hebdomadaire généré:', report);
  }
}
