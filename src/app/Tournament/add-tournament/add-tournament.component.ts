import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { BaseGridComponent } from "../../../app/shared/app-grid/base-grid.component";
import { TournamentService } from "../../shared/services/Tournament-list.service";
import { LoaderService } from "../../shared/services/loader/loader.service";
import {GroundService} from "../../shared/services/ground.service";

@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit {

 
  GroundNameList = [];
  AmenitiesList = [];
  ImageList = [];
  SlotList = [];
  

  constructor(_route: ActivatedRoute, private _tournamentService: TournamentService, private GroundService : GroundService , private _loaderService: LoaderService) {
    // super(_route);
}

  ngOnInit() {
  
    this.getGroundList();
  }

 
  onChange(deviceValue) {
    debugger;
    this.GroundService.getGround(deviceValue).subscribe((result: any) => {
      if (result) {
        debugger;
        this.AmenitiesList = result.amenitiesList;
        this.ImageList = result.groundImagesList;
        this.SlotList  = result.slots;
      }
    });
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



