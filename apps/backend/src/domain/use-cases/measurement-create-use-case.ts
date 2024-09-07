import { Either, left, right } from '@/core/either/either.';
import { Injectable } from '@nestjs/common';

import { Measurement } from '@/domain/entities/measurement-entity';
import { EquipmentsRepository } from '@/domain/repositories/equipments-repository';
import { MeasurementsRepository } from '@/domain/repositories/measurements-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface MeasurementCreateUseCaseRequest {
  equipmentId: string;
  value?: number;
  timestamp?: Date;
}

type MeasurementCreateUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    measurement: Measurement;
  }
>;

@Injectable()
export class MeasurementCreateUseCase {
  constructor(
    private measurementsRepository: MeasurementsRepository,
    private equipmentsRepository: EquipmentsRepository,
  ) {}

  async call({
    equipmentId,
    value,
    timestamp,
  }: MeasurementCreateUseCaseRequest): Promise<MeasurementCreateUseCaseResponse> {
    const equipment = await this.equipmentsRepository.findById(equipmentId);

    if (!equipment) {
      return left(
        new ResourceNotFoundError(`Equipment with id ${equipmentId}`),
      );
    }

    const measurement = Measurement.create({
      equipmentId,
      value,
      timestamp,
    });

    await this.measurementsRepository.create(measurement);

    return right({
      measurement,
    });
  }
}
