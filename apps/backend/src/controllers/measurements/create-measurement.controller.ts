import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';

const createMeasurementBodySchema = z.object({
  equipmentId: z.string(),
  value: z.number().optional(),
  timestamp: z.string().optional(),
});

type CreateEquipmentsBody = z.infer<typeof createMeasurementBodySchema>;

@Controller('/measurements')
export class CreateMeasurementController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createMeasurementBodySchema))
  async handle(@Body() body: CreateEquipmentsBody) {
    const { timestamp, value, equipmentId } = body;

    return await this.prisma.measurement.create({
      data: {
        equipmentId,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        value,
      },
    });
  }
}
