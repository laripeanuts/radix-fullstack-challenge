import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { z } from 'zod';

import { PrismaService } from '@/database/prisma/prisma.service';
import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe';
import { compare } from 'bcryptjs';

const createSessionBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type CreateSessionBody = z.infer<typeof createSessionBodySchema>;

@Controller('/sessions')
export class CreateSessionController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createSessionBodySchema))
  async handle(@Body() body: CreateSessionBody) {
    const { email, password } = body;

    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.jwt.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      access_token: accessToken,
    };
  }
}
