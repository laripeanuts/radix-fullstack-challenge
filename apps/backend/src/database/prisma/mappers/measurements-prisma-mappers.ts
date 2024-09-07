import { Prisma, Measurement as PrismaMeasurement } from '@prisma/client';

import { Measurement } from '@/domain/entities/measurement-entity';

export class MeasurementsPrismaMapper {
  static toDomain(raw: PrismaMeasurement): Measurement {
    return Measurement.create({
      value: raw.value?.toNumber(),
      timestamp: raw.timestamp,
      equipmentId: raw.equipmentId,
    });
  }

  static toPrisma(
    measurement: Measurement,
  ): Prisma.MeasurementUncheckedCreateInput {
    return {
      id: measurement.id.toString(),
      value: measurement.value,
      timestamp: measurement.timestamp,
      equipmentId: measurement.equipmentId,
    };
  }
}
