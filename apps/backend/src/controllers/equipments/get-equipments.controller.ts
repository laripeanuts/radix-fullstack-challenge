import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/config/auth/jwt-auth.guard';
import { PrismaService } from '@/database/prisma/prisma.service';

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
