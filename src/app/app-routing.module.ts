import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableWrapperComponent } from './shared/components/table-wrapper/table-wrapper.component';
import { DemoComponent } from './shared/components/demo/demo.component';
import { UsingNgTemplateRefComponent } from './shared/components/using-ng-template-ref/using-ng-template-ref.component';
import { DemoNgComponent } from './shared/components/demo-ng/demo-ng.component';
import { StarRatingComponent } from './shared/components/star/star-rating.component';

import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { ApplicantsComponent } from './core/components/applicants/applicants.component';
import { ApplicantFormComponent } from './core/components/applicant-form/applicant-form.component';
import { ComponentLoaderDirective } from './core/directives/component-loader.directive';
import { ApplicationsComponent } from './core/components/applications/applications.component';

import { MastersComponent } from './admin/components/masters/masters.component';
import { JobsComponent } from './admin/components/jobs/jobs.component';
import { AwardsComponent } from './admin/components/awards/awards.component';
import { OrganizationsComponent } from './admin/components/organizations/organizations.component';
import { OrganizationFormComponent } from './admin/components/organizations/organization-form/organization-form.component';

export const AppComponents: any = [
  TableWrapperComponent,
  DemoComponent,
  UsingNgTemplateRefComponent,
  DemoNgComponent,
  StarRatingComponent,

  LoginComponent,
  RegisterComponent,
  ComponentLoaderDirective,
  ApplicantsComponent,
  ApplicantFormComponent,
  ApplicationsComponent,

  MastersComponent,
  JobsComponent,
  AwardsComponent,
  OrganizationsComponent,
  OrganizationFormComponent,
];

const routes: Routes = [
  { path: '', redirectTo: 'applicants', pathMatch: 'full' },
  // { path: 'demo', component: UsingNgTemplateRefComponent },
  { path: 'applicants', component: ApplicantsComponent },
  { path: 'applications', component: ApplicationsComponent },
  { path: 'masters', component: MastersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
