import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../common/roles.decorator';

@ApiTags('analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('predictions')
  @Roles('analyst', 'admin')
  @ApiOperation({ summary: 'Obtenir les prédictions de ventes' })
  @ApiResponse({ status: 200, description: 'Retourne les prédictions de ventes.' })
  getPredictions() {
    return this.analyticsService.getPredictions();
  }

  @Get('low-stock-alerts')
  @Roles('manager', 'admin')
  @ApiOperation({ summary: 'Obtenir les alertes de stock bas' })
  @ApiResponse({ status: 200, description: 'Retourne les produits avec un stock bas.' })
  getLowStockAlerts() {
    return this.analyticsService.generateLowStockAlerts();
  }

  @Get('restock-suggestions')
  @Roles('manager', 'admin')
  @ApiOperation({ summary: 'Obtenir les suggestions de réapprovisionnement' })
  @ApiResponse({ status: 200, description: 'Retourne les suggestions de réapprovisionnement.' })
  getRestockSuggestions() {
    return this.analyticsService.generateRestockSuggestions();
  }
}
