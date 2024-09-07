import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';
import { UserCreateUseCase } from '@/domain/use-cases/users-create-use-case';
import { UserCreateController } from '@/http/controllers/user-create.controller';
import { CryptographyModule } from '@/http/cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [UserCreateController],
  providers: [UserCreateUseCase],
})
export class HttpModule {}
