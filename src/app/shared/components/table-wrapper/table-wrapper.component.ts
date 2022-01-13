import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTableType } from '../../models/data-table-type';
import { RowActionWithData } from '../../models/row-action-with-data';

@Component({
  selector: 'table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
})
export class TableWrapperComponent<T>
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  @Input() // Table configuration - settings e.g. columns etc.
  tableConfig!: DataTableType;

  @Input() // Data to be rendered
  tableContent: any[] = [];

  @Input()
  settings: any = {};

  @Output('onRowActionClicked') // Communicate to parent intent to manipulate data in row
  handleRowAction = new EventEmitter<any>();
  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    const self = this;

    const defaultOptions = {
      drawCallback: function () {
        console.log('Table redrawn ' + new Date());
      },
      // Declare the use of the extension in the dom parameter
      dom: 'Bfltrip',
      stateSave: false,
      // configure buttons
      buttons: {
        buttons: [
          {
            text: 'New Record',
            key: '1',
            action: function (e?: any, dt?: any, node?: any, config?: any) {
              const userAction: RowActionWithData = {
                actionToPerfom: 'new',
              };
              self.handleRowAction.emit(userAction);
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
              let selected: any = dt.row({ selected: true }).data();
              const userAction: RowActionWithData = {
                actionToPerfom: config.text.toLowerCase().trim(),
                rowData: selected,
              };
              self.handleRowAction.emit(userAction);
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
      pagingType: 'full_numbers',
      pageLength: this.tableConfig.rowsPerPage,
      processing: true,
      responsive: true,
      lengthMenu: [
        [2, 5, 10, 25, -1],
        [2, 5, 10, 25, 'All'],
      ],
    };

    this.dtOptions = { ...defaultOptions, ...this.settings };
  }

  private strVarName(value: string): string {
    return value.trim().toLowerCase().replace(/\s/g, '-');
  }

  private addTextInputToFooterCell() {
    const self = this;
    //Add Filter Input Dynamically
    $('.mydatatable tfoot th').each(function () {
      let title = $(this).text();
      let html = `<input type="text" placeholder="Search ${title}" name="search-${self.strVarName(
        title
      )}"/>`;
      if (title.trim().toLowerCase() === 'actions') html = `${title}`;
      $(this).html(html);
    });
  }

  private enableFilterByColumns() {
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

  ngAfterViewInit(): void {
    this.addTextInputToFooterCell();

    //Redraw the datatable
    this.dtTrigger.next();

    this.enableFilterByColumns();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onRowActionClicked(event: any, actionType: string, rowData: any): void {
    event.stopPropagation();
    const userAction: RowActionWithData = {
      actionToPerfom: actionType,
      rowData: rowData,
    };
    this.handleRowAction.emit(userAction);
  }
}
