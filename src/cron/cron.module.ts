import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports: [SalesModule],
  providers: [CronService],
})
export class CronModule {}
