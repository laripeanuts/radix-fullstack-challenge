import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from '@/auth/auth.module';
import { EnvModule } from '@/config/env/env.module';
import { CreateEquipmentController } from '@/controllers/equipments/create-equipment.controller';
import { GetEquipmentsController } from '@/controllers/equipments/get-equipments.controller';
import { CreateMeasurementController } from '@/controllers/measurements/create-measurement.controller';
import { GetMeasurementsByEquipmentIdController } from '@/controllers/measurements/get-measurements-by-equipment-id.controller';
import { CreateSessionController } from '@/controllers/sessions/create-session.controller';
import { CreateUserController } from '@/controllers/users/create-user.controller';
import { PrismaService } from '@/prisma/prisma.service';

import { envSchema } from '@/config/env/env';
import { EnvService } from '@/config/env/env.service';

@Module({
  controllers: [
    CreateUserController,
    CreateSessionController,
    CreateEquipmentController,
    GetEquipmentsController,
    GetMeasurementsByEquipmentIdController,
    CreateMeasurementController,
  ],
  providers: [PrismaService, EnvService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend', 'dist'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    EnvModule,
  ],
})
export class AppModule {}
