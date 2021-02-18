import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseGridComponent } from "src/app/shared/app-grid/base-grid.component";
import { TournamentService } from "../../shared/services/Tournament-list.service";
import { LoaderService } from "../../shared/services/loader/loader.service";

@Component({
    selector: 'app-Tournament-list',
    templateUrl: './Tournament-list.component.html',
    styleUrls: ['./Tournament-list.component.css']
  })

  export class TournamentListComponent extends BaseGridComponent implements OnInit {

    ColumnDefs;
    RowData: any;
    AgLoad: boolean;
    tournamentList = [];
    context;

    constructor(_route: ActivatedRoute, private _tournamentService: TournamentService, private _loaderService: LoaderService) {
        super(_route);
    }

    ngOnInit() {

        this.GetAgColumns();
        var checkListTeam = this._tournamentService.getTournamentList().subscribe((res: any) => {
          debugger;
          this.tournamentList = res;
        });
        this.getData();
        // this.context = {
        //   action: this.onGridReady
        // }
      }

      public getData() {
        this._loaderService.showLoader();
        this._tournamentService.getTournamentList().subscribe((result: any) => {
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
          { headerName: 'TournamentName', field: 'tournamentName', sortable: true, filter: true },
          { headerName: 'Gstin', field: 'gstin', sortable: true, filter: true },
          { headerName: 'EntityName', field: 'entityName', sortable: true, filter: true },
          { headerName: 'OrganizerName', field: 'organizerName', sortable: true, filter: true },
          { headerName: 'ContactNumber1', field: 'contactNumber1', sortable: true, filter: true },
          { headerName: 'ContactNumber2', field: 'contactNumber2', sortable: true, filter: true },
          { headerName: 'ContactNumber3', field: 'contactNumber3', sortable: true, filter: true },
          { headerName: 'EmailId1', field: 'emailId1', sortable: true, filter: true },
          { headerName: 'EmailId2', field: 'emailId2', sortable: true, filter: true },
          { headerName: 'EmailId3', field: 'emailId3', sortable: true, filter: true },
          { headerName: 'StartDateOfTournament', field: 'startDateOfTournament', sortable: true, filter: true },
          { headerName: 'LastDateOfRegistration', field: 'lastDateOfRegistration', sortable: true, filter: true },
          { headerName: 'FullMatchPricing', field: 'fullMatchPricing', sortable: true, filter: true },
          { headerName: 'PerMatchPricing', field: 'perMatchPricing', sortable: true, filter: true },
          { headerName: 'TournamentDescription', field: 'tournamentDescription', sortable: true, filter: true },
          { headerName: 'FormatDescription', field: 'formatDescription', sortable: true, filter: true },
    
    
        ];
      }
    }
    


  
  