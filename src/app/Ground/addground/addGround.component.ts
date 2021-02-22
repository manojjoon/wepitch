import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, EventEmitter, Output, IterableDiffers, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ground } from 'src/app/models/ground.model';
import { GroundImages } from 'src/app/models/groundImages.model';
import { GroundSlot } from 'src/app/models/groundSlot.model';
import { AmenitiesService } from 'src/app/shared/amenities.service';
import { GroundService } from 'src/app/shared/services/ground.service';
import { environment } from 'src/environments/environment';
import { CdkStepper } from '@angular/cdk/stepper';
import { Directionality } from '@angular/cdk/bidi';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { CalenderComponent } from 'src/app/calender/calender.component';
import { MatStepper } from '@angular/material/stepper';
import { concat, forkJoin } from 'rxjs';
import { combineAll } from 'rxjs/operators';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoaderService } from '../../shared/services/loader/loader.service';
import { ModalService } from 'src/app/_modal/modal.service';

declare let google: any;
declare let moment: any;

const componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "long_name",
  postal_code: "short_name",
};

@Pipe({
  name: 'amenity'
})
export class AmenityPipe implements PipeTransform{

  transform(value, args){
    console.log({value, args});
    value.forEach((e) => {
      e.isSelected = args.find(a => a.id === e.id) ? true : false;
    });
    return value;
  }

}

@Pipe({
  name: 'bindImage'
})
export class ImageBindPipe implements PipeTransform{

  transform(value){
    return `${environment.baseUrlImage}${value}`
  }

}

@Component({
  selector: 'app-addGround',
  templateUrl: './addGround.component.html',
  styleUrls: ['./addGround.component.css']
})
export class addGroundComponent extends CdkStepper implements OnInit {

  @ViewChild('image', { static: true }) private image: ElementRef;
  @ViewChild(CalenderComponent, { static: true }) private calendarComponent: CalenderComponent;
  @ViewChild(MatStepper, { static: true }) private stepper: MatStepper;
  @Output() close = new EventEmitter();

  data;
  primaryImage: number;
  public Editor = ClassicEditor

  options = { minDate: moment() }

  fotterLablels = ['Next', 'Next', 'Next', 'Submit'];

  placeSearch: google.maps.places.PlacesService;
  autocomplete: { [key: string]: google.maps.places.Autocomplete } = {};

  groundDetailForm: FormGroup;
  groundData: Ground;
  groundImages: GroundImages[] = [];
  groundSlotList: GroundSlot[] = [{
    id: 0,
    GroundSlotName: "Morning",
    ToTime: "",
    FromTime: ""
  }];

  groundImageUrl: string = '';
  AddEditGroundLabel: string = '';
  TotalRow: number;

  activeStep: number = 0;
  id: number;

  slottoUpdate: FormGroup;

  uploadedImages = [];

  constructor(
    public service: GroundService,
    private amenitiesService: AmenitiesService,
    private toastr: ToastrService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    dir: Directionality,
    changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private _loaderService: LoaderService,
    private modal: ModalService
  ) {
    super(dir, changeDetectorRef);

    //this.intialGroundDetailForm();
  }
  ckeditorLoaded: boolean;
  amenitiesList = [];

  error: string;
  uploadError: string;
  rootUrl: string;
  public ListOfSlots = [{ SlotName: 'Morning' }, { SlotName: 'Afternoon' }, { SlotName: 'Evening' }, { SlotName: 'Night' }];

  ngOnInit() {
    this.resetForm();
    this.getDetails();
    this.route.params.subscribe((params) => {

      this.activeStep = {
        'init': 0,
        addSlots: 1,
        uploadImages: 2,
        groundRules: 3
      }[params.step]
      this.id = +params.id;
      if (this.id && params.step == 'init') {
        this.getGroundDetails();
        this.AddEditGroundLabel = 'Update Ground';
      }else{
        this.AddEditGroundLabel = 'Add Ground';
        this.service.store.setControl('slots', new FormArray([]));
        this.service.store.setControl('amenitiesList', new FormArray([]));
        //this.service.addSlot();
      }
      
      this.initFormGroup();
    });
    
    this.service.calenderEvent
    .subscribe((value) => {
      console.log({value});
      this.slottoUpdate = new FormGroup({
        groundId: new FormControl(),
        groundSlotTimingId: new FormControl(),
        groundSlotName: new FormControl(),
        startDate: new FormControl(),
        endDate: new FormControl(),
        pricing: new FormControl(),
        isAdded: new FormControl(false)
      });
      this.slottoUpdate.patchValue(value);
      //value;
      this.modal.open('editDateSlot');
    });
  }

  closeModal(){
    this.modal.close('editDateSlot');
    return true;
  }

  getDetails() {
    this._loaderService.showLoader();
    this.amenitiesService.getAmenitiesList().subscribe(res => {
      this.amenitiesList = res as [];
      this._loaderService.hideLoader();
    }, err => {
      this._loaderService.hideLoader();
    });
  }

  onChange({ editor }){
    this.data = editor.getData();
  }

  initFormGroup() {
    if (!this.service.slots && this.activeStep === 1) {
      this.service.getGroundSlotTimings(this.id)
        .subscribe((res) => {
          this.service.convertToFormArray(res);
        })
    } else if(this.activeStep === 2){
      this._loaderService.showLoader();
      this.service.getAllGroundImages(this.id)
      .subscribe((res) => {
        this.uploadedImages = Array.isArray(res) ? res : [];
        
        this._loaderService.hideLoader();
      }, () => {
        this._loaderService.hideLoader();
      });
    } else if(this.activeStep === 3){
      this._loaderService.showLoader();
      this.service.getGroundRules(this.id)
      .subscribe((res: any) => {
        this.data = (res.result && res.result.ruleDescription) ? res.result.ruleDescription : 'Enter Your rules';
        this.ckeditorLoaded = true;
        this._loaderService.hideLoader();
      }, () => {
        this.data = 'Enter Ground rules'
        this.ckeditorLoaded = true;
        this._loaderService.hideLoader();
      })
    }
  }

  setFloodLights(e) {
    //this.service.store.get('IsFloodLights').patchValue(e.value == 'true')
    if (e.target.value == "false") {
      this.ListOfSlots.splice(3, 1);
    }
    else {
      if (!this.ListOfSlots.some((item) => item.SlotName == "Night")) {
        this.ListOfSlots.push({ SlotName: "Night" });
      }
    }
  }


  AddRowToTable() {
    let tempList = JSON.parse(JSON.stringify(this.groundSlotList));
    let _SlotObj = Object.assign({}, {
      id: 0,
      GroundSlotName: "Morning",
      ToTime: "",
      FromTime: "",
      BookingAmount: 0
    });

    tempList.push(_SlotObj);
    this.groundSlotList = [];

    this.groundSlotList = tempList;
    console.log(this.groundSlotList);
  }

  resetForm(form?: NgForm) {
    if(this.service.store){
      this.service.reset()
    }
    
    if (form != null)
      form.resetForm();
    //this.intialGroundDetailForm();
    this.service.formData = {
      GroundName: '',
      GroundAddress: '',
      GroundEntityName: '',
      GroundOwner:'',
      GroundOwner2:'',
      ownerEmailId:'',
      owner2EmailId:'',
      ContactNo:'',
      Discount:null,
      GSTIN: '',
      Rating: null,
      LikesCount: null,
      ViewsCount: null,
      IsFloodLights: null,
      GoogleLocation: '',
      DistanceFromLocation: '',
      groundSlotList: [],
      amenitiesList: [],
      groundImagesList: []

    }
  }

  fillInAddress(elId) {
    // Get the place details from the autocomplete object.
    const place = this.autocomplete[elId].getPlace();

    for (const component in componentForm) {
      (document.getElementById(component) as HTMLInputElement).value = "";
      (document.getElementById(component) as HTMLInputElement).disabled = false;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
      const addressType = component.types[0];

      if (componentForm[addressType]) {
        const val = component[componentForm[addressType]];
        (document.getElementById(addressType) as HTMLInputElement).value = val;
      }
    }
  }


  handleFileInput(files: any) {
    const listOfGroundImages = [];
    this._loaderService.showLoader();
    forkJoin(Array.from(files).map((file) => {
      return this.service.uploadFile(file)
    }))
      .subscribe((results: any) => {

        results.forEach((result, i) => {
          if (result.message == "Document added succesfully") {
            //this.groundImageUrl = this.rootUrl + result.data.fileName;
            //const imageFileName = result.data.fileName.split('\\');
            //this.groundDetailForm.patchValue({ GroundImage: imageUrlFolder[imageUrlFolder.length - 1] });
            var imagename = result.data.fileName.split('\\').pop();
            this.uploadedImages.push({
              imagePath: imagename,
              isPrimary: false
            })
          
            this.uploadError = '';

            //const li: HTMLLIElement = this.renderer.createElement('li');

            //const img: HTMLImageElement = this.renderer.createElement('img');
            //img.src = `${environment.baseUrlImage}${result.data.fileName}`;
            //const lastSegment = img.src.split("/").pop();
            //this.groundImages.push({ "imagePath": lastSegment, "isPrimary": false });
            //this.renderer.addClass(img, 'product-image');

            //const a: HTMLAnchorElement = this.renderer.createElement('a');
            //a.innerText = 'Delete';
            //this.renderer.addClass(a, 'delete-btn');
            //a.addEventListener('click', this.deleteGroundImage.bind(this, result.data.fileName, a));

            // this.renderer.appendChild(this.image.nativeElement, li);
            // this.renderer.appendChild(li, img);
            // this.renderer.appendChild(li, a);


          } else {
            this.uploadError = result.response.message;
          }
          this._loaderService.hideLoader();
        });
      });
  }

  updateImages(listOfGroundImages){
    this.service.updateGroundImages({
      groundId: this.id,
      listOfGroundImages
    }).subscribe(() => {
      this._loaderService.hideLoader();
    }, () => {
      this._loaderService.hideLoader();
    });
  }

  onAmenitiesChange(e) {
    const checkArray: FormArray = this.service.store.get('amenitiesList') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl({ id: e.target.value, isSelected: true }));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  deleteGroundImage(filename, a) {
    const formData = new FormData();
    formData.append('filename', filename);
    this._loaderService.showLoader();
    this.service.deleteImage(formData).subscribe(
      res => {
        a.parentElement.remove();
        this._loaderService.hideLoader();
      },
      err => {
        this.error = err;
        this._loaderService.hideLoader();
      }
    );
  }

  onSubmit(form: NgForm) {
    const _selectedAmenities = this.amenitiesList.filter((item) => item.isSelected);
    
    const _GroundSlots = this.groundSlotList;
    const _formValues = form.value;


    _formValues["amenitiesList"] = _selectedAmenities;
    _formValues["groundSlotList"] = _GroundSlots;
    _formValues["groundImagesList"] = this.groundImages;
    this.groundData = _formValues;

    this.insertRecord(this.groundData)
  }

  insertRecord(form: Ground) {
    this._loaderService.showLoader();
    this.service.postGround(form).subscribe(res => {
      this.toastr.success('Insert sucessfully', 'Ground Add')
      this.resetForm()
      this.groundSlotList = [];
      this.AddRowToTable();
      this._loaderService.hideLoader();
    }, err => {
      this._loaderService.hideLoader();
    })
  }

  addSlot() {
    // if (this.groundSlotList.length <= this.ListOfSlots.length - 1){
    //   this.AddRowToTable();
    // }
  }

  // intialGroundDetailForm() {
  //   this.groundDetailForm = this.formbuilder.group({

  //   });
  // }

  onClose(data: any) {
    this.close.emit(data);
  }

  initAutocomplete(elId) {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    this.autocomplete[elId] = new google.maps.places.Autocomplete(
      document.getElementById(elId) as HTMLInputElement,
      { types: ["geocode"] }
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete[elId].setFields(["address_component"]);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete[elId].addListener("place_changed", () => {
      this.fillInAddress(elId)
    });
  }

  onNext() {

  }

  getDater(event) {
    console.log(event);
  }

  geolocate(elId) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy,
        });
        this.autocomplete[elId].setBounds(circle.getBounds());
      });
    }
  }

  stepChanged(e) {
    if (e === 1) {
      /**
       * Eminiies selected procedd for furhter Chanages
       * redirect to Adding ground slots ie 'addGround/addSlots'
       */
      this.service.postGround(Object.assign(this.service.store.value, { IsFloodLights: this.service.store.value['IsFloodLights'] === 'true' }))
        .subscribe((res: any) => {
          
          this.router.navigate([`addGround/addSlots/${res.groundId ? res.groundId : this.id}`]);
          this.stepper.next();
        }, () => {

        })
    } else if (e === 2) {
      /**
       * Slots added last page
       * Uploading images 'addGround/uploadImages'
       */


      this.router.navigate([`addGround/uploadImages/${this.id}`]);
      

    } else if (e === 3) {
      /**
       * Will be cheking if the images are more than six
       */

      this.updateImages(this.uploadedImages)
      //if((this.uploadedImages.length + this.groundImages.length) > 6){
      this.router.navigate([`addGround/groundRules/${this.id}`]);
      //}
      
    } else if (e === 4) {

      // const rules = this.Editor.getData();
      
      this._loaderService.showLoader();
      this.service.saveRules({
        "id": 0,
        "groundId": this.id,
        "ruleDescription": this.data
      })
      .subscribe(() => {
        this.router.navigate(['/grounds'])
        this._loaderService.hideLoader();
      }, () => {
        this._loaderService.hideLoader()
      })

    }

  }

  addSlotDates(addAnother, slot) {
    this._loaderService.showLoader();
    this.service.addSlotDates(addAnother, slot)
      .subscribe((res) => {
        setTimeout(() => {
          this.calendarComponent.detectChanges();
        });
        this._loaderService.hideLoader();
      }, err => {
        this._loaderService.hideLoader();
      })
  }

  getGroundDetails() {
    this._loaderService.showLoader();
    this.service.getGround(this.id).subscribe(res => {
      console.log({res})
      const checkArray: FormArray = this.service.store.get('amenitiesList') as FormArray;
      res.slots.forEach(() => {
        this.service.addSlot();
      });
      res.amenitiesList.forEach(() => {
        checkArray.push(new FormControl())
      });
      res.isFloodLights = res.isFloodLights ? "true" : "false"
      this.service.store.patchValue(res);
      this._loaderService.hideLoader();
    }, err => {
      this._loaderService.hideLoader();

    });
  }

  ngAfterViewInit() {
    this.initAutocomplete('googleLocation');
    this.initAutocomplete('landmark');
  }

  selectPrimary(index: number){
    this.uploadedImages[this.primaryImage] ? this.uploadedImages[this.primaryImage].isPrimary = true : {};
    this.primaryImage = index;
    this.uploadedImages[index].isPrimary = true;
  }
}
