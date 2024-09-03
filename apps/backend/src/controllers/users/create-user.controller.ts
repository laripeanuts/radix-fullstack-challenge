import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { z } from 'zod';

import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type CreateUserBody = z.infer<typeof createUserBodySchema>;

@Controller('/users')
export class CreateUserController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createUserBodySchema))
  async handle(@Body() body: CreateUserBody) {
    const { name, email, password } = body;

    const userAlreadyExists = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new ConflictException(
        'User with same email address already exists',
      );
    }

    const encryptedPassword = await hash(password, 8);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
