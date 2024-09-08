import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';
import { EquipmentCreateUseCase } from '@/domain/use-cases/equipment-create-use-case';
import { EquipmentsGetAllUseCase } from '@/domain/use-cases/equipments-get-all-use-case';
import { MeasurementCreateUseCase } from '@/domain/use-cases/measurement-create-use-case';
import { MeasurementCreateManyUseCase } from '@/domain/use-cases/measurements-create-many-use-case';
import { MeasurementsAverageByEquipmentsUseCase } from '@/domain/use-cases/measurements-get-avg-by-equipment-use-case';
import { UserCreateSessionUseCase } from '@/domain/use-cases/user-create-session-use-case';
import { UserCreateUseCase } from '@/domain/use-cases/user-create-use-case';
import { EquipmentCreateController } from '@/http/controllers/equipment-create.controller';
import { EquipmentGetAllController } from '@/http/controllers/equipments-get-all.controller';
import { MeasurementsCreateManyByUploadController } from '@/http/controllers/measurement-create-many-upload-csv.controller';
import { MeasurementCreateController } from '@/http/controllers/measurement-create.controller';
import { MeasurementsAverageByEquipmentsController } from '@/http/controllers/measurements-get-avg-by-equipment.controller';
import { UserCreateSessionController } from '@/http/controllers/user-create-session-controller';
import { UserCreateController } from '@/http/controllers/user-create.controller';
import { CryptographyModule } from '@/http/cryptography/cryptography.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [
    UserCreateController,
    UserCreateSessionController,
    EquipmentCreateController,
    EquipmentGetAllController,
    MeasurementCreateController,
    MeasurementsCreateManyByUploadController,
    MeasurementsAverageByEquipmentsController,
  ],
  providers: [
    UserCreateUseCase,
    UserCreateSessionUseCase,
    EquipmentCreateUseCase,
    EquipmentsGetAllUseCase,
    MeasurementCreateUseCase,
    MeasurementCreateManyUseCase,
    MeasurementsAverageByEquipmentsUseCase,
  ],
})
export class HttpModule {}
