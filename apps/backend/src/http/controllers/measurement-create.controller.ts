import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { z } from 'zod';

import { ResourceNotFoundError } from '@/domain/errors/resource-not-found-error';
import { MeasurementCreateUseCase } from '@/domain/use-cases/measurement-create-use-case';
import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe';
import { MeasurementPresenter } from '../presenters/measurament-presenter';

const createMeasurementBodySchema = z.object({
  value: z.number().optional(),
  timestamp: z.string().optional(),
});

type CreateMeasurementBody = z.infer<typeof createMeasurementBodySchema>;

@Controller('/measurements/:equipmentId')
export class MeasurementCreateController {
  constructor(private measurementCreateUseCase: MeasurementCreateUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Param('equipmentId') equipmentId: string,
    @Body(new ZodValidationPipe(createMeasurementBodySchema))
    body: CreateMeasurementBody,
  ) {
    const { value, timestamp } = body;

    const result = await this.measurementCreateUseCase.call({
      value,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      equipmentId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const measurement = result.value.measurement;

    return { measurement: MeasurementPresenter.toHTTP(measurement) };
  }
}
