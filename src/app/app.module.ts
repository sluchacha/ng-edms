import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import {
  faStar as fasStar,
  faPlus as fasPlus,
  faTrashAlt as fasTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule, AppComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './shared/services/data.service';
import { API_URL } from './shared/tokens';
import { AppErrorHandler } from './shared/errors/app-error-handler';

const TOAST_CONFIG = {
  timeOut: 3000,
  positionClass: 'toast-top-right',
  preventDuplicates: true,
};

@NgModule({
  declarations: [AppComponent, AppComponents],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(TOAST_CONFIG),
    DataTablesModule,
    HttpClientModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    DatePipe,
    TitleCasePipe,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
    {
      provide: API_URL,
      useValue: true,
    },
    DataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(fasStar, farStar, fasPlus, fasTrashAlt);
  }
}
/* 
//fortawesome icon references
https://blog.logrocket.com/how-to-add-font-awesome-angular-project/
https://www.angularjswiki.com/angular/how-to-use-font-awesome-icons-in-angular-applications/
*/
