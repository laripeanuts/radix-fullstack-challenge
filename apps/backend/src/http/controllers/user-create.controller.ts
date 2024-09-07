import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';

import { UserAlreadyCreatedError } from '@/domain/errors/user-already-created-error';
import { UserCreateUseCase } from '@/domain/use-cases/users-create-use-case';
import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe';
import { UserPresenter } from '../presenters/user-presenter';

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type CreateUserBody = z.infer<typeof createUserBodySchema>;

@Controller('/users')
export class UserCreateController {
  constructor(private userCreateUseCase: UserCreateUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(@Body() body: CreateUserBody) {
    const { name, email, password } = body;

    const result = await this.userCreateUseCase.call({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserAlreadyCreatedError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const user = result.value.user;

    return { user: UserPresenter.toHTTP(user) };
  }
}
