import { Either, left, right } from '@/core/either/either.';
import { Injectable } from '@nestjs/common';

import { Measurement } from '@/domain/entities/measurement-entity';
import { EquipmentsRepository } from '@/domain/repositories/equipments-repository';
import { MeasurementsRepository } from '@/domain/repositories/measurements-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { SomeEquipmentsNotFoundError } from '../errors/some-equipments-not-found';

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
    const measurementsEntities: Measurement[] = [];

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

      measurementsEntities.push(measurementEntity);
    }

    if (measurementsEntities.length) {
      await this.measurementsRepository.createMany(measurementsEntities);
    }

    if (equipmentIdsErrors.length) {
      return left(new SomeEquipmentsNotFoundError(equipmentIdsErrors));
    }

    return right(true);
  }
}
