import { Measurement } from '../entities/measurement-entity';

export interface MeasurementsGetAvgByEquipmentParams {
  sinceDate?: Date;
}

export abstract class MeasurementsRepository {
  abstract create(measurement: Measurement): Promise<Measurement>;
  abstract createMany(measurements: Measurement[]): Promise<boolean>;
  abstract update(measurement: Measurement): Promise<Measurement | null>;
  abstract findByEquipmentIdAndTimestamp(
    equipmentId: string,
    timestamp: Date,
  ): Promise<Measurement | null>;
  abstract getAvgValueByEquipmentId(
    equipmentId: string,
    params: MeasurementsGetAvgByEquipmentParams,
  ): Promise<number>;
}
