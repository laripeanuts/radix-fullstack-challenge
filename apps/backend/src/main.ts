/* eslint-disable no-console */

import { AppModule } from '@/app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { Env } from '../env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService<Env, true>>(ConfigService);
  const port = configService.get('BACKEND_PORT', { infer: true });
  const url = configService.get('BASE_BACKEND_URL', { infer: true });

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(port).then(() => {
    console.log(`Server running on ${url}`);
  });
}

bootstrap();
