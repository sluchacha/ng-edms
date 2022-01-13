import { AbstractEntity } from './abstract-entity';

export class ApplicantFile extends AbstractEntity<ApplicantFile> {
  filename?: string;
  subject?: string;
  code?: string;
  description?: string;
  url?: string;
  tags?: string[];
  creationDate?: string | Date;
  //temp additions
  title?: string;
  uri?: string;
  encoding?: string;
  mimetype?: string;
  size?: number;
}
