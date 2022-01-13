import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Applicant } from '../../models/applicant';
import { Application } from '../../models/application';
import { Qualification } from '../../models/qualification';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  applicationForm!: FormGroup;
  bsConfig = { dateInputFormat: 'DD/MM/YYYY' };
  allAwards: string[] = ['PHD', 'Masters', 'Degree', 'Diploma', 'Certificate'];
  allFiles: string[] = ['KRA', 'CRB', 'HELB', 'DCI', 'EACC'];

  constructor(private fb: FormBuilder) {
    this.applicationForm = fb.group({
      id: [''],
      job: [''],
      applicant: fb.group({
        id: [''],
        telephone: fb.array([this.newTelephone()]),
        fullname: [''],
        nationalId: [''],
        dob: [''],
        gender: [''],
        county: [''],
        subcounty: [''],
        ward: [''],
      }),
      qualifications: fb.array([this.newQualification()]),
      ppr: [''],
      files: fb.array([this.newChapterSixFile()]),
    });
  }

  ngOnInit(): void {}

  get telephones(): FormArray {
    return this.applicationForm.get('applicant.telephone') as FormArray;
  }

  get qualifications(): FormArray {
    return this.applicationForm.get('qualifications') as FormArray;
  }

  get chapterSixFiles(): FormArray {
    return this.applicationForm.get('files') as FormArray;
  }

  newTelephone() {
    return this.fb.control('');
  }

  addTelephone() {
    this.telephones.push(this.newTelephone());
  }

  deleteTelephone(idx: number) {
    if (this.telephones.length > 1) this.telephones.removeAt(idx);
  }

  newQualification() {
    return this.fb.group({
      id: [''],
      attainedDate: [''],
      award: [''],
      grade: [''],
      title: [''],
    });
  }

  addQualification() {
    this.qualifications.push(this.newQualification());
  }

  deleteQualification(idx: number) {
    if (this.qualifications.length > 1) this.qualifications.removeAt(idx);
  }

  newChapterSixFile(title: string = '') {
    return this.fb.group({
      id: [''],
      title: [title],
      filename: [''],
    });
  }

  addFile(title?: string) {
    this.chapterSixFiles.push(this.newChapterSixFile(title));
  }

  deleteFile(idx: number) {
    this.chapterSixFiles.removeAt(idx);
  }

  updateApplication() {}

  insertApplicant() {
    let application = new Application({
      isDisabled: false,
      // job: "60f7e364206caa28d8a0fd67",
      applicant: {
        telephone: ['0712659790', '0770511643'],
        fullname: 'STEPHEN MIKHALA LUCHACHA',
        nationalId: '12345678',
        dob: '1985-07-24T00:00:00.000Z',
        gender: 'M',
        county: 'KAKAMEGA',
        subcounty: 'KAKAMEGA',
        ward: 'KAKAMEGA',
        creationDate: '2021-07-21T09:02:40.515Z',
        id: '60f7e2b0206caa28d8a0fd65',
      },
      qualifications: [
        {
          id: '60f7e3af206caa28d8a0fd69',
          award: 'Masters',
          title: 'Business Development',
          grade: 'Excellence',
          attainedDate: '2021-02-02T00:00:00.000Z',
        },
        {
          id: '60f7e3af206caa28d8a0fd6a',
          award: 'Degree',
          title: 'BBIT',
          grade: 'Second class honors',
          attainedDate: '2008-10-17T00:00:00.000Z',
        },
        {
          id: '60f7e3af206caa28d8a0fd6b',
          award: 'Diploma',
          title: 'DBIT',
          grade: 'credit',
          attainedDate: '2005-10-22T00:00:00.000Z',
        },
        {
          id: '60f7e3af206caa28d8a0fd6c',
          award: 'Certificate',
          title: 'CCNA4',
          grade: 'credit',
          attainedDate: '2005-07-01T00:00:00.000Z',
        },
      ],
      ppr: 'FHI 360 as a Software Developer Consultant',
      files: [
        {
          id: '60f7e48c206caa28d8a0fd6d',
          title: 'KRA',
          filename: 'b362993b-4b6f-4751-90c8-849a970e283f.pdf',
          uri: 'http://localhost:3000/static/docs/applications/b362993b-4b6f-4751-90c8-849a970e283f.pdf',
          encoding: '7bit',
          mimetype: 'application/pdf',
          size: 17023,
          creationDate: '2021-07-21T09:10:36.692Z',
        },
        {
          id: '60f7e48c206caa28d8a0fd6e',
          title: 'DCI',
          filename: '5f2f2669-645c-434e-ade5-ee48092ba00b.pdf',
          uri: 'http://localhost:3000/static/docs/applications/5f2f2669-645c-434e-ade5-ee48092ba00b.pdf',
          encoding: '7bit',
          mimetype: 'application/pdf',
          size: 38181,
          creationDate: '2021-07-21T09:10:36.693Z',
        },
        {
          id: '60f7e48c206caa28d8a0fd6f',
          title: 'HELB',
          filename: 'b201db51-b3dc-4916-97a2-f63fc49420d1.pdf',
          uri: 'http://localhost:3000/static/docs/applications/b201db51-b3dc-4916-97a2-f63fc49420d1.pdf',
          encoding: '7bit',
          mimetype: 'application/pdf',
          size: 17033,
          creationDate: '2021-07-21T09:10:36.694Z',
        },
        {
          id: '60f7e48c206caa28d8a0fd70',
          title: 'CRB',
          filename: '07a858e2-9ea0-4366-9f50-782ced50a3f1.pdf',
          uri: 'http://localhost:3000/static/docs/applications/07a858e2-9ea0-4366-9f50-782ced50a3f1.pdf',
          encoding: '7bit',
          mimetype: 'application/pdf',
          size: 303051,
          creationDate: '2021-07-21T09:10:36.695Z',
        },
      ],
      dateOfApplication: '2021-07-21T09:06:55.404Z',
      id: '60f7e3af206caa28d8a0fd68',
    });

    this.clearFormArray();

    // Build the form before calling patchValue
    // To load data, update form programmatically to match the data
    application.applicant?.telephone?.forEach((t) => {
      this.addTelephone();
    });

    application.qualifications?.forEach((q) => {
      this.addQualification();
    });

    application.files?.forEach((f) => {
      this.addFile();
    });

    this.applicationForm.patchValue(application);
  }

  clearFormArray() {
    this.telephones.clear();
    this.qualifications.clear();
    this.chapterSixFiles.clear();
  }

  onSubmit() {
    console.log(this.applicationForm.value);
  }
}
