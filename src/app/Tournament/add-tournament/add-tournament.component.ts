import { Component, OnInit } from "@angular/core";
import { NgForm,FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
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
  
  //toastr: any;
  

  constructor(public service: TournamentService,_route: ActivatedRoute, private _tournamentService: TournamentService, private GroundService : GroundService , 
    private _loaderService: LoaderService,private toastr: ToastrService) {
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
        this.service.TournamentValues.patchValue({AmenitiesList : this.AmenitiesList});
        this.service.TournamentValues.updateValueAndValidity();
        this.ImageList = result.groundImagesList;
        debugger;
        this.service.TournamentValues.patchValue({ImageList : this.ImageList});
        this.service.TournamentValues.updateValueAndValidity();
        this.SlotList  = result.slots;
        this.service.TournamentValues.patchValue({SlotList : this.SlotList});
        this.service.TournamentValues.updateValueAndValidity();
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





  resetForm(form?: NgForm) {
    if(this.service.TournamentValues){
      this.service.TournamentValues.reset()
    }
    
    if (form != null)
      form.resetForm();
    //this.intialGroundDetailForm();
    this.service.formData = {
      TournamentName: '',
      EntityName: '',
      Gstin: '',
      OrganizerName:'',
      ContactNumber:'',
      ContactNumber2:'',
      ContactNumber3:'',
      EmailId:'',
      EmailId2: '',
      EmailId3: '',
      StartDateOfTournament: '',
      LastDateOfRegistration: '',
      FullMatchPricing: '',
      PerMatchPricing: '',
      FormatDescription: '',
      TournamentDescription: '',
      AmenitiesList : [],
      ImageList : [],
      SlotList : []


      
      

    }
  }











  public AddTournament()
  {
    debugger;
    this.AmenitiesList;
    this.ImageList;
    this.SlotList;
   console.info(this.service.TournamentValues.value);
  //  return
    // this._loaderService.showLoader();
    this.service.postTournament(Object.assign(this.service.TournamentValues.value)).subscribe((result: any) => {
      debugger;
      this.toastr.success('Insert sucessfully', 'Tournament Add')
      this.resetForm()
      
      this._loaderService.hideLoader();
    },err => {
      this._loaderService.hideLoader();
  
    });
  
  }
}



