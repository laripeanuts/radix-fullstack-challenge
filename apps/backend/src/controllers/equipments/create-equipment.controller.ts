import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';

import { CurrentUser } from '@/auth/current-user.decorator';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { UserPayloadSchema } from '@/auth/jwt.strategy';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/prisma/prisma.service';
import { IdGeneratorService } from '@/services/id-generator.service';

const createEquipmentBodySchema = z.object({
  name: z.string(),
  description: z.string(),
});

type CreateEquipmentsBody = z.infer<typeof createEquipmentBodySchema>;

@Controller('/equipments')
@UseGuards(JwtAuthGuard)
export class CreateEquipmentsController {
  constructor(
    private prisma: PrismaService,
    private idGeneratorService: IdGeneratorService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createEquipmentBodySchema))
  async handle(
    @Body() body: CreateEquipmentsBody,
    @CurrentUser() user: UserPayloadSchema,
  ) {
    const { sub } = user;
    const { name, description } = body;

    const id = this.idGeneratorService.generateEquipmentId();

    return await this.prisma.equipment.create({
      data: {
        id,
        name,
        description,
        userId: sub,
      },
    });
  }
}
