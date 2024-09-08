import { UseCaseError } from '@/core/errors/use-case-error';

export class SomeEquipmentsNotFoundError extends Error implements UseCaseError {
  constructor(ids: string[]) {
    super(
      `Measurements Created, except the ones that equipments with ids ${ids.join(', ')} not found`,
    );
  }
}
