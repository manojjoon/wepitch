import { Component, OnInit,Renderer2, ViewChild, Output, EventEmitter, ElementRef  } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '../../_modal/modal.service';
import { BaseGridComponent } from '../../shared/app-grid/base-grid.component';
import { SystemSettingService } from "../../shared/services/SystemSetting.service";
import { LoaderService } from "../../shared/services/loader/loader.service";
import {ActionComponent} from "../../shared/action-formatter.component";
import { AppRoutes } from 'src/app/enum/app-routes.type';
import { GroundService } from 'src/app/shared/services/ground.service';
import { ImageFormatterComponent } from "../../shared/image-formatter.component"
import { environment } from 'src/environments/environment';



@Component({
    selector: 'app-System-Setting-list',
    templateUrl: './System-Setting.component.html',
    styleUrls: ['./System-Setting.component.css']
  })

  export class SystemSettingComponent extends BaseGridComponent implements OnInit {
 
    systemsettingDetailForm: FormGroup;
    ColumnDefs;
    RowData: any;
    AgLoad: boolean;
    SystemSettingList = [];
    context;
    
    

    constructor(_route: ActivatedRoute,
      private fb: FormBuilder, 
      private _systemSettingService: SystemSettingService,
      private renderer: Renderer2,
       private modalService: ModalService,
       private _loaderService: LoaderService,
       public route: ActivatedRoute,
       private groundservice: GroundService

       ) {
        super(_route);
      }
    

      ngOnInit() {


        this.systemsettingDetailForm = this.fb.group({
          type: [''],
          Description: [''],
          Id: 0
        })

        this.GetAgColumns();
        var checkListTeam = this._systemSettingService.getSystemSettingList().subscribe((res: any) => {
          debugger;
          this.SystemSettingList = res;
        });
        this.getData();
        // this.context = {
        //   action: this.onGridReady
        // }
      }
  
      public getData() {
        this._loaderService.showLoader();
        this._systemSettingService.getSystemSettingList().subscribe((result: any) => {
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
          { headerName: 'Type', field: 'type', sortable: true, filter: true },
          { headerName: 'Description', field: 'description', sortable: true, filter: true },
          { headerName: 'Action', field: 'Action', sortable: true, filter: true, cellRendererFramework: ActionComponent },
    
    
        ];
      }
    }

    // onGridReady = (params) => {
    //   // params.api.addEventListener('action', (e) => {
    //   //   console.log(e);
    //   // })
    //   const { actionId, item } = params;
    //   if (actionId === 'edit') {
    //     this.openModal('SystemSettingModal', item);
    //   } else if (actionId === 'delete') {
  
    //   }
    // }

    // closeModal(id: string) {
    //   this.modalService.close(id);
    //   this.amenitiesDetailForm.reset();
    // }


    // openModal(targetModal, item) {
    //   debugger;
      
    //   this.modalService.open(targetModal);
    //   if (item.id) {
  
    //     this.systemsettingDetailForm.patchValue({
    //       Type: item.Type, Id: item.id
    //     });
    //   }
    // }


    
    