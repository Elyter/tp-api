import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    skipMissingProperties: false,
    forbidUnknownValues: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  const config = new DocumentBuilder()
    .setTitle('Gestion de Stock API')
    .setDescription('API pour la gestion de stock')
    .setVersion('1.0')
    .addTag('products')
    .addTag('sales')
    .addTag('analytics')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  document.paths['/products/{id}'].get.parameters = [
    {
      name: 'id',
      in: 'path',
      description: 'Product ID',
      required: true,
      schema: {
        type: 'integer'
      }
    }
  ];
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(3000);
}
bootstrap();
