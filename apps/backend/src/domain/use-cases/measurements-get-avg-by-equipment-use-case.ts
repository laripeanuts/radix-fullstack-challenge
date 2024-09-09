import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

import { Either, left, right } from '@/core/either/either.';
import { ResourceNotFoundError } from '@/domain/errors/resource-not-found-error';
import { EquipmentsRepository } from '@/domain/repositories/equipments-repository';
import { MeasurementsRepository } from '@/domain/repositories/measurements-repository';

export interface AverageByInterval {
  '1d': number;
  '2d': number;
  '1w': number;
  '1m': number;
}

interface MeasurementsAverageByEquipmentsUseCaseRequest {
  equipmentId: string;
}

type MeasurementsAverageByEquipmentsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    averageByInterval: AverageByInterval;
  }
>;

@Injectable()
export class MeasurementsAverageByEquipmentsUseCase {
  constructor(
    private measurementsRepository: MeasurementsRepository,
    private equipmentsRepository: EquipmentsRepository,
  ) {}

  async call({
    equipmentId,
  }: MeasurementsAverageByEquipmentsUseCaseRequest): Promise<MeasurementsAverageByEquipmentsUseCaseResponse> {
    const equipment = await this.equipmentsRepository.findById(equipmentId);

    if (!equipment) {
      return left(new ResourceNotFoundError('Equipment'));
    }

    const intervals: (keyof AverageByInterval)[] = ['1d', '2d', '1w', '1m'];
    const averageByInterval: AverageByInterval = {
      '1d': 0,
      '2d': 0,
      '1w': 0,
      '1m': 0,
    };

    for (const interval of intervals) {
      const sinceDate = this.getDateFromInterval(interval);
      const avgValue =
        await this.measurementsRepository.getAvgValueByEquipmentId(
          equipmentId,
          { sinceDate },
        );
      averageByInterval[interval] = Number(avgValue.toFixed(2));
    }

    return right({
      averageByInterval,
    });
  }

  private getDateFromInterval(interval: keyof AverageByInterval): Date {
    switch (interval) {
      case '1d':
        return dayjs().subtract(1, 'day').toDate();
        break;
      case '2d':
        return dayjs().subtract(2, 'days').toDate();
        break;
      case '1w':
        return dayjs().subtract(1, 'week').toDate();
        break;
      case '1m':
        return dayjs().subtract(1, 'month').toDate();
        break;
      default:
        return dayjs().subtract(1, 'day').toDate();
    }
  }
}
