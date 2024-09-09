import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { EquipmentsPrismaMapper } from '@/database/prisma/mappers/equipments-prisma-mappers';
import { PrismaService } from '@/database/prisma/prisma.service';
import { Equipment, EquipmentProps } from '@/domain/entities/equipment-entity';

export function makeEquipment(override: Partial<EquipmentProps> = {}) {
  const equipment = Equipment.create({
    name: faker.person.fullName(),
    description: faker.lorem.sentence(),
    status: 'OPERATIONAL',
    createdAt: new Date(),
    userId: new UniqueEntityID(faker.string.uuid()),
    id: faker.string.uuid(),
    ...override,
  });

  return equipment;
}

@Injectable()
export class EquipmentsFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaEquipment(
    data: Partial<EquipmentProps> = {},
  ): Promise<Equipment> {
    const equipment = makeEquipment(data);

    await this.prisma.equipment.create({
      data: EquipmentsPrismaMapper.toPrisma(equipment),
    });

    return equipment;
  }
}
