import { Prisma, Equipment as PrismaEquipment } from '@prisma/client';

import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { Equipment } from '@/domain/entities/equipment-entity';

export class EquipmentsPrismaMapper {
  static toDomain(raw: PrismaEquipment): Equipment {
    return Equipment.create({
      id: raw.id,
      name: raw.name,
      description: raw.description,
      status: raw.status,
      createdAt: raw.createdAt,
      userId: new UniqueEntityID(raw.userId),
    });
  }

  static toPrisma(equipment: Equipment): Prisma.EquipmentUncheckedCreateInput {
    return {
      id: equipment.id.toString(),
      name: equipment.name,
      description: equipment.description,
      userId: equipment.userId.toString(),
    };
  }
}
