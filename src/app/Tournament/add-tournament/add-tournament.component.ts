import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit,Output,ViewChild } from "@angular/core";
import { NgForm,FormArray, FormBuilder, FormGroup ,FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { MatStepper } from '@angular/material/stepper';
import { BaseGridComponent } from "../../../app/shared/app-grid/base-grid.component";
import { TournamentService } from "../../shared/services/Tournament-list.service";
import { LoaderService } from "../../shared/services/loader/loader.service";
import {GroundService} from "../../shared/services/ground.service";
import { AmenitiesService } from 'src/app/shared/amenities.service';
import { Tournament } from "src/app/models/Tournament.model";
import { GroundImages } from "src/app/models/groundImages.model";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CdkStepper } from "@angular/cdk/stepper";
import { CalenderComponent } from "src/app/calender/calender.component";
import { Directionality } from "@angular/cdk/bidi";
import { GroundSlot } from "src/app/models/groundSlot.model";
//import{NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})

export class AddTournamentComponent extends CdkStepper implements OnInit {
  @ViewChild('image', { static: true }) private image: ElementRef;
  @ViewChild(CalenderComponent, { static: true }) private calendarComponent: CalenderComponent;
  @ViewChild(MatStepper, { static: true }) private stepper: MatStepper;
  @Output() close = new EventEmitter();


 
  GroundNameList = [];
  AmenitiesList = [];
  ImageList = [];
  SlotList = [];
  route: any;
  data: any;
  ckeditorLoaded: boolean;
  amenitiesList = [];

  
  primaryImage: number;
  public Editor = ClassicEditor

  //options = { minDate: moment() }

  fotterLablels = ['Next', 'Next', 'Next', 'Submit'];
  tournamentRulesList: any;
  groundData: any;
  
  //toastr: any;
  

  constructor(public service: TournamentService,_route: ActivatedRoute, private _tournamentService: TournamentService, private GroundService : GroundService ,
    private amenitiesService: AmenitiesService, 
    dir: Directionality,
    changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private _loaderService: LoaderService,private toastr: ToastrService) {
      super(dir, changeDetectorRef);
}

tournamentDetailForm: FormGroup;
  tournamentData: Tournament;
  groundImages: GroundImages[] = [];
  groundSlotList: GroundSlot[] = [{
    id: 0,
    GroundSlotName: "Morning",
    ToTime: "",
    FromTime: ""
  }];
  
  groundImageUrl: string = '';
  AddEditTournamentLabel: string = '';
  TotalRow: number;

  activeStep: number = 0;
  id: number;
  uploadedImages = [];

   ngOnInit() {
     debugger;
  
     this.getGroundList();
       this.resetForm();
      //this.getDetails();
      this.route.params.subscribe((params) => {
debugger;
        this.activeStep = {
          'init': 0,
          // addSlots: 1,
          //uploadImages: 1,
          tournamentRules: 1
        }[params.step]
        this.id = +params.id;
        if (this.id && params.step == 'init') {
          this.getTournamentDetails();
          this.AddEditTournamentLabel = 'Update Tournament';
        }else{
          this.AddEditTournamentLabel = 'Add Tournament';
          //this.service.store.setControl('slots', new FormArray([]));
          //this.service.store.setControl('amenitiesList', new FormArray([]));
          //this.service.addSlot();
        }
        
        this.initFormGroup();
      });
  }


  initFormGroup() {
    // if (!this.service.slots && this.activeStep === 1) {
    //   this.service.getGroundSlotTimings(this.id)
    //     .subscribe((res) => {
    //       this.service.convertToFormArray(res);
    //     })
    //}
       if(this.activeStep === 1){
      this._loaderService.showLoader();
      this.service.getTournamentRules(this.id)
      .subscribe((res: any) => {
        this.data = (res.result && res.result.ruleDescription) ? res.result.ruleDescription : 'Enter Your rules';
        this.ckeditorLoaded = true;
        this._loaderService.hideLoader();
      }, () => {
        this.data = 'Enter Tournament rules'
        this.ckeditorLoaded = true;
        this._loaderService.hideLoader();
      })
    }
  }


  // getDetails() {
  //   this._loaderService.showLoader();
  //   this.service.getTournamentRules.subscribe((res: any) => {
  //     debugger;
  //     this.tournamentRulesList = res;
  //     this._loaderService.hideLoader();
  //   }), err => {
  //     this._loaderService.hideLoader();
  //   };
  //  }

 
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
      OrganizerName2:'',
      OrganizerName3:'',
      ContactNumber1:'',
      ContactNumber2:'',
      ContactNumber3:'',
      EmailId1:'',
      EmailId2: '',
      EmailId3: '',
      StartDateOfTournament: '',
      LastDateOfRegistration: '',
      FullMatchPricing: '',
      PerMatchPricing: '',
      FormatDescription: '',
      TournamentDescription: '',
      MatchAward: '',
      SeriesAward: '',
      AmenitiesList : [],
      ImageList : [],
      SlotList : []


      
      

    }
  }

  onSubmit(form: NgForm) {
    const _selectedAmenities = this.amenitiesList.filter((item) => item.isSelected);
    
    const _GroundSlots = this.groundSlotList;
    const _formValues = form.value;


    _formValues["amenitiesList"] = _selectedAmenities;
    _formValues["groundSlotList"] = _GroundSlots;
    _formValues["groundImagesList"] = this.groundImages;
    this.groundData = _formValues;
     this.tournamentData = _formValues;
    this.insertRecord(this.tournamentData)
  }

  insertRecord(form: Tournament) {
    this._loaderService.showLoader();
    this.service.postTournament(form).subscribe(res => {
      this.toastr.success('Insert sucessfully', 'Tournament Add')
      this.resetForm()
      this.tournamentRulesList= [];
      this._loaderService.hideLoader();
    }, err => {
      this._loaderService.hideLoader();
    })
  }

  
  stepChanged(e) {
    if (e === 1) {
      
     this.service.postTournament(this.service.store.value)   
     .subscribe((res: any) => {
          
          this.router.navigate([`addTournament/tournamentRules/${this.id}`]);
          this.stepper.next();
        }, () => {

        })
    }else if (e === 2) {

      // const rules = this.Editor.getData();
      
      this._loaderService.showLoader();
      this.service.saveRules({
        "id": 0,
        "tournamentId": this.id,
        "ruleDescription": this.data
      })
      .subscribe(() => {
        this.router.navigate(['/Tournaments'])
        this._loaderService.hideLoader();
      }, () => {
        this._loaderService.hideLoader()
      })

    }

  }



  

  getTournamentDetails() {
    this._loaderService.showLoader();
    this.service.getTournament(this.id).subscribe(res => {
      console.log({res})
      const checkArray: FormArray = this.service.store.get('amenitiesList') as FormArray;
      res.slots.forEach(() => {
       // this.service.addSlot();
      });
      res.amenitiesList.forEach(() => {
        checkArray.push(new FormControl())
      });
      //res.isFloodLights = res.isFloodLights ? "true" : "false"
      this.service.store.patchValue(res);
      this._loaderService.hideLoader();
    }, err => {
      this._loaderService.hideLoader();

    });
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
      this.toastr.success('Insert successfully', 'Tournament Add')
      this.resetForm()
      
      this._loaderService.hideLoader();
    },err => {
      this._loaderService.hideLoader();
  
    });

    
  
  }
}



