import { AbstractEntity } from './abstract-entity';
import { Organization } from './organization';

export enum JobStatus {
  NOT_PUBLISHED = 1,
  ACCEPTING_APPLICATIONS = 2,
  SHORT_LISTING = 3,
  INTERVIEWS = 4,
  CLOSED = 5,
  ARCHIVED = 6,
}

export class Job extends AbstractEntity<Job> {
  code?: string;
  name?: string;
  description?: string;
  noOfVacancies?: number;
  organization?: Organization;
  datePublished?: string | Date;
  status?: JobStatus;

  constructor(partial: Partial<Job>) {
    super(partial);

    if (this.organization)
      this.organization = new Organization(this.organization);

    if (this.datePublished)
      this.datePublished = new Date(`${this.datePublished?.toString()}`);
  }
}
