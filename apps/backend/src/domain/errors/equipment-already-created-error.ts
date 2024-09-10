import { UseCaseError } from '@/core/errors/use-case-error';

export class EquipmentAlreadyCreatedError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Equipment already created with this id');
  }
}
