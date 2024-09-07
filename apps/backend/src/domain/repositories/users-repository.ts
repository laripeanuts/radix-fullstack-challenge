import { User } from '../entities/user-entity';

export abstract class UsersRepository {
  abstract create(answer: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
}
