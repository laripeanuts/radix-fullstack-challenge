import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';
import { EquipmentCreateUseCase } from '@/domain/use-cases/equipment-create-use-case';
import { EquipmentsGetAllUseCase } from '@/domain/use-cases/equipments-get-all-use-case';
import { MeasurementCreateUseCase } from '@/domain/use-cases/measurement-create-use-case';
import { MeasurementsAverageByEquipmentsUseCase } from '@/domain/use-cases/measurements-get-avg-by-equipment-use-case';
import { UserCreateSessionUseCase } from '@/domain/use-cases/user-create-session-use-case';
import { UserCreateUseCase } from '@/domain/use-cases/user-create-use-case';
import { UserCreateSessionController } from '@/http/controllers/user-create-session-controller';
import { UserCreateController } from '@/http/controllers/user-create.controller';
import { CryptographyModule } from '@/http/cryptography/cryptography.module';
import { EquipmentCreateController } from './controllers/equipment-create.controller';
import { EquipmentGetAllController } from './controllers/equipments-get-all.controller';
import { MeasurementCreateController } from './controllers/measurement-create.controller';
import { MeasurementsAverageByEquipmentsController } from './controllers/measurements-get-avg-by-equipment.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    UserCreateController,
    UserCreateSessionController,
    EquipmentCreateController,
    EquipmentGetAllController,
    MeasurementCreateController,
    MeasurementsAverageByEquipmentsController,
  ],
  providers: [
    UserCreateUseCase,
    UserCreateSessionUseCase,
    EquipmentCreateUseCase,
    EquipmentsGetAllUseCase,
    MeasurementCreateUseCase,
    MeasurementsAverageByEquipmentsUseCase,
  ],
})
export class HttpModule {}
