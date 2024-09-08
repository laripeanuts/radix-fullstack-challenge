import { Either, left, right } from '@/core/either/either.';
import { Injectable } from '@nestjs/common';

import { Measurement } from '@/domain/entities/measurement-entity';
import { EquipmentsRepository } from '@/domain/repositories/equipments-repository';
import { MeasurementsRepository } from '@/domain/repositories/measurements-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

export interface MeasurementCreateManyUseCaseRequest {
  equipmentId: string;
  value?: number;
  timestamp?: Date;
}

type MeasurementCreateManyUseCaseResponse = Either<
  ResourceNotFoundError,
  boolean
>;

@Injectable()
export class MeasurementCreateManyUseCase {
  constructor(
    private measurementsRepository: MeasurementsRepository,
    private equipmentsRepository: EquipmentsRepository,
  ) {}

  async call(
    measurements: MeasurementCreateManyUseCaseRequest[],
  ): Promise<MeasurementCreateManyUseCaseResponse> {
    const equipmentIdsErrors: string[] = [];

    for (const measurement of measurements) {
      const equipment = await this.equipmentsRepository.findById(
        measurement.equipmentId,
      );

      if (!equipment) {
        equipmentIdsErrors.push(measurement.equipmentId);
        continue;
      }

      if (!measurement.timestamp) {
        continue;
      }

      const measurementEntity = Measurement.create({
        equipmentId: measurement.equipmentId,
        value: measurement.value,
        timestamp: measurement.timestamp,
      });

      const measurementExists =
        await this.measurementsRepository.findByEquipmentIdAndTimestamp(
          measurement.equipmentId,
          measurement.timestamp,
        );

      if (measurementExists) {
        await this.measurementsRepository.update(measurementEntity);
      } else {
        await this.measurementsRepository.create(measurementEntity);
      }
    }

    if (equipmentIdsErrors.length) {
      return left(
        new ResourceNotFoundError(
          `Equipments with ids ${equipmentIdsErrors.join(', ')}`,
        ),
      );
    }

    return right(true);
  }
}
