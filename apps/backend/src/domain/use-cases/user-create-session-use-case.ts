import { Injectable } from '@nestjs/common';

import { Either, left, right } from '@/core/either/either.';
import { Encrypter } from '@/domain/cryptography/encrypter';
import { HashComparer } from '@/domain/cryptography/hash-comparer';
import { UserInvalidCredentialsError } from '@/domain/errors/user-invalid-credentials-error';
import { UsersRepository } from '@/domain/repositories/users-repository';

interface UserCreateSessionUseCaseRequest {
  email: string;
  password: string;
}

type UserCreateSessionUseCaseResponse = Either<
  UserInvalidCredentialsError,
  {
    token: string;
  }
>;

@Injectable()
export class UserCreateSessionUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async call({
    email,
    password,
  }: UserCreateSessionUseCaseRequest): Promise<UserCreateSessionUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new UserInvalidCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return left(new UserInvalidCredentialsError());
    }

    const token = await this.encrypter.encrypt({
      sub: user.id.toString(),
      email: user.email,
      name: user.name,
    });

    return right({
      token,
    });
  }
}
