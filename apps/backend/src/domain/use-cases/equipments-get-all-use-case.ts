import { Either, right } from '@/core/either/either.';
import { Injectable } from '@nestjs/common';

import { Equipment } from '../entities/equipment-entity';
import { EquipmentsRepository } from '../repositories/equipments-repository';

type EquipmentsGetAllUseCaseResponse = Either<
  null,
  {
    equipments: Equipment[];
  }
>;

@Injectable()
export class EquipmentsGetAllUseCase {
  constructor(private equipmentsRepository: EquipmentsRepository) {}

  async call(): Promise<EquipmentsGetAllUseCaseResponse> {
    const equipments = await this.equipmentsRepository.getAll();

    return right({
      equipments,
    });
  }
}
