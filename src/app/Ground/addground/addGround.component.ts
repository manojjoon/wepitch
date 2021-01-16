import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, EventEmitter, Output, IterableDiffers  } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ground } from 'src/app/models/ground.model';
import { GroundImages } from 'src/app/models/groundImages.model';
import { GroundSlot } from 'src/app/models/groundSlot.model';
import { AmenitiesService } from 'src/app/shared/amenities.service';
import { GroundService } from 'src/app/shared/services/ground.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addGround',
  templateUrl: './addGround.component.html',
  styleUrls: ['./addGround.component.css']
})
export class addGroundComponent implements OnInit {

  groundDetailForm: FormGroup;
  groundData : Ground;
  groundImages: GroundImages[]=[];
  groundSlotList: GroundSlot[] = [{
    id:0,
    GroundSlotName : "Morning",
    ToTime : "",
    FromTime : "",
    BookingAmount : 0
  }];

  groundImageUrl: string = '';
  TotalRow : number;
  @ViewChild('image', { static: true }) private image: ElementRef;
  @Output() close = new EventEmitter();



  constructor(
    private formbuilder: FormBuilder,
    private service : GroundService,
    private amenitiesService : AmenitiesService,
    private toastr : ToastrService,
    private renderer: Renderer2

    ) {
      this.intialGroundDetailForm();
     }
    amenitiesList =[];
  
    error : string;
    uploadError : string;
    rootUrl: string;
   public ListOfSlots=[{SlotName:'Morning'},{SlotName:'Afternoon'},{SlotName:'Evening'},{SlotName:'Night'}];

  ngOnInit() {
    this.resetForm();
    // this.AddRowToTable();
    this.amenitiesService.getAmenitiesList().subscribe(res => this.amenitiesList = res as[]);
  }

  setFloodLights(e) {
    debugger;
    if(e.target.value=="false")
    {
      this.ListOfSlots.splice(3,1);
    }
    else
    {
      if(!this.ListOfSlots.some((item)=> item.SlotName=="Night"))
      {
      this.ListOfSlots.push({SlotName: "Night"});
      }
    }
  }
  
 
  AddRowToTable()
  {
    let tempList = JSON.parse(JSON.stringify(this.groundSlotList));
    let _SlotObj = Object.assign({},{
      id:0,
      GroundSlotName : "Morning",
      ToTime : "",
      FromTime : "",
      BookingAmount : 0
    });

    tempList.push(_SlotObj);
    this.groundSlotList=[];
    
    this.groundSlotList =tempList;
    console.log(this.groundSlotList);
  }
  
  resetForm(form?: NgForm){
    if (form!=null)
    form.resetForm();
    this.intialGroundDetailForm();
    this.service.formData = {
      GroundName : '',
      GroundAddress : '',
      GroundEntityName : '',
      GSTIN:'',
      Rating : null,
      LikesCount : null,
      ViewsCount : null,
      GoogleLocation : '',
      DistanceFromLocation : '',
      BookingAmount : null,
      groundSlotList: [],
      amenitiesList : [],
      groundImagesList :[]
      
    }
  }

   
  handleFileInput(file: any) {
    debugger;
    this.service.uploadFile(file[0]).subscribe(result => { 
      if (result.message=="Document added succesfully") 
      {
        this.rootUrl ="https://localhost:5001/";
        this.groundImageUrl = this.rootUrl + result.data.fileName;
        const imageUrlFolder = result.data.fileName.split('\\');
        this.groundDetailForm.patchValue({ GroundImage: imageUrlFolder[imageUrlFolder.length - 1] });

        this.uploadError = '';

        const li: HTMLLIElement = this.renderer.createElement('li');

        const img: HTMLImageElement = this.renderer.createElement('img');
        img.src = this.rootUrl + result.data.fileName;
        const lastSegment = img.src.split("/").pop();
        this.groundImages.push({"imagePath":lastSegment,"isPrimary":false});
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




OnAmenitiesChange(name: string, isChecked: boolean)
{
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





  onSubmit(form : NgForm){
    const _selectedAmenities = this.amenitiesList.filter((item)=>item.isSelected);
    debugger;
    const _GroundSlots = this.groundSlotList;
    const _formValues = form.value;
    
    
    _formValues["amenitiesList" ]=_selectedAmenities;
    _formValues["groundSlotList"] = _GroundSlots;
    _formValues["groundImagesList"] = this.groundImages;
    debugger;
    this.groundData=_formValues;
  
   this.insertRecord(this.groundData)
  }
  insertRecord(form : Ground){
    debugger;
  this.service.postGround(form).subscribe(res => {
    this.toastr.success('Insert sucessfully','Ground Add')
    this.resetForm()
    this.groundSlotList = [];
    this.AddRowToTable();
  })
  }


  AddNewRow()
  {
    debugger;
    if(this.groundSlotList.length<=this.ListOfSlots.length-1)
    this.AddRowToTable();
  }
   

  intialGroundDetailForm() {
    this.groundDetailForm = this.formbuilder.group({
        Id: [0],
        amenitiesList :[],
        GroundImage:[]
    });
}


onClose(data: any) {
  this.close.emit(data);
}





}
