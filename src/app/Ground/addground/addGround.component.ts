import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, EventEmitter, Output, IterableDiffers, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ground } from 'src/app/models/ground.model';
import { GroundImages } from 'src/app/models/groundImages.model';
import { GroundSlot } from 'src/app/models/groundSlot.model';
import { AmenitiesService } from 'src/app/shared/amenities.service';
import { GroundService } from 'src/app/shared/services/ground.service';
import { environment } from 'src/environments/environment';
import { CdkStepper } from '@angular/cdk/stepper';
import { Directionality } from '@angular/cdk/bidi';
import { Router } from '@angular/router';

declare let google: any;

const componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "long_name",
  postal_code: "short_name",
};

@Component({
  selector: 'app-addGround',
  templateUrl: './addGround.component.html',
  styleUrls: ['./addGround.component.css']
})
export class addGroundComponent extends CdkStepper implements OnInit {

  @ViewChild('image', { static: true }) private image: ElementRef;
  @Output() close = new EventEmitter();

  fotterLablels = ['Next', 'Next', 'Next', 'Submit'];

  placeSearch: google.maps.places.PlacesService;
  autocomplete: google.maps.places.Autocomplete;

  groundDetailForm: FormGroup;
  groundData: Ground;
  groundImages: GroundImages[] = [];
  groundSlotList: GroundSlot[] = [{
    id: 0,
    GroundSlotName: "Morning",
    ToTime: "",
    FromTime: "",
    BookingAmount: 0
  }];

  groundImageUrl: string = '';
  TotalRow: number;




  constructor(
    private formbuilder: FormBuilder,
    public service: GroundService,
    private amenitiesService: AmenitiesService,
    private toastr: ToastrService,
    private renderer: Renderer2,
    dir: Directionality,
    changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {
    super(dir, changeDetectorRef);
    //this.intialGroundDetailForm();
  }
  amenitiesList = [];

  error: string;
  uploadError: string;
  rootUrl: string;
  public ListOfSlots = [{ SlotName: 'Morning' }, { SlotName: 'Afternoon' }, { SlotName: 'Evening' }, { SlotName: 'Night' }];

  ngOnInit() {
    this.resetForm();
    this.amenitiesService.getAmenitiesList().subscribe(res => this.amenitiesList = res as []);
    this.initAutocomplete();
  }

  setFloodLights(e) {
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
    if (form != null)
      form.resetForm();
    //this.intialGroundDetailForm();
    this.service.formData = {
      GroundName: '',
      GroundAddress: '',
      GroundEntityName: '',
      GSTIN: '',
      Rating: null,
      LikesCount: null,
      ViewsCount: null,
      GoogleLocation: '',
      DistanceFromLocation: '',
      BookingAmount: null,
      groundSlotList: [],
      amenitiesList: [],
      groundImagesList: []

    }
  }

  fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = this.autocomplete.getPlace();

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


  handleFileInput(file: any) {
    debugger;
    this.service.uploadFile(file[0]).subscribe(result => {
      if (result.message == "Document added succesfully") {
        this.rootUrl = "https://localhost:5001/";
        this.groundImageUrl = this.rootUrl + result.data.fileName;
        const imageUrlFolder = result.data.fileName.split('\\');
        this.groundDetailForm.patchValue({ GroundImage: imageUrlFolder[imageUrlFolder.length - 1] });

        this.uploadError = '';

        const li: HTMLLIElement = this.renderer.createElement('li');

        const img: HTMLImageElement = this.renderer.createElement('img');
        img.src = this.rootUrl + result.data.fileName;
        const lastSegment = img.src.split("/").pop();
        this.groundImages.push({ "imagePath": lastSegment, "isPrimary": false });
        debugger;
        this.renderer.addClass(img, 'product-image');

        const a: HTMLAnchorElement = this.renderer.createElement('a');
        a.innerText = 'Delete';
        this.renderer.addClass(a, 'delete-btn');
        a.addEventListener('click', this.deleteGroundImage.bind(this, result.data.fileName, a));

        this.renderer.appendChild(this.image.nativeElement, li);
        this.renderer.appendChild(li, img);
        this.renderer.appendChild(li, a);


      } else {
        this.uploadError = result.response.message;
      }
    });
    err => this.error = err
  }




  OnAmenitiesChange(name: string, isChecked: boolean) {
    debugger;
    console.log(this.amenitiesList);
  }


  deleteGroundImage(filename, a) {
    const formData = new FormData();
    formData.append('filename', filename);
    this.service.deleteImage(formData).subscribe(
      res => {
        a.parentElement.remove();
      },
      err => this.error = err
    );
  }





  onSubmit(form: NgForm) {
    const _selectedAmenities = this.amenitiesList.filter((item) => item.isSelected);
    debugger;
    const _GroundSlots = this.groundSlotList;
    const _formValues = form.value;


    _formValues["amenitiesList"] = _selectedAmenities;
    _formValues["groundSlotList"] = _GroundSlots;
    _formValues["groundImagesList"] = this.groundImages;
    this.groundData = _formValues;

    this.insertRecord(this.groundData)
  }
  insertRecord(form: Ground) {
    this.service.postGround(form).subscribe(res => {
      this.toastr.success('Insert sucessfully', 'Ground Add')
      this.resetForm()
      this.groundSlotList = [];
      this.AddRowToTable();
    })
  }


  AddNewRow() {
    if (this.groundSlotList.length <= this.ListOfSlots.length - 1){
      this.AddRowToTable();
    }
  }


  // intialGroundDetailForm() {
  //   this.groundDetailForm = this.formbuilder.group({
      
  //   });
  // }




  onClose(data: any) {
    this.close.emit(data);
  }

  initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete") as HTMLInputElement,
      { types: ["geocode"] }
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(["address_component"]);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    this.autocomplete.addListener("place_changed", this.fillInAddress);
  }


  geolocate() {
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
        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  stepChanged(e){
    if(e === 0){
      /**
       * Ground information added need to post for first time & redirect to
       * Select aminities ie 'addGround/aminities'
       */

       this.router.navigate(['addGround/aminities'])


    }else if(e === 1){
      /**
       * Eminiies selected procedd for furhter Chanages
       * redirect to Adding ground slots ie 'addGround/addSlots'
       */

      this.router.navigate(['addGround/addSlots']);

    }else if(e === 2) {
      /**
       * Slots added last page
       * Uploading images 'addGround/uploadImages'
       */
      this.router.navigate(['addGround/uploadImages']);

    }else if(e === 3) {
      /**
       * Images uploaded
       * Need to Submit the ground
       */
      this.service.postGround(this.service.store.value)
      .subscribe(() => {
        /**
         * Need to navigate to a diffrent page
         */

      });

    }

  }
}
