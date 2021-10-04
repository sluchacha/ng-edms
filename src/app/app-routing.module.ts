import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableWrapperComponent } from './shared/components/table-wrapper/table-wrapper.component';
import { DemoComponent } from './shared/components/demo/demo.component';
import { UsingNgTemplateRefComponent } from './shared/components/using-ng-template-ref/using-ng-template-ref.component';
import { DemoNgComponent } from './shared/components/demo-ng/demo-ng.component';

export const AppComponents: any = [
  TableWrapperComponent,
  DemoComponent,
  UsingNgTemplateRefComponent,
  DemoNgComponent,
];

const routes: Routes = [
  { path: '', component: DemoComponent },
  { path: 'demo', component: UsingNgTemplateRefComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
