import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import csv from 'csv-parser';
import { createReadStream } from 'fs';

import {
  MeasurementCreateManyUseCase,
  MeasurementCreateManyUseCaseRequest,
} from '@/domain/use-cases/measurement-create-many-use-case';

@Controller('/measurements/upload/csv')
export class MeasurementsCreateManyByUploadController {
  constructor(
    private measurementCreateManyUseCase: MeasurementCreateManyUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5, // 5mb
          }),
          new FileTypeValidator({
            fileType: '.(csv)',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File with extension CSV is required');
    }

    const measurements: MeasurementCreateManyUseCaseRequest[] = [];
    const stream = createReadStream(file.path).pipe(csv());

    for await (const row of stream) {
      const body: MeasurementCreateManyUseCaseRequest = {
        equipmentId: String(row.equipmentId),
        value: row.value ? Number(row.value) : 0,
        timestamp: row.timestamp,
      };

      measurements.push(body);

      if (measurements.length >= 1000) {
        const result =
          await this.measurementCreateManyUseCase.call(measurements);
        if (result.isLeft()) {
          throw new BadRequestException(result.value.message);
        }

        measurements.length = 0;
      }
    }

    if (measurements.length > 0) {
      const result = await this.measurementCreateManyUseCase.call(measurements);
      if (result.isLeft()) {
        throw new BadRequestException(result.value.message);
      }
    }

    return { message: 'Measurements created successfully' };
  }
}
