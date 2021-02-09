import { Component, OnInit, Renderer2, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AmenitiesService } from 'src/app/shared/amenities.service';
import { ModalService } from '../../_modal/modal.service';
import { BaseGridComponent } from '../../shared/app-grid/base-grid.component';
import { AppRoutes } from 'src/app/enum/app-routes.type';
import { ActivatedRoute } from '@angular/router';
import { GroundService } from 'src/app/shared/services/ground.service';
import { ImageFormatterComponent } from "../../shared/image-formatter.component"
import { ActionComponent } from 'src/app/shared/action-formatter.component';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../../shared/services/loader/loader.service';

@Component({
  selector: 'app-amenities-list',
  templateUrl: './amenities-list.component.html',
  styleUrls: ['./amenities-list.component.css']
})
export class amenitiesListComponent extends BaseGridComponent implements OnInit {
  amenitiesDetailForm: FormGroup;
  amenitiesList = [];
  routes = AppRoutes;
  ColumnDefs;
  RowData: any;
  AgLoad: boolean;
  context;




  constructor(private fb: FormBuilder, private amenitiesService: AmenitiesService, private modalService: ModalService,
    public route: ActivatedRoute,
    private groundservice: GroundService,
    private renderer: Renderer2,
    private _loaderService: LoaderService) {
    super(route);
  }

  error: string;
  uploadError: string;
  rootUrl: string;
  amenitiesImageUrl: string = '';
  @ViewChild('image', { static: true }) private image: ElementRef;
  @ViewChild('inputFileAmenities', { static: true }) myInputVariable: ElementRef;
  @Output() close = new EventEmitter();


  ngOnInit() {
    this.amenitiesDetailForm = this.fb.group({
      amenitiesDescription: [''],
      ImagePath: [''],
      Id: 0
    })
    this.GetAgColumns();
    //this.GetGiftVoucherList();
    var checkListAmmenities = this.amenitiesService.getAmenitiesList().subscribe((res: any) => {
      debugger;
      this.amenitiesList = res;
    });
    this.getData();
    // this.addAmenitiesListForm();
    this.context = {
      action: this.onGridReady
    }
  }

  public getData() {
    this._loaderService.showLoader();
    this.amenitiesService.getAmenitiesList().subscribe((result: any) => {
      if (result) {
        debugger;
        this.AgLoad = true;
        this.RowData = result;

        //this.totalItems = result.Data.RowCount;
      }
      this._loaderService.hideLoader();
    });
  }

  onGridReady = (params) => {
    // params.api.addEventListener('action', (e) => {
    //   console.log(e);
    // })
    const { actionId, item } = params;
    if (actionId === 'edit') {
      this.openModal('AmenitiesModal', item);
    } else if (actionId === 'delete') {

    }
  }

  // addAmenitiesListForm(){
  //   debugger;
  //    this.AmenitiesForms.push(this.fb.group({
  //     AmenitiesDescription : ['']
  //   }));
  // }

  recordSubmit() {
    debugger;

    if (this.amenitiesDetailForm.value.Id == 0) {
      this._loaderService.showLoader();
      this.amenitiesService.postAmenities(this.amenitiesDetailForm.value).subscribe(
        (res: any) => {
          this.amenitiesService.getAmenitiesList().subscribe(res => this.amenitiesList = res as [])
          this._loaderService.hideLoader();
        },err=>{
          this._loaderService.hideLoader();
        })

    }
    else {
      this._loaderService.showLoader();
      this.amenitiesService.updateAmenities(this.amenitiesDetailForm.value).subscribe(
        (res: any) => {
          this.amenitiesService.getAmenitiesList().subscribe(res => this.amenitiesList = res as [])
          this._loaderService.hideLoader();
        },err=>{
          this._loaderService.hideLoader();
        })
    }
    debugger;
    this.amenitiesDetailForm.reset();
    const imgDiv = this.image.nativeElement.querySelector('li');
    if (imgDiv !== null) {
      this.renderer.removeChild(this.image.nativeElement, imgDiv);
    }
    // const aDiv = this.image.nativeElement.querySelector('.delete-btn');
    // if (aDiv !== null) {
    //   this.renderer.removeChild(this.image.nativeElement, aDiv);
    // }


    this.modalService.close('AmenitiesModal');

  }


  openModal(targetModal, item) {
    debugger;
    this.image.nativeElement.value = null;
    this.modalService.open(targetModal);
    if (item.id) {

      this.amenitiesDetailForm.patchValue({
        amenitiesDescription: item.amenitiesDescription, Id: item.id
      });
    }
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.amenitiesDetailForm.reset();
  }


  handleFileInput(file: any) {
    debugger;
    this._loaderService.showLoader();
    this.groundservice.uploadFile(file[0]).subscribe(result => {
      if (result.message == "Document added succesfully") {
        this.rootUrl = environment.baseUrlImage//"https://localhost:5001/";
        this.amenitiesImageUrl = this.rootUrl + result.data.fileName;
        const imageUrlFolder = result.data.fileName.split('\\');
        // this.amenitiesDetailForm.patchValue({ ImagePath: imageUrlFolder[imageUrlFolder.length - 1] });
        debugger;
        this.uploadError = '';

        const li: HTMLLIElement = this.renderer.createElement('li');

        const img: HTMLImageElement = this.renderer.createElement('img');
        img.src = this.rootUrl + result.data.fileName;
        const lastSegment = img.src.split("/").pop();
        debugger;
        this.amenitiesDetailForm.value;
        this.amenitiesDetailForm.patchValue({ ImagePath: lastSegment });
        debugger;
        this.renderer.addClass(img, 'product-image');
        const a: HTMLAnchorElement = this.renderer.createElement('a');
        a.innerText = 'Delete';
        this.renderer.addClass(a, 'delete-btn');
        a.addEventListener('click', this.deleteGroundImage.bind(this, result.data.fileName, a));

        this.renderer.appendChild(this.image.nativeElement, li);
        this.renderer.appendChild(li, img);
        this.renderer.appendChild(li, a);
        debugger;
        this.myInputVariable.nativeElement.value = null;
        this.image.nativeElement.value = null;


      } else {
        this.uploadError = result.response.message;
      }
      this._loaderService.hideLoader();
    });
    err => this.error = err
  }

  deleteGroundImage(filename, a) {
    const formData = new FormData();
    formData.append('filename', filename);
    this._loaderService.showLoader();
    this.groundservice.deleteImage(formData).subscribe(
      res => {
        a.parentElement.remove();
        this._loaderService.hideLoader();
      },
      err => {
        this._loaderService.hideLoader();
        this.error = err;
      }
    );
  }



  // dummy grid code
  GetAgColumns() {
    this.ColumnDefs = [
      { headerName: 'ID', field: 'id', sortable: true, filter: true },
      { headerName: 'Amenities Description', field: 'amenitiesDescription', sortable: true, filter: true },
      { headerName: 'Image', field: 'imagePath', sortable: true, filter: true, cellRendererFramework: ImageFormatterComponent },
      { headerName: 'Action', field: 'Action', sortable: true, filter: true, cellRendererFramework: ActionComponent }
    ];
  }
  
  //dummy grid ends




}
