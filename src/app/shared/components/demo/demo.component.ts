import { Component, OnInit, ViewChild } from '@angular/core';
import { Applicant } from '../../models/applicant';
import { DataTableType } from '../../models/data-table-type';
import { RowActionWithData } from '../../models/row-action-with-data';
import { ApplicantsService } from '../../services/applicants.service';
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
      {
        title: 'Actions',
        colspan: 1,
        rowspan: 2,
      },
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
      {
        ignore: true,
        title: 'Actions',
        dataProperty: 'ROW_ACTIONS',
        sortable: false,
        filterable: false,
      },
    ],
    rowActions: [
      {
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
      },
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
        { targets: 3, visible: false },
        {
          targets: 6,
          data: null,
          searchable: false,
          orderable: false,
          // className: 'my-custom-button',
          defaultContent: `<button type="button" class="btn btn-sm btn-danger btn-edit">Edit</button>`,
        },
        //{ targets: [3, -1], className: 'noVis' }, //Used in column visibility to omit column in list
        /* {
          targets: 6,
          data: null,
          render: function (data: any, type: any, row: any) {
            console.log(row);
            return '';
          },
        }, */
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
      /* drawCallback: function (settings: any) {
        let api: any = this.api();
        let rows: any = api.rows({ page: 'current' }).nodes();
        console.log(rows);
        $(rows)
                .eq(5)
                .before(
                  `<tr class="bg-primary text-light"><td colspan="7">${group}</td></tr>`
                );
      }, */
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        // z$('td', row).off('click');
        /*  $('td', row).on('click', function (e) {
          //e.stopPropagation();
          //self.someClickHandler(data);
          // if(!$(this).hasClass('selected')){
          // console.log(data);
          // console.log(row);
          
        }); */
        /* z$('td', row).on('click', 'button.my-custom-button', function (e) {
          e.preventDefault();
          console.log(data);
        }); */
        //$('td.child ul li.my-custom-button', row).off('click');
        /* z$('td.child', row).on('click', 'button', function (e) {
          e.preventDefault();
          console.log(data);
        }); */
        /*  $('.mydatatable tbody').on(
          'click',
          'button.my-custom-button',
          function (e) {
            e.preventDefault();
            console.log(data);
          }
        ); */

        /* $('.mydatatable tbody').on(
          'click',
          'button.my-custom-button',
          function (e) {
            e.preventDefault();
            console.log('YES:', $(this).text());
            console.log(data);
            // alert('Fine');
            // var data = table.row( $(this).parents('tr') ).data();
            // alert( data[0] +"'s salary is: "+ data[ 5 ] );
          }
        ); */
        // console.log('rowCallback ' + new Date());
        return row;
      },
      drawCallback: function () {
        // console.log('drawCallback ' + new Date());
      },
      /*  createdRow: function (
        row: Node,
        data: any[] | Object,
        index: number,
        cells: Node[]
      ) {
        $('.mydatatable tbody').on(
          'click',
          'button.my-custom-button',
          function (e) {
            e.preventDefault();
            console.log('YES:', $(this).text());
            console.log(data);
            // alert('Fine');
            // var data = table.row( $(this).parents('tr') ).data();
            // alert( data[0] +"'s salary is: "+ data[ 5 ] );
          }
        );
        console.log('createdRow ' + new Date());
      }, */
    };
  }

  ngOnInit(): void {
    this.service.getAll().subscribe((applicants) => {
      this.applicants = applicants;
    });
  }

  rowClicked(eventArgs: RowActionWithData<Applicant>) {
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
/*
//Highlight column if it satisfys a particular condition
      createdRow: (row: any, data: any, index: number) => {
        let strVal = function (v: any) {
          return typeof v === 'string' ? v.trim().toUpperCase() : '';
          // typeof v === 'number'
          // ? v
          // : 0;
        };

        // console.log(strVal(data[2])[0]);
        if (strVal(data[2])[0] === 'F') {
          $('td', row).eq(2).addClass('text-success');
        }
      },
      initComplete: function (settings: any) {
        const api: any = this.api();
        console.log(api);
        api.columns().every((x: any) => {
          const column: any = this;
          let select = $(`<select><option value=""></option></select>`)
            .appendTo($(column.header).empty())
            .on('change', () => {
              console.log(this);
              // let val = $.fn.dataTable.util.escapeRegex(
              //   $(this).val()
              // );

              // column
              //   .search(val? `^${val}$` : '', true, false)
              //   .draw()
              // ;
            });
        });
      },
*/
