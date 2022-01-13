import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Organization } from 'src/app/core/models/organization';
import { RowActionWithData } from 'src/app/shared/models/row-action-with-data';
import { OrganizationService } from '../../services/organization.service';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
})
export class OrganizationsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  defaultSettings: any = {
    dom: 'Bfltrip',
    stateSave: false,
    paging_type: 'full_numbers',
    responsive: true,
    colReorder: true,
    pageLength: 10,
    lengthMenu: [
      [10, 25, 50, 100],
      [10, 25, 50, 100],
    ],
    serverside: true,
    processing: true,
    select: false,
    columnDefs: [{ targets: [1], visible: false, className: 'noVis' }],
  };

  bsModalRef?: BsModalRef;
  selectedItemId!: string;

  constructor(
    private service: OrganizationService,
    private renderer: Renderer2,
    private modalService: BsModalService,
    private titleCasePipe: TitleCasePipe
  ) {
    const self = this;
    let options: any = {
      ajax: (params: any, callback: any) => {
        self.service.getAll().subscribe((items: Organization[]) => {
          callback({
            recordsTotal: items.length,
            recordsFiltered: items.length,
            data: items,
          });
        });
      },
      columnDefs: [
        //Index/Counter Column
        {
          searchable: false,
          orderable: false,
          targets: 0,
        },
      ],
      order: [[2, 'asc']], //Name ASC
      columns: [
        { data: null, title: '' }, //Index/Counter Column
        { data: 'id', title: 'ID', visible: false, orderable: false },
        {
          data: 'code',
          title: 'Code',
        },
        { data: 'name', title: 'Name' },
        {
          data: 'description',
          render: function (data: any, type: string, row: any, meta: object) {
            return type === 'display' && data.length > 40
              ? '<span title="' +
                  data +
                  '">' +
                  data.substr(0, 38) +
                  '...</span>'
              : data;
          },
          title: 'Description',
          type: 'string',
          orderable: false,
          searchable: false,
          defaultContent: null,
        },
        {
          data: null,
          render: function (data: any, type: string, row: any, meta: object) {
            return `<button class="btn btn-sm btn-success btn-edit" edit-organization-id="${row.id}">Edit</button>
            <button class="btn btn-sm btn-danger btn-delete" delete-organization-id="${row.id}">Delete</button>
            `;
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
              self.handleOnNewClicked();
            },
          },
          {
            text: 'Reload',
            action: function (e?: any, dt?: any, node?: any, config?: any) {
              dt.ajax.reload();
            },
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
      initComplete: function (settings: DataTables.Settings, json: object) {
        // Getting API instance
        const api = this.api();
        //Generate Index/Counter Column, target is 1st column
        api
          .on('order.dt search.dt draw.dt', function () {
            api
              .column(0, { search: 'applied', order: 'applied' })
              .nodes()
              .each(function (cell: any, i: number = 0) {
                cell.innerHTML = i + 1;
              });
          })
          .draw();

        //Handle Edits Here
        $('.mydatatable tbody').on('click', '.btn-edit', function () {
          let data = api.row($(this).parents('tr')).data();
          self.openModal('edit', data.id);
          // data.name = 'EDITED';
          // api.row($(this).parents('tr')).data(data).draw(false);
        });

        //Handle Deletes Here
        $('.mydatatable tbody').on('click', '.btn-delete', function () {
          const row = $(this).parents('tr');
          let data = api.row(row).data();
          if (
            !confirm(
              `Are you sure you want to delete record with CODE: ${data.code}`
            )
          )
            return;

          self.service.delete(data.id).subscribe((resp: any) => {
            if (resp) api.row(row).remove().draw(false);
          });
        });
      },
    };

    this.dtOptions = { ...this.defaultSettings, ...options };
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  onRendererClick() {
    //May be used with routing to another page
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('edit-organization-id')) {
        let id = event.target.getAttribute('edit-organization-id');
      }
      if (event.target.hasAttribute('delete-organization-id')) {
        let id = event.target.getAttribute('delete-organization-id');
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  handleOnNewClicked() {
    /* this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      let org = new Organization({
        id: 'new_id',
        code: 'NEW DATA',
        description: 'Great',
        name: 'JJASM',
      });
      dtInstance.row.add(org).draw(false);
    }); */
    this.openModal('new');
  }

  openModal(action: string, id?: string | number) {
    action = action.toLowerCase();
    let title = this.titleCasePipe.transform(`${action} organization`);
    let submitBtnName =
      action === 'view' ? null : action === 'new' ? 'Submit' : 'Save Changes';
    const initialState: ModalOptions = {
      initialState: {
        title,
        id,
        submitBtnName,
      },
    };
    this.bsModalRef = this.modalService.show(
      OrganizationFormComponent,
      initialState
    );
  }
}
