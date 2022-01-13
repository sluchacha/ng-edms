import { AbstractEntity } from './abstract-entity';

export class Award extends AbstractEntity<Award> {
  code?: string;
  name?: string;
}
