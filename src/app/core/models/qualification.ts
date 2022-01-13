import { AbstractEntity } from './abstract-entity';
import { Award } from './award';

export class Qualification extends AbstractEntity<Qualification> {
  attainedDate?: string | Date;
  award?: string; //Award;
  grade?: string;
  title?: string;

  constructor(partial: Partial<Award>) {
    super(partial);

    if (this.attainedDate)
      this.attainedDate = new Date(`${this.attainedDate?.toString()}`);

    //if (this.award) this.award = new Award(this.award);
  }
}
