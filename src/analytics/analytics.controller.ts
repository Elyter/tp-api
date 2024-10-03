import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../common/roles.decorator';

@ApiTags('analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('predictions')
  @Roles('analyst', 'admin')
  @ApiOperation({ summary: 'Get sales predictions' })
  @ApiResponse({ status: 200, description: 'Returns sales predictions.' })
  getPredictions() {
    return this.analyticsService.getPredictions();
  }

  @Get('low-stock-alerts')
  @Roles('manager', 'admin')
  @ApiOperation({ summary: 'Get low stock alerts' })
  @ApiResponse({ status: 200, description: 'Returns products with low stock.' })
  getLowStockAlerts() {
    return this.analyticsService.generateLowStockAlerts();
  }
}
