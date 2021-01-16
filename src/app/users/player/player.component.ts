import { Component, OnInit } from '@angular/core';
import { AppRoutes } from 'src/app/enum/app-routes.type';
import{UserService} from '../../shared/services/User.services';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  UserList = [];
  routes = AppRoutes;
  ColumnDefs;  
  RowData: any;  
  AgLoad: boolean; 

  constructor(private UserService: UserService) { }

  ngOnInit() {

    this.GetAgColumns(); 
    this.getData();
  }

  public getData() {
   
    this.UserService.getUserList().subscribe((result: any) => {
      if (result) {
        debugger;
        this.AgLoad=true;
        this.RowData = result;
      }
    });
  }

  GetAgColumns() {  
    this.ColumnDefs = [  
      { headerName: 'ID', field: 'id', sortable: true},  
      { headerName: 'Name', field: 'name', sortable: true},  
      { headerName: 'Email', field: 'email', sortable: true},
      { headerName: 'UserName', field: 'userName', sortable: true},
      { headerName: 'Phone Number', field: 'phoneNumber', sortable: true},
      { headerName: 'Is Organiser', field: 'isOrganiser', sortable: true},
      { headerName: 'Is Player', field: 'isPlayer', sortable: true}
    ];  
  } 


  

}
