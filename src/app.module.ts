import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ThirdPartyApiModule } from './third-party-api/third-party-api.module';
import { AuthModule } from './auth/auth.module';
import { CronModule } from './cron/cron.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // À désactiver en production
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    SalesModule,
    AnalyticsModule,
    ThirdPartyApiModule,
    AuthModule,
    CronModule,
    UsersModule,
  ],
})
export class AppModule {}
