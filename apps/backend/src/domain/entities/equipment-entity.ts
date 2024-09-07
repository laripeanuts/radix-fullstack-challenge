import { Entity } from '@/core/entities/entitty';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';

export interface EquipmentProps {
  name: string;
  description: string;
  id: string;
  userId: UniqueEntityID;
}

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

  get userId() {
    return this.props.userId;
  }

  static create(props: EquipmentProps) {
    const equipment = new Equipment(props);

    return equipment;
  }
}
