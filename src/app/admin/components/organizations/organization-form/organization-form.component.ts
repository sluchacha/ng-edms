import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { OrganizationService } from 'src/app/admin/services/organization.service';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss'],
})
export class OrganizationFormComponent implements OnInit {
  title?: string;
  submitBtnName?: string = 'Save';
  id?: string | number;
  form!: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private service: OrganizationService
  ) {
    this.form = fb.group({
      id: [0],
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.service.get(this.id).subscribe((organization) => {
        if (organization) this.form.patchValue(organization);
      });
    }
  }

  onSubmit() {
    const { valid, value } = this.form;
    if (!valid) return;

    console.log(value);
    this.bsModalRef.hide();
  }
}
