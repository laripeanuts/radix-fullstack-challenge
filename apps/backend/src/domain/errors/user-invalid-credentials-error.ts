import { UseCaseError } from '@/core/errors/use-case-error';

export class UserInvalidCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('User invalid credentials');
  }
}
