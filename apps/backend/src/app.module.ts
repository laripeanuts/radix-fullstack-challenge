import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from '@/auth/auth.module';
import { CreateEquipmentsController } from '@/controllers/equipments/create-equipment.controller';
import { CreateSessionController } from '@/controllers/sessions/create-session.controller';
import { CreateUserController } from '@/controllers/users/create-user.controller';
import { PrismaService } from '@/prisma/prisma.service';

import { envSchema } from '../env';

@Module({
  controllers: [
    CreateUserController,
    CreateSessionController,
    CreateEquipmentsController,
  ],
  providers: [PrismaService],
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
  ],
})
export class AppModule {}
