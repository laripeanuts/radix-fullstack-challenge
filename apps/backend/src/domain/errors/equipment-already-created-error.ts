import { UseCaseError } from '@/core/errors/use-case-error';

export class EquipmentAlreadyCreatedError
  extends Error
  implements UseCaseError
{
  constructor(identifier: string) {
    super(`Equipment with id "${identifier}" already created`);
  }
}
