import { AbstractEntity } from './abstract-entity';

export class AuthUser extends AbstractEntity<AuthUser> {
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
}
