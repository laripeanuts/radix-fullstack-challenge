import { Either, left, right } from '@/core/either/either.';
import { Injectable } from '@nestjs/common';

import { HashGenerator } from '@/domain//cryptography/hash-generator';
import { User } from '@/domain//entities/user-entity';
import { UserAlreadyCreatedError } from '@/domain//errors/user-already-created-error';
import { UsersRepository } from '@/domain//repositories/users-repository';

interface UserCreateUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type UserCreateUseCaseResponse = Either<
  UserAlreadyCreatedError,
  {
    user: User;
  }
>;

@Injectable()
export class UserCreateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async call({
    name,
    email,
    password,
  }: UserCreateUseCaseRequest): Promise<UserCreateUseCaseResponse> {
    const userCreatedAlready = await this.usersRepository.findByEmail(email);

    if (userCreatedAlready) {
      return left(new UserAlreadyCreatedError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
