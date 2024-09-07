import { BadRequestException, Controller, Get } from '@nestjs/common';

import { EquipmentsGetAllUseCase } from '@/domain/use-cases/equipments-get-all-use-case';
import { EquipmentPresenter } from '../presenters/equipment-presenter';

@Controller('/equipments')
export class EquipmentGetAllController {
  constructor(private equipmentsGetAllUseCase: EquipmentsGetAllUseCase) {}

  @Get()
  async handle() {
    const result = await this.equipmentsGetAllUseCase.call();

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { equipments } = result.value;

    return { equipments: equipments.map(EquipmentPresenter.toHTTP) };
  }
}
