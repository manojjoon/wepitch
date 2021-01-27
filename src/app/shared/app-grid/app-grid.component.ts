import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
  selector: 'wepitch-grid',
  templateUrl: 'app-grid.component.html'
})

export class AppGridComponent {
  @Input() ColumnDefs: any;
  @Input() RowData: any;
  @Input() IsColumnsToFit: boolean;
  @Input() context: any;
  defaultColDef = {
    autoHeight: true,
  };;

  @Output() gridReady = new EventEmitter();

  gridApi: any;
  gridColumnApi: any;

  BindData(params) {
    this.gridReady.next(params);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.setRowData(this.RowData);
    if (this.IsColumnsToFit) {
      this.gridApi.sizeColumnsToFit();
    }
  }
}






