import { AbstractEntity } from './abstract-entity';
import { Applicant } from './applicant';
import { ApplicantFile } from './applicant-file';
import { Job } from './job';
import { Qualification } from './qualification';

export class Application extends AbstractEntity<Application> {
  job?: Job;
  applicant?: Applicant;
  isDisabled?: boolean;
  qualifications?: Qualification[];
  ppr?: string;
  files?: ApplicantFile[];
  dateOfApplication?: string | Date;

  constructor(partial: Partial<Application>) {
    super(partial);

    if (this.job) this.job = new Job(this.job);

    if (this.applicant) this.applicant = new Applicant(this.applicant);

    if (this.qualifications)
      this.qualifications = this.qualifications.map(
        (q) => new Qualification(q)
      );

    if (this.files) this.files = this.files.map((f) => new ApplicantFile(f));

    if (this.dateOfApplication)
      this.dateOfApplication = new Date(
        `${this.dateOfApplication?.toString()}`
      );
  }
}
