import { Component, Input } from "@angular/core";


@Component({
    selector: 'wepitch-grid',
    templateUrl: 'app-grid.component.html'
})

export class AppGridComponent {  
    @Input() ColumnDefs: any;  
    @Input() RowData: any;  
    @Input() IsColumnsToFit: boolean;  
    
    gridApi: any;  
    gridColumnApi: any;  
    
    BindData(params) {  
      this.gridApi = params.api;  
      this.gridColumnApi = params.columnApi;  
      params.api.setRowData(this.RowData);  
      if (this.IsColumnsToFit) {  
        this.gridApi.sizeColumnsToFit();  
      }  
    }  
  }  






