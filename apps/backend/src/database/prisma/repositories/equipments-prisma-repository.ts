import { Injectable } from '@nestjs/common';

import { EquipmentsPrismaMapper } from '@/database/prisma/mappers/equipments-prisma-mappers';
import { PrismaService } from '@/database/prisma/prisma.service';
import { Equipment } from '@/domain/entities/equipment-entity';
import { EquipmentsRepository } from '@/domain/repositories/equipments-repository';

@Injectable()
export class EquipmentsPrismaRepository implements EquipmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(equipment: Equipment): Promise<Equipment> {
    const data = EquipmentsPrismaMapper.toPrisma(equipment);

    const equipmentCreated = await this.prisma.equipment.create({
      data,
    });

    return EquipmentsPrismaMapper.toDomain(equipmentCreated);
  }

  async findById(id: string): Promise<Equipment | null> {
    const equipment = await this.prisma.equipment.findFirst({
      where: {
        id,
      },
    });

    if (!equipment) {
      return null;
    }

    return EquipmentsPrismaMapper.toDomain(equipment);
  }

  async getAll(): Promise<Equipment[]> {
    return await this.prisma.equipment
      .findMany()
      .then((equipments) => equipments.map(EquipmentsPrismaMapper.toDomain));
  }
}
