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

  async createMany(measurements: Measurement[]): Promise<boolean> {
    const data = measurements.map((measurement) =>
      MeasurementsPrismaMapper.toPrisma(measurement),
    );

    const measurementsCreated = await this.prisma.measurement.createMany({
      data,
    });

    return measurementsCreated.count === measurements.length;
  }

  async update(measurement: Measurement): Promise<Measurement | null> {
    const existingMeasurement = await this.prisma.measurement.findUnique({
      where: {
        id: measurement.id.toString(),
      },
    });

    if (!existingMeasurement) {
      return null;
    }

    const measurementUpdated = await this.prisma.measurement.update({
      where: {
        id: measurement.id.toString(),
      },
      data: {
        value: measurement.value,
        timestamp: measurement.timestamp,
        equipmentId: measurement.equipmentId,
      },
    });

    return MeasurementsPrismaMapper.toDomain(measurementUpdated);
  }

  async findByEquipmentIdAndTimestamp(
    equipmentId: string,
    timestamp: Date,
  ): Promise<Measurement | null> {
    const measurement = await this.prisma.measurement.findFirst({
      where: {
        equipmentId,
        timestamp,
      },
    });

    if (!measurement) {
      return null;
    }

    return MeasurementsPrismaMapper.toDomain(measurement);
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
