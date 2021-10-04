import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { Applicant } from '../../models/applicant';
import { DemoNgComponentEventType } from '../../models/demo-ng-component-event-type';
import { ApplicantsService } from '../../services/applicants.service';
import { DemoNgComponent } from '../demo-ng/demo-ng.component';

@Component({
  selector: 'using-ng-template-ref',
  templateUrl: './using-ng-template-ref.component.html',
  styleUrls: ['./using-ng-template-ref.component.scss'],
})
export class UsingNgTemplateRefComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('demoNg')
  demoNg!: TemplateRef<DemoNgComponent>;
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();

  applicants: any[] = [];
  message: string = '';
  columns: any[] = [];

  constructor(private service: ApplicantsService) {}

  ngOnInit(): void {
    // use setTimeout as a hack to ensure the `demoNg` is usable in the datatables rowCallback function
    setTimeout(() => {
      const self = this;
      this.columns = [
        {
          title: 'Full Name',
          data: 'fullname',
        },
        {
          title: 'National ID',
          data: 'nationalId',
        },
        {
          title: 'Gender',
          data: 'gender',
        },
        {
          title: 'County',
          data: 'county',
        },
        {
          title: 'Subcounty',
          data: 'subcounty',
        },
        {
          title: 'Ward',
          data: 'ward',
        },
        /* {
          title: 'Actions',
          data: null,
          defaultContent: '',
          ngTemplateRef: {
            ref: this.demoNg,
            context: {
              //needed for capturing events inside <ng-template>
              captureEvents: self.onCaptureEvent.bind(self),
            },
          },
        }, */
        {
          title: 'Actions',
          data: null,
          className: 'dt-center btn-edit',
          defaultContent: `<button class="btn btn-sm btn-danger">Edit</button>`,
          orderable: false,
        },
        /* {
            data: null,
            className: "dt-center editor-delete",
            defaultContent: '<i class="fa fa-trash"/>',
            orderable: false
        } */
      ];
      this.dtOptions = {
        dom: 'Bfltrip',
        pagingType: 'full_numbers',
        lengthMenu: [
          [5, 10, 25, 50, 100, -1],
          [5, 10, 25, 50, 100, 'All'],
        ],
        responsive: true,
        pageLength: 10,
        serverSide: true,
        processing: true,
        ajax: (dataTablesParameters: any, callback) => {
          self.service.getAll(dataTablesParameters).subscribe((applicants) => {
            self.applicants = applicants;
            callback({
              recordsTotal: applicants.length,
              recordsFiltered: applicants.length,
              data: applicants,
            });
          });
        },
        columns: this.columns,
      };
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      //race condition fails unit tests if dtOptions isn't sent with dtTrigger
      this.dtTrigger.next(this.dtOptions);
    }, 200);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onCaptureEvent(event: DemoNgComponentEventType) {
    this.message = `Event '${event.cmd}' with data '${JSON.stringify(
      event.data
    )}'`;
  }

  emitter(event: any) {}
}
