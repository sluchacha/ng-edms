import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicantsService } from 'src/app/core/services/applicants.service';
import { Applicant } from '../../../core/models/applicant';
import { DataTableType } from '../../models/data-table-type';
import { RowActionWithData } from '../../models/row-action-with-data';

import { TableWrapperComponent } from '../table-wrapper/table-wrapper.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  @ViewChild('applicantsTable')
  applicantsTable!: TableWrapperComponent<Applicant>;
  tableConfig: DataTableType = {
    complexHeaders: [
      {
        title: 'Full Name',
        colspan: 1,
        rowspan: 2,
      },
      {
        title: 'Personal Information',
        colspan: 2,
      },
      {
        title: 'Region',
        colspan: 3,
      },
      /* {
        title: 'Actions',
        colspan: 1,
        rowspan: 2,
      }, */
    ],
    columns: [
      {
        ignore: true,
        title: 'Full Name',
        dataProperty: 'fullname',
        sortable: true,
        filterable: true,
      },
      {
        title: 'National ID',
        dataProperty: 'nationalId',
        sortable: true,
        filterable: true,
      },
      {
        title: 'Gender',
        dataProperty: 'gender',
        sortable: true,
        filterable: true,
      },
      {
        title: 'County',
        dataProperty: 'county',
        sortable: true,
        filterable: true,
      },
      {
        title: 'Sub county',
        dataProperty: 'subcounty',
        sortable: true,
        filterable: true,
      },
      {
        title: 'Ward',
        dataProperty: 'ward',
        sortable: true,
        filterable: true,
      },
      /* {
        ignore: true,
        title: 'Actions',
        dataProperty: 'ROW_ACTIONS',
        sortable: false,
        filterable: false,
      }, */
    ],
    rowActions: [
      /*       {
        label: 'Edit',
        actionIdToReturn: 'edit',
        logoImageUrl: '',
        showOption: () => true,
        class: 'btn-primary',
      },
      {
        label: 'Delete',
        actionIdToReturn: 'delete',
        logoImageUrl: '',
        showOption: () => true, //(data) => data.gender.toString().toLowerCase() !== 'f',
        class: 'btn-danger',
      }, */
    ],
    rowsPerPage: 2,
  };
  applicants!: Applicant[];
  settings: any = {};

  constructor(private service: ApplicantsService) {
    this.settings = {
      /* 
      //FIXED COLUMN
      scrollY: false,
      scrollX: true,
      scrollCollapse: true,
      fixedColumns: {
        left: 1,
        right: 1,
      },
      */
      responsive: true, //NB: Fixed column this needs to be false, Row Grouping it needs to be true
      //ROW GROUPING
      /* 
      //MULTIPLE COLUMNS - Row Group Data by County and Gender column 3,2
      columnDefs: [
        { targets: [2, 3], visible: false },
        { targets: 6, searchable: false, orderable: false },//Actions column
      ],
      orderFixed: [
        [3, 'asc'],
        [2, 'asc'],
      ], 
      rowGroup: {
        // startRender: null,
        endRender: function (rows: any, group: string): string {
          return `${group} (${rows.count()})`;
        },
        dataSrc: [3, 2],
      },
      */
      //SINGLE COLUMN - Row Group Data by County column 3
      columnDefs: [
        { targets: 3, visible: false, className: 'noVis' },
        // {
        //   targets: 6,
        //   data: null,
        //   searchable: false,
        //   orderable: false,
        //   defaultContent: `<button type="button" class="btn btn-sm btn-danger btn-edit">Edit</button>`,
        // },
        // { targets: [3, -1], className: 'noVis' }, //Used in column visibility to omit column in list
        // {
        //   targets: 6,
        //   data: null,
        //   render: function (data: any, type: any, row: any) {
        //     console.log(row);
        //     return '';
        //   },
        // },
      ],
      orderFixed: [3, 'asc'],
      rowGroup: {
        // startRender: null,
        endRender: function (rows: any, group: string): string {
          return `${group} (${rows.count()})`;
        },
        dataSrc: 3,
      },
      //END ROW GROUP
      select: {
        style: 'single',
        // selector: 'td:not(.control)',
      },
    };
  }

  ngOnInit(): void {
    this.service.getAll().subscribe((applicants) => {
      this.applicants = applicants;
      console.log(applicants);
    });
  }

  rowClicked(eventArgs: RowActionWithData) {
    console.log(eventArgs);

    const index = eventArgs?.rowData
      ? this.applicants.indexOf(eventArgs.rowData)
      : -1;

    switch (eventArgs.actionToPerfom) {
      case 'new':
        alert('Implement New');
        break;
      case 'edit':
        /* const obj = Object.assign({}, this.applicants[index]);
        obj.fullname = 'NEW NAME';
        this.applicants[index] = obj; */
        console.log(this.applicants[index]);
        break;
      case 'delete':
        this.applicants[index].fullname = 'DELETE NAME';
        break;
      default:
      //Do Nothing
    }
  }
}
