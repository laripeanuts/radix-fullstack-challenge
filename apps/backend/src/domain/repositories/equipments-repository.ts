import { Equipment } from '../entities/equipment-entity';

export abstract class EquipmentsRepository {
  abstract create(equipment: Equipment): Promise<Equipment>;
  abstract findById(id: string): Promise<Equipment | null>;
  abstract getAll(): Promise<Equipment[]>;
}
