import { Module } from '@nestjs/common';

import { PrismaService } from '@/database/prisma/prisma.service';
import { EquipmentsPrismaRepository } from '@/database/prisma/repositories/equipments-prisma-repository';
import { MeasurementsPrismaRepository } from '@/database/prisma/repositories/measurements-prisma-repository';
import { UsersPrismaRepository } from '@/database/prisma/repositories/users-prisma-repository';
import { EquipmentsRepository } from '@/domain/repositories/equipments-repository';
import { MeasurementsRepository } from '@/domain/repositories/measurements-repository';
import { UsersRepository } from '@/domain/repositories/users-repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
    {
      provide: EquipmentsRepository,
      useClass: EquipmentsPrismaRepository,
    },
    {
      provide: MeasurementsRepository,
      useClass: MeasurementsPrismaRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    EquipmentsRepository,
    MeasurementsRepository,
  ],
})
export class DatabaseModule {}
