import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { MeasurementsPrismaMapper } from '@/database/prisma/mappers/measurements-prisma-mappers';
import { PrismaService } from '@/database/prisma/prisma.service';
import {
  Measurement,
  MeasurementProps,
} from '@/domain/entities/measurement-entity';

export function makeMeasurement(
  override: Partial<MeasurementProps> = {},
  id?: UniqueEntityID,
) {
  const measurement = Measurement.create(
    {
      value: faker.number.float(),
      timestamp: faker.date.recent(),
      equipmentId: faker.string.uuid(),
      ...override,
    },
    id,
  );

  return measurement;
}

@Injectable()
export class MeasurementsFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaMeasurement(
    data: Partial<MeasurementProps> = {},
  ): Promise<Measurement> {
    const measurement = makeMeasurement(data);

    await this.prisma.measurement.create({
      data: MeasurementsPrismaMapper.toPrisma(measurement),
    });

    return measurement;
  }
}
