import { Equipment } from '@/domain/entities/equipment-entity';

export class EquipmentPresenter {
  static toHTTP(equipment: Equipment) {
    return {
      id: equipment.id.toString(),
      name: equipment.name,
      description: equipment.description,
      userId: equipment.userId.toString(),
    };
  }
}
