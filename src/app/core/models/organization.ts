import { AbstractEntity } from './abstract-entity';

export class Organization extends AbstractEntity<Organization> {
  code?: string;
  name?: string;
  description?: string;
}
