import { UniqueEntityID } from '@/core/entities/unique-id-entity';
import { User } from '../entities/user-entity';

export abstract class UsersRepository {
  abstract create(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: UniqueEntityID): Promise<User | null>;
}
