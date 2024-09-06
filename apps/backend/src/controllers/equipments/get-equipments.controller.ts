import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { PrismaService } from '@/prisma/prisma.service';

@Controller('/equipments')
@UseGuards(JwtAuthGuard)
export class GetEquipmentsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    const equipments = await this.prisma.equipment.findMany();

    return { equipments };
  }
}
