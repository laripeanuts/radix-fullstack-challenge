import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';

import { Public } from '@/config/auth/make-route-public.decorator';
import { UserInvalidCredentialsError } from '@/domain/errors/user-invalid-credentials-error';
import { UserCreateSessionUseCase } from '@/domain/use-cases/user-create-session-use-case';
import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe';

const createUserSessionBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type CreateUserSessionBody = z.infer<typeof createUserSessionBodySchema>;

@Controller('/users/session')
@Public()
export class UserCreateSessionController {
  constructor(private userCreateSessionUseCase: UserCreateSessionUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserSessionBodySchema))
  async handle(@Body() body: CreateUserSessionBody) {
    const { email, password } = body;

    const result = await this.userCreateSessionUseCase.call({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserInvalidCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { token } = result.value;

    return { token };
  }
}
