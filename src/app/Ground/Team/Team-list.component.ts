import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseGridComponent } from "src/app/shared/app-grid/base-grid.component";
import { TeamService } from "src/app/shared/services/Team-list.service";


@Component({
    selector: 'app-Team-list',
    templateUrl: './Team-list.component.html',
    styleUrls: ['./Team-list.component.css']
  })

  export class TeamListComponent extends BaseGridComponent implements OnInit {
    
    ColumnDefs;
    RowData: any;
    AgLoad: boolean;
    teamList = [];
    context;
    

    constructor(_route: ActivatedRoute, private _teamService: TeamService) {
        super(_route);
      }

      ngOnInit() {
        
        this.GetAgColumns();  
    var checkListTeam=this._teamService.getTeamList().subscribe((res: any) => {
      debugger;
      this.teamList = res;
    });
        this.getData();
        // this.context = {
        //   action: this.onGridReady
        // }
      }

      public getData() {
   
        this._teamService.getTeamList().subscribe((result: any) => {
          if (result) {
            debugger;
            this.AgLoad=true;
            this.RowData = result;
     
            //this.totalItems = result.Data.RowCount;
          }
        });
      }

    //   onGridReady = (params) => {
    //     const { actionId, item } = params;
    //     if (actionId === 'edit') {
    //     } else if (actionId === 'delete') {
    
    //     }
    //   }

      GetAgColumns() {
        this.ColumnDefs = [
          { headerName: 'TeamName', field: 'name', sortable: true, filter: true },
          { headerName: 'Admin Member Name', field: 'adminMemberName', sortable: true, filter: true },
          { headerName: 'LogoUrl', field: 'logoUrl', sortable: true, filter: true },
          
          
        ];
      }
    }
    