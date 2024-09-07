import { UseCaseError } from '@/core/errors/use-case-error';

export class UserAlreadyCreatedError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" already created.`); // This could be also a generic message for security reasons
  }
}
