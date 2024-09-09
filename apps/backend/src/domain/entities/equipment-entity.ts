import { Entity } from '@/core/entities/entitty';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';

export type EquipmentStatus = 'OPERATIONAL' | 'MAINTENANCE' | 'OUT_OF_SERVICE';

export type EquipmentProps = {
  name: string;
  description: string;
  id: string;
  status: EquipmentStatus;
  createdAt?: Date;
  userId: UniqueEntityID;
};

export class Equipment extends Entity<EquipmentProps> {
  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get id() {
    return this.props.id;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get userId() {
    return this.props.userId;
  }

  static create(props: EquipmentProps) {
    const equipment = new Equipment(props);

    return equipment;
  }
}
