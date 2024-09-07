import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';

import { ResourceNotFoundError } from '@/domain/errors/resource-not-found-error';
import { MeasurementsAverageByEquipmentsUseCase } from '@/domain/use-cases/measurements-get-avg-by-equipment-use-case';

@Controller('/equipments/:equipmentId/average')
export class MeasurementsAverageByEquipmentsController {
  constructor(
    private measurementsAverageByEquipmentsUseCase: MeasurementsAverageByEquipmentsUseCase,
  ) {}

  @Get()
  async handle(@Param('equipmentId') equipmentId: string) {
    const result = await this.measurementsAverageByEquipmentsUseCase.call({
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

    const { averageByInterval } = result.value;

    return { averageByInterval };
  }
}
