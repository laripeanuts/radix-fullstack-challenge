import { Controller, Get, Param, Query } from '@nestjs/common';
import dayjs from 'dayjs';
import { z } from 'zod';

import { PrismaService } from '@/database/prisma/prisma.service';
import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe';

const timeFrames = ['1d', '2d', '1w', '1m'] as const;

const getMeasurementsByEquipmentIdScheme = z.object({
  timeFrame: z.enum(timeFrames),
});

type GetMeasurementsByEquipmentIdQuery = z.infer<
  typeof getMeasurementsByEquipmentIdScheme
>;

@Controller('/measurements/:equipmentId')
export class GetMeasurementsByEquipmentIdController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @Param('equipmentId') equipmentId: string,
    @Query(new ZodValidationPipe(getMeasurementsByEquipmentIdScheme))
    query: GetMeasurementsByEquipmentIdQuery,
  ) {
    const { timeFrame } = query;
    let startTime;

    switch (timeFrame) {
      case '1d':
        startTime = dayjs().subtract(1, 'day').toDate();
        break;
      case '2d':
        startTime = dayjs().subtract(2, 'days').toDate();
        break;
      case '1w':
        startTime = dayjs().subtract(1, 'week').toDate();
        break;
      case '1m':
        startTime = dayjs().subtract(1, 'month').toDate();
        break;
      default:
        startTime = dayjs().subtract(1, 'day').toDate();
    }

    const averageValue = await this.prisma.measurement.aggregate({
      _avg: {
        value: true,
      },
      where: {
        equipmentId,
        timestamp: {
          gte: startTime,
        },
      },
    });

    return {
      equipmentId,
      averageValue: averageValue._avg.value
        ? parseFloat(averageValue._avg.value.toFixed(2))
        : 0,
    };
  }
}
