import { Entity } from '@/core/entities/entitty';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';

export interface MeasurementProps {
  equipmentId: string;
  value?: number | null;
  timestamp?: Date | null;
}

export class Measurement extends Entity<MeasurementProps> {
  get value() {
    return this.props.value;
  }

  get timestamp() {
    return this.props.timestamp;
  }

  get equipmentId() {
    return this.props.equipmentId;
  }

  static create(props: MeasurementProps, id?: UniqueEntityID) {
    const measurement = new Measurement(props, id);

    return measurement;
  }
}
