import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Applicant } from 'src/app/core/models/applicant';
import { RowActionWithData } from 'src/app/shared/models/row-action-with-data';
import { ApplicantsService } from '../../services/applicants.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss'],
})
export class ApplicantsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  defaultSettings: any = {
    dom: 'Bfltrip',
    stateSave: false,
    paging_type: 'full_numbers',
    responsive: true,
    colReorder: true,
    pageLength: 2,
    lengthMenu: [
      [2, 5, 10, 25, -1],
      [2, 5, 10, 25, 'All'],
    ],
    serverside: true,
    processing: true,
    select: {
      style: 'single',
    },
    columnDefs: [{ targets: [0], visible: false, className: 'noVis' }],
  };

  /* APPLICANT */
  selectedApplicantId!: string;
  /* END APPLICANT */

  constructor(
    private service: ApplicantsService,
    private datePipe: DatePipe,
    private renderer: Renderer2,
    private router: Router
  ) {
    const self = this;
    let options: any = {
      ajax: (params: any, callback: any) => {
        self.service.getAll().subscribe((applicants: Applicant[]) => {
          callback({
            recordsTotal: applicants.length,
            recordsFiltered: applicants.length,
            data: applicants,
          });
        });
      },
      columns: [
        { data: 'id', title: 'ID', visible: false, orderable: false },
        {
          data: 'fullname',
          title: 'Full Name',
        },
        { data: 'gender', title: 'Gender' },
        { data: 'nationalId', title: 'National ID' },
        {
          data: 'dob',
          render: function (data: any, type: string, row: any, meta: object) {
            return type === 'display'
              ? self.datePipe.transform(data, 'dd-MM-yyyy')
              : data;
          },
          title: 'DOB',
          type: 'date',
          orderable: false,
          defaultContent: null,
        },
        { data: 'telephone', render: '[, ]', title: 'Telephone(s)' },
        { data: 'county', title: 'County' },
        { data: 'subcounty', title: 'Subcounty' },
        { data: 'ward', title: 'Ward' },
        {
          data: null,
          render: function (data: any, type: string, row: any, meta: object) {
            return `<button class="btn btn-sm btn-success" view-applicant-id="${row.id}">View Applications</button>`;
          },
          title: 'Action',
          orderable: false,
          searchable: false,
        },
      ],
      buttons: {
        buttons: [
          {
            text: 'New Record',
            key: '1',
            action: function (e?: any, dt?: any, node?: any, config?: any) {
              const userAction: RowActionWithData = {
                actionToPerfom: 'new',
              };
              self.handleRowAction(userAction);
            },
          },
          {
            extend: 'selected',
            text: 'Edit',
            action: function (
              e: any,
              dt: DataTables.Api,
              node: any,
              config: any
            ): void {
              let selected: Applicant = dt
                .row({ selected: true })
                .data() as Applicant;
              const userAction: RowActionWithData = {
                actionToPerfom: config.text.toLowerCase().trim(),
                rowData: selected,
              };
              self.handleRowAction(userAction);
            },
          },
          {
            extend: 'selected',
            text: 'Delete',
          },
          {
            extend: 'colvis',
            text: 'Table control',
            popoverTitle: 'Column Visibility',
            collectionLayout: 'two-column',
            columns: ':not(.noVis)',
            postfixButtons: ['colvisRestore'],
          },
          'copy',
          {
            extend: 'print',
            key: {
              key: 'p',
              altKey: true,
            },
          },
          {
            extend: 'collection',
            text: 'Export',
            buttons: ['csv', 'excel', 'pdf'],
          },
        ],
      },
      initComplete: function (settings: DataTables.Settings, json: object) {},
    };

    this.dtOptions = { ...this.defaultSettings, ...options };
  }

  private strVarName(value: string): string {
    return value.trim().toLowerCase().replace(/\s/g, '-');
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.addTextInputToFooterCell();
    //Redraw the datatable
    this.dtTrigger.next();

    this.enableFilterByColumns();

    this.enableRouterLinking();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  enableFilterByColumns() {
    //Enable filtering by columns
    this.datatableElement.dtInstance.then(
      (dtInstance: DataTables.Api) => {
        dtInstance.columns().every(function () {
          const that = this;
          $('input', this.footer()).on('keyup change clear', function () {
            const input: any = this as HTMLInputElement;
            if (that.search() !== input['value']) {
              that.search(input['value']).draw();
            }
          });
        });
      },
      (reason: any) => console.log(reason)
    );
  }

  enableRouterLinking() {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('view-applicant-id')) {
        let id = event.target.getAttribute('view-applicant-id');
        this.selectedApplicantId = id;
        console.log(`ID: ${id}`);
        /* this.router.navigate([
          '/applicants/applications/' +
            event.target.getAttribute('view-applicant-id'),
        ]); */
      }
    });
  }

  addTextInputToFooterCell() {
    const self = this;
    $('.mydatatable tfoot th').each(function () {
      let title = $(this).text();
      let html = `<input type="text" placeholder="${title}" name="search-${self.strVarName(
        title
      )}"/>`;
      title.toLowerCase().trim() !== 'actions' ? $(this).html(html) : '';
    });
  }

  handleRowAction(eventArgs: RowActionWithData) {
    console.log(eventArgs);

    /* const index = eventArgs?.rowData
      ? this.applicants.indexOf(eventArgs.rowData)
      : -1; */

    switch (eventArgs.actionToPerfom) {
      case 'new':
        alert('Implement New');
        break;
      case 'edit':
        alert('Implement Edit');
        /* const obj = Object.assign({}, this.applicants[index]);
        obj.fullname = 'NEW NAME';
        this.applicants[index] = obj; */
        // console.log(this.applicants[index]);
        break;
      case 'delete':
        alert('Implement Delete');
        // this.applicants[index].fullname = 'DELETE NAME';
        break;
      default:
      //Do Nothing
    }
  }
}
