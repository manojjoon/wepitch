import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppRoutes } from 'src/app/enum/app-routes.type';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../_modal/modal.service';
import { PrizeService } from 'src/app/shared/services/prize.service';
import { BaseGridComponent } from 'src/app/shared/app-grid/base-grid.component';
import { ImageFormatterComponent } from 'src/app/shared/image-formatter.component';
import { ActionComponent } from 'src/app/shared/action-formatter.component';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';


@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.css']
})
export class PrizeComponent extends BaseGridComponent implements OnInit {
  
  PrizeDetailForm: FormGroup;
  ColumnDefs;
  RowData: any;
  AgLoad: boolean;
  prizeList = [];
  context;
  renderer: any;
 // image: any;


  constructor(_route: ActivatedRoute, private fb: FormBuilder,private _prizeService: PrizeService, private _loaderService: LoaderService,private modalService: ModalService) {
    super(_route);
  }

  error: string;
  uploadError: string;
  rootUrl: string;
  prizeImageUrl: string = '';
  @ViewChild('image', { static: true }) private image: ElementRef;
  @ViewChild('inputFileAmenities', { static: true }) myInputVariable: ElementRef;
  @Output() close = new EventEmitter();



  ngOnInit() {

    this.PrizeDetailForm = this.fb.group({
      prizeDescription: [''],
      prizeType : [''],
      ImagePath: [''],
      Id: 0
    })

    this.GetAgColumns();
    var checkListPrize = this._prizeService.getPrizeList().subscribe((res: any) => {
      debugger;
      this.prizeList = res;
    });
    this.getData();
    this.context = {
      action: this.onGridReady
    }
  }

  public getData() {
    this._loaderService.showLoader();
    this._prizeService.getPrizeList().subscribe((result: any) => {
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

  //   onGridReady = (params) => {
  //     const { actionId, item } = params;
  //     if (actionId === 'edit') {
  //     } else if (actionId === 'delete') {

  //     }
  //   }

  GetAgColumns() {
    this.ColumnDefs = [
      { headerName: 'ID', field: 'id', sortable: true, filter: true },
      { headerName: 'Prize Description', field: 'prizeDescription', sortable: true, filter: true },
      { headerName: 'Prize Type', field: 'prizeType', sortable: true, filter: true },
      { headerName: 'Image', field: 'imagePath', sortable: true, filter: true,cellRendererFramework: ImageFormatterComponent },
      { headerName: 'Action', field: 'Action', sortable: true, filter: true, cellRendererFramework: ActionComponent },


    ];
  }


  onGridReady = (params) => {
    // params.api.addEventListener('action', (e) => {
    //   console.log(e);
    // })
    const { actionId, item } = params;
    if (actionId === 'edit') {
      this.openModal('PrizeModal', item);
      debugger;
    } else if (actionId === 'delete') {

    }
  }

  recordSubmit() {
    debugger;

    if (this.PrizeDetailForm.value.Id == 0) {
      this._loaderService.showLoader();
      this._prizeService.postPrizes(this.PrizeDetailForm.value).subscribe(
        (res: any) => {
          this._prizeService.getPrizeList().subscribe(res => this.prizeList = res as [])
          this._loaderService.hideLoader();
        },err=>{
          this._loaderService.hideLoader();
        })

    }
    else {
      this._loaderService.showLoader();
      this._prizeService.
      updatePrizes(this.PrizeDetailForm.value).subscribe(
        (res: any) => {
          this._prizeService.getPrizeList().subscribe(res => this.prizeList = res as [])
          this._loaderService.hideLoader();
        },err=>{
          this._loaderService.hideLoader();
        })
    }
    debugger;
    this.PrizeDetailForm.reset();
    debugger;
    const imgDiv = this.image.nativeElement.querySelector('li');
    if (imgDiv !== null) {
      this.renderer.removeChild(this.image.nativeElement, imgDiv);
    }
    // const aDiv = this.image.nativeElement.querySelector('.delete-btn');
    // if (aDiv !== null) {
    //   this.renderer.removeChild(this.image.nativeElement, aDiv);
    // }


    this.modalService.close('PrizeModal');

  }




  openModal(targetModal, item) {
    debugger;
    this.image.nativeElement.value = null;
    this.modalService.open(targetModal);
    if (item.id) {

      this.PrizeDetailForm.patchValue({
        prizeDescription: item.prizeDescription, Id: item.id,
        prizeType : item.prizeType
      });
    }
  }


  closeModal(id: string) {
    this.modalService.close(id);
    this.PrizeDetailForm.reset();
  }


}
