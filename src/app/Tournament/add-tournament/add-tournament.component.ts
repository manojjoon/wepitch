import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { BaseGridComponent } from "src/app/shared/app-grid/base-grid.component";
import { TournamentService } from "../../shared/services/Tournament-list.service";
import { LoaderService } from "../../shared/services/loader/loader.service";

@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit {

 
  GroundNameList = [];
  

  constructor(_route: ActivatedRoute, private _tournamentService: TournamentService, private _loaderService: LoaderService) {
    // super(_route);
}

  ngOnInit() {
    
    
    this.getGroundList();
  }

  public getGroundList()
  
 {
    this._loaderService.showLoader();
    this._tournamentService.getGroundNameList().subscribe((result: any) => {
      if (result) {
        debugger;
       this.GroundNameList = result;
       
      }
      this._loaderService.hideLoader();
    }, err => {
      this._loaderService.hideLoader();
    });
  }
}



