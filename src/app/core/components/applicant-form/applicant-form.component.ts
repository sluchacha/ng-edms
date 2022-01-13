import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'applicant-form',
  templateUrl: './applicant-form.component.html',
  styleUrls: ['./applicant-form.component.scss'],
})
export class ApplicantFormComponent implements OnInit {
  @Input('applicant_id')
  id?: string;
  applicantForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.applicantForm = fb.group({
      id: [''],
      fullname: ['', Validators.required],
      gender: ['', Validators.required],
      nationalId: ['', Validators.required],
      telephone: fb.array([]),
      county: [''],
      subcounty: [''],
      ward: [''],
    });
  }

  ngOnInit(): void {}

  get telephones() {
    return this.applicantForm.get('telephone') as FormArray;
  }

  addTelephone() {
    this.telephones.push(this.fb.control(''));
  }

  deleteTelephone(idx: number) {
    if (this.telephones.length > 1) this.telephones.removeAt(idx);
  }

  updateApplicant() {
    this.applicantForm.patchValue(
      {
        fullname: 'Stephen Luchacha',
        gender: 'M',
        nationalId: '212345678',
        telephone: ['0712659790', '0770511643'],
        ward: 'Busia Town',
      },
      { onlySelf: true }
    );
  }

  onSubmit() {
    const { valid, value } = this.applicantForm;
    console.log(valid, value);
  }

  onSaveAndApply() {}
}
