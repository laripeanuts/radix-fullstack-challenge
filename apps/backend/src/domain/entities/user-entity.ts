import { Entity } from '@/core/entities/entitty';
import { UniqueEntityID } from '@/core/entities/unique-id-entity';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const userProps = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };

    const user = new User(userProps, id);

    return user;
  }
}
