import { UseCaseError } from '@/core/errors/use-case-error';

export class UserInvalidError extends Error implements UseCaseError {
  constructor() {
    super('User is invalid');
  }
}
