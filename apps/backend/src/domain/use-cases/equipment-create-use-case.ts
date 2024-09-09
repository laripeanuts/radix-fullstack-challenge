import { Either, left, right } from '@/core/either/either.';
import { Injectable } from '@nestjs/common';

import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { Equipment, EquipmentStatus } from '../entities/equipment-entity';
import { UserInvalidError } from '../errors/user-invalid-error';
import { EquipmentsRepository } from '../repositories/equipments-repository';
import { UsersRepository } from '../repositories/users-repository';

interface EquipmentCreateUseCaseRequest {
  name: string;
  description: string;
  status: EquipmentStatus;
  userId: UniqueEntityID;
}

type EquipmentCreateUseCaseResponse = Either<
  UserInvalidError,
  {
    equipment: Equipment;
  }
>;

@Injectable()
export class EquipmentCreateUseCase {
  constructor(
    private equipmentsRepository: EquipmentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async call({
    name,
    description,
    status,
    userId,
  }: EquipmentCreateUseCaseRequest): Promise<EquipmentCreateUseCaseResponse> {
    const validUser = await this.usersRepository.findById(userId);

    if (!validUser) {
      return left(new UserInvalidError());
    }

    const id = this.generateEquipmentId();

    const equipment = Equipment.create({
      name,
      description,
      id,
      status,
      userId,
    });

    await this.equipmentsRepository.create(equipment);

    return right({
      equipment,
    });
  }

  private generateRandomPrefix(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let prefix = '';
    for (let i = 0; i < 2; i++) {
      prefix += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return prefix;
  }

  generateEquipmentId(): string {
    const prefix = this.generateRandomPrefix();
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}-${randomNumber}`;
  }
}
