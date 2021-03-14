import { Component, OnInit, Renderer2, ViewChild, Output, EventEmitter, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '../../_modal/modal.service';
import { BaseGridComponent } from '../../shared/app-grid/base-grid.component';
import { SystemSettingService } from "../../shared/services/SystemSetting.service";
import { LoaderService } from "../../shared/services/loader/loader.service";
import { ActionComponent } from "../../shared/action-formatter.component";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-System-Setting-list',
  templateUrl: './System-Setting.component.html',
  styleUrls: ['./System-Setting.component.css']
})
export class SystemSettingComponent extends BaseGridComponent implements OnInit {

  systemsettingDetailForm: FormGroup;
  ColumnDefs;
  AgLoad: boolean;
  SystemSettingList = [];
  context;
  public Editor = ClassicEditor;



  constructor(_route: ActivatedRoute,
    private fb: FormBuilder,
    private _systemSettingService: SystemSettingService,
    private modalService: ModalService,
    private _loaderService: LoaderService,
    public route: ActivatedRoute,

  ) {
    super(_route);
  }


  ngOnInit() {
    this.systemsettingDetailForm = this.fb.group({
      type: [''],
      description: [''],
      id: null
    })

    this.GetAgColumns();
    this.getData();
    this.context = {
      action: this.onGridReady
    }
  }

  public getData() {
    this._loaderService.showLoader();
    this._systemSettingService.getSystemSettingList().subscribe((result: any) => {
      if (result) {
        this.AgLoad = true;
        this.SystemSettingList = result as [];
        this.refreshGrid();
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
      { headerName: 'Action', field: 'Action', sortable: true, filter: true, cellRendererFramework: ActionComponent },
    ];
  }


  onGridReady = (params) => {
    const { actionId, item } = params;
    if (actionId === 'edit') {
      this.openModal('SystemSettingModal', item);
    } else if (actionId === 'delete') {

    }
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.systemsettingDetailForm.reset();
  }


  openModal(targetModal, item) {
    this.modalService.open(targetModal);
    if (item.id) {
      this.systemsettingDetailForm.patchValue({
        id: item.id,
        type: item.type,
        description: item.description
      });
    }
  }

  recordSubmit() {
    if (!(this.systemsettingDetailForm.value.id)) {
      this._loaderService.showLoader();

      // To remove id from request object
      let valueToPost = { description: this.systemsettingDetailForm.value.description, type: this.systemsettingDetailForm.value.type };
      this._systemSettingService.postSystemSetting(valueToPost).subscribe(
        (res: any) => {
          this.getData();
          this.closeModalAndHideLoader();
        }, err => {
          this.closeModalAndHideLoader;
        })

    }
    else {
      this._loaderService.showLoader();
      this._systemSettingService.updateSystemSetting(this.systemsettingDetailForm.value).subscribe(
        (res: any) => {
          this.getData();
          this.closeModalAndHideLoader
        }, err => {
          this.closeModalAndHideLoader;
        })
    }

  }
  closeModalAndHideLoader() {
    this.closeModal('SystemSettingModal');
    this._loaderService.hideLoader();
  }

  refreshGrid() {
    this.AgLoad = false;
    setTimeout(() => { this.AgLoad = true }, 100);
  }
}



