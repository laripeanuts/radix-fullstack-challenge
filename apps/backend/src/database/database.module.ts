import { Module } from '@nestjs/common';

import { PrismaService } from '@/database/prisma/prisma.service';
import { UsersPrismaRepository } from '@/database/prisma/repositories/users-prisma-repository';
import { UsersRepository } from '@/domain/repositories/users-repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
  ],
  exports: [PrismaService, UsersRepository],
})
export class DatabaseModule {}
