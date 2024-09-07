import { Injectable } from '@nestjs/common';

import { UsersPrismaMapper } from '@/database/prisma/mappers/users-prisma-mappers';
import { PrismaService } from '@/database/prisma/prisma.service';
import { User } from '@/domain/entities/user-entity';
import { UsersRepository } from '@/domain/repositories/users-repository';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const data = UsersPrismaMapper.toPrisma(user);

    const userCreated = await this.prisma.user.create({
      data,
    });

    return UsersPrismaMapper.toDomain(userCreated);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return UsersPrismaMapper.toDomain(user);
  }
}
