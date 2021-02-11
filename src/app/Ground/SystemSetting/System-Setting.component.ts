import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseGridComponent } from "src/app/shared/app-grid/base-grid.component";
import { SystemSettingService } from "../../shared/services/SystemSetting.service";
import { LoaderService } from "../../shared/services/loader/loader.service";

@Component({
    selector: 'app-System-Setting-list',
    templateUrl: './System-Setting.component.html',
    styleUrls: ['./System-Setting.component.css']
  })

  export class SystemSettingComponent extends BaseGridComponent implements OnInit {

    ColumnDefs;
    RowData: any;
    AgLoad: boolean;
    SystemSettingList = [];
    context;

    constructor(_route: ActivatedRoute, private _systemSettingService: SystemSettingService, private _loaderService: LoaderService) {
        super(_route);
      }
    

      ngOnInit() {

        this.GetAgColumns();
        var checkListTeam = this._systemSettingService.getSystemSettingList().subscribe((res: any) => {
          debugger;
          this.SystemSettingList = res;
        });
        this.getData();
        // this.context = {
        //   action: this.onGridReady
        // }
      }
  
      public getData() {
        this._loaderService.showLoader();
        this._systemSettingService.getSystemSettingList().subscribe((result: any) => {
          if (result) {
            debugger;
            this.AgLoad = true;
            this.RowData = result;
    
            //this.totalItems = result.Data.RowCount;
          }
          this._loaderService.hideLoader();
        }, err => {
          this._loaderService.hideLoader();
        });
      }
  
      GetAgColumns() {
        this.ColumnDefs = [
          { headerName: 'Id', field: 'id', sortable: true, filter: true },
          { headerName: 'Type', field: 'type', sortable: true, filter: true },
          { headerName: 'Description', field: 'description', sortable: true, filter: true },
    
    
        ];
      }
    }
    