import { Measurement } from '@/domain/entities/measurement-entity';

export class MeasurementPresenter {
  static toHTTP(measurement: Measurement) {
    return {
      id: measurement.id.toString(),
      equipmentId: measurement.equipmentId.toString(),
      value: measurement.value,
      timestamp: measurement.timestamp?.toISOString(),
    };
  }
}
