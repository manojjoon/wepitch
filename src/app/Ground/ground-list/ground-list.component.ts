import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'src/app/enum/app-routes.type';
import { GroundService } from 'src/app/shared/services/ground.service';
import { LoaderService } from '../../shared/services/loader/loader.service';

@Component({
  selector: 'app-ground-list',
  templateUrl: './ground-list.component.html',
  styleUrls: ['./ground-list.component.css']
})
export class GroundListComponent implements OnInit {

  GroundList = [];
  routes = AppRoutes;
  ColumnDefs;
  RowData: any;
  AgLoad: boolean;

  constructor(private GroundService: GroundService, private _loaderService: LoaderService) { }

  ngOnInit() {
    this.GetAgColumns();
    this.getData();
  }
  public getData() {
    this._loaderService.showLoader();
    this.GroundService.getGroundList().subscribe((result: any) => {
      if (result) {
        debugger;
        this.AgLoad = true;
        this.RowData = result.result;
      }
      this._loaderService.hideLoader();
    }, err => {
      this._loaderService.hideLoader();
    });
  }

  GetAgColumns() {
    this.ColumnDefs = [
      { headerName: 'ID', field: 'id', sortable: true },
      { headerName: 'Ground Name', field: 'groundName', sortable: true },
      { headerName: 'Ground Address', field: 'groundAddress', sortable: true },
      { headerName: 'GSTIN', field: 'gstin', sortable: true },
      { headerName: 'Ground Entity Name', field: 'groundEntityName', sortable: true }
    ];
  }

}
