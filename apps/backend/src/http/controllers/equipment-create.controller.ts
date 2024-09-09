import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Post,
} from '@nestjs/common';
import { z } from 'zod';

import { CurrentUser } from '@/config/auth/current-user.decorator';
import { UserPayloadSchema } from '@/config/auth/jwt.strategy';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { UserInvalidError } from '@/domain/errors/user-invalid-error';
import { EquipmentCreateUseCase } from '@/domain/use-cases/equipment-create-use-case';
import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe';
import { EquipmentPresenter } from '@/http/presenters/equipment-presenter';

const createEquipmentBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  status: z
    .enum(['OPERATIONAL', 'MAINTENANCE', 'OUT_OF_SERVICE'])
    .default('OPERATIONAL'),
});

type CreateEquipmentBody = z.infer<typeof createEquipmentBodySchema>;

@Controller('/equipments')
export class EquipmentCreateController {
  constructor(private equipmentCreateUseCase: EquipmentCreateUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @CurrentUser()
    user: UserPayloadSchema,
    @Body(new ZodValidationPipe(createEquipmentBodySchema))
    body: CreateEquipmentBody,
  ) {
    const { sub: userId } = user;
    const { name, description, status } = body;

    const result = await this.equipmentCreateUseCase.call({
      name,
      description: description || '',
      status: status,
      userId: new UniqueEntityID(userId),
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserInvalidError:
          throw new ForbiddenException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const equipment = result.value.equipment;

    return { equipment: EquipmentPresenter.toHTTP(equipment) };
  }
}
