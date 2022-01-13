import { AbstractEntity } from './abstract-entity';

export class Applicant extends AbstractEntity<Applicant> {
  fullname?: string;
  gender?: string;
  nationalId?: string;
  dob?: string | Date;
  telephone?: string[];
  county?: string;
  subcounty?: string;
  ward?: string;
  creationDate?: string | Date;

  constructor(partial: Partial<Applicant>) {
    super(partial);

    if (this.dob) this.dob = new Date(`${this.dob?.toString()}`);

    if (this.creationDate)
      this.dob = new Date(`${this.creationDate?.toString()}`);
  }
}
