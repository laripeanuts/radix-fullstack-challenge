import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { UsersPrismaMapper } from '@/database/prisma/mappers/users-prisma-mappers';
import { PrismaService } from '@/database/prisma/prisma.service';
import { User, UserProps } from '@/domain/entities/user-entity';

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  );

  return user;
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data);

    await this.prisma.user.create({
      data: UsersPrismaMapper.toPrisma(user),
    });

    return user;
  }
}
