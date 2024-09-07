import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from '@/config/auth/auth.module';
import { EnvModule } from '@/config/env/env.module';
import { CreateEquipmentController } from '@/controllers/equipments/create-equipment.controller';
import { GetEquipmentsController } from '@/controllers/equipments/get-equipments.controller';
import { CreateMeasurementController } from '@/controllers/measurements/create-measurement.controller';
import { GetMeasurementsByEquipmentIdController } from '@/controllers/measurements/get-measurements-by-equipment-id.controller';
import { CreateSessionController } from '@/controllers/sessions/create-session.controller';

import { envSchema } from '@/config/env/env';
import { DatabaseModule } from '@/database/database.module';
import { HttpModule } from '@/http/http.module';

@Module({
  controllers: [
    CreateSessionController,
    CreateEquipmentController,
    GetEquipmentsController,
    GetMeasurementsByEquipmentIdController,
    CreateMeasurementController,
  ],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend', 'dist'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    EnvModule,
    HttpModule,
  ],
})
export class AppModule {}
