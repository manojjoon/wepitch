import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'src/app/enum/app-routes.type';
import { LoaderService } from '../../shared/services/loader/loader.service';
import { UserService } from '../../shared/services/User.services';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  PlayerList = [];
  routes = AppRoutes;
  ColumnDefs;
  RowData: any;
  AgLoad: boolean;

  constructor(private UserService: UserService, private _loaderService: LoaderService) { }

  ngOnInit() {

    this.GetAgColumns();
    this.getData();
  }

  public getData() {
    this._loaderService.showLoader();
    this.UserService.getPlayerList().subscribe((result: any) => {
      if (result) {
        debugger;
        this.AgLoad = true;
        this.RowData = result;
      }
      this._loaderService.hideLoader();
    }, err => {
      this._loaderService.hideLoader();
    });
  }

  GetAgColumns() {
    this.ColumnDefs = [
      { headerName: 'ID', field: 'id', sortable: true },
      { headerName: 'Name', field: 'name', sortable: true },
      { headerName: 'Email', field: 'email', sortable: true },
      { headerName: 'UserName', field: 'userName', sortable: true },
      { headerName: 'Phone Number', field: 'phoneNumber', sortable: true },
      { headerName: 'Is Organiser', field: 'isOrganiser', sortable: true },
      { headerName: 'Is Player', field: 'isPlayer', sortable: true }
    ];
  }




}
