import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma/prisma.service';
import { Measurement } from '@/domain/entities/measurement-entity';
import {
  MeasurementsGetAvgByEquipmentParams,
  MeasurementsRepository,
} from '@/domain/repositories/measurements-repository';
import { MeasurementsPrismaMapper } from '../mappers/measurements-prisma-mappers';

@Injectable()
export class MeasurementsPrismaRepository implements MeasurementsRepository {
  constructor(private prisma: PrismaService) {}

  async create(measurement: Measurement): Promise<Measurement> {
    const data = MeasurementsPrismaMapper.toPrisma(measurement);

    const measurementCreated = await this.prisma.measurement.create({
      data,
    });

    return MeasurementsPrismaMapper.toDomain(measurementCreated);
  }

  async getAvgValueByEquipmentId(
    equipmentId: string,
    { sinceDate }: MeasurementsGetAvgByEquipmentParams,
  ): Promise<number> {
    const averageValue = await this.prisma.measurement.aggregate({
      _avg: {
        value: true,
      },
      where: {
        equipmentId,
        timestamp: {
          gte: sinceDate,
        },
      },
    });

    return averageValue._avg.value?.toNumber() || 0;
  }
}
