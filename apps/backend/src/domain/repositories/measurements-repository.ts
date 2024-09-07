import { Measurement } from '../entities/measurement-entity';

export interface MeasurementsGetAvgByEquipmentParams {
  sinceDate?: Date;
}

export abstract class MeasurementsRepository {
  abstract create(measurement: Measurement): Promise<Measurement>;
  abstract getAvgValueByEquipmentId(
    equipmentId: string,
    params: MeasurementsGetAvgByEquipmentParams,
  ): Promise<number>;
}
