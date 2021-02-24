import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppRoutes } from 'src/app/enum/app-routes.type';
import { ActivatedRoute } from '@angular/router';
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

  ColumnDefs;
  RowData: any;
  AgLoad: boolean;
  prizeList = [];
  context;


  constructor(_route: ActivatedRoute, private _prizeService: PrizeService, private _loaderService: LoaderService) {
    super(_route);
  }

  ngOnInit() {

    this.GetAgColumns();
    var checkListPrize = this._prizeService.getPrizeList().subscribe((res: any) => {
      debugger;
      this.prizeList = res;
    });
    this.getData();
    // this.context = {
    //   action: this.onGridReady
    // }
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
      { headerName: 'Image', field: 'imagePath', sortable: true, filter: true,cellRendererFramework: ImageFormatterComponent }


    ];
  }
}
