import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutes } from 'src/app/enum/app-routes.type';
import { GroundService } from 'src/app/shared/services/ground.service';
import { ActionComponent } from '../../shared/action-formatter.component';
import { BaseGridComponent } from '../../shared/app-grid/base-grid.component';
import { LoaderService } from '../../shared/services/loader/loader.service';

@Component({
  selector: 'app-ground-list',
  templateUrl: './ground-list.component.html',
  styleUrls: ['./ground-list.component.css']
})
export class GroundListComponent extends BaseGridComponent implements OnInit {

  GroundList = [];
  routes = AppRoutes;
  ColumnDefs;
  RowData: any;
  AgLoad: boolean;
  context;

  constructor(private GroundService: GroundService,
    _route: ActivatedRoute,
    private _loaderService: LoaderService, private _router: Router) {
    super(_route)
  }

  ngOnInit() {
    this.GetAgColumns();
    this.getData();
    this.context = {
      action: this.onGridReady
    }
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
      { headerName: 'Ground Entity Name', field: 'groundEntityName', sortable: true },
      { headerName: 'Action', field: 'Action', sortable: true, filter: true, cellRendererFramework: ActionComponent }
    ];
  }

  onGridReady = (params) => {
    debugger;
    const { actionId, item } = params;
    if (actionId === 'edit') {
      debugger;
      this._router.navigate(['addGround/init', item.id]);
    } else if (actionId === 'delete') {

    }
  }
}
