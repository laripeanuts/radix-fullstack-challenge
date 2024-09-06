/* eslint-disable no-console */

import { AppModule } from '@/app.module';
import { NestFactory } from '@nestjs/core';

import { EnvService } from './config/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const configService = app.get(EnvService);
  const port = configService.get('BACKEND_PORT');
  const url = configService.get('BASE_BACKEND_URL');

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(port).then(() => {
    console.log(`Server running on ${url}`);
  });
}

bootstrap();
