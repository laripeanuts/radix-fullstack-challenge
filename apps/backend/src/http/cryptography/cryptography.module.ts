import { Encrypter } from '@/domain/cryptography/encrypter';
import { HashComparer } from '@/domain/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/cryptography/hash-generator';
import { Module } from '@nestjs/common';

import { BcryptEncrypter } from './bcrypt-encrypter copy';
import { JwtEncrypter } from './jwt-encrypter';

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptEncrypter },
    { provide: HashGenerator, useClass: BcryptEncrypter },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
