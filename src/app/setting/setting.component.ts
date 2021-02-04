import { Component, OnInit } from '@angular/core';
import { SettingService } from '../shared/services/Setting.service';
import { AppRoutes } from 'src/app/enum/app-routes.type';
import { ActivatedRoute } from '@angular/router';
import { Settings } from '../models/Setting.Model';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../shared/services/loader/loader.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  SettingForm: FormGroup;
  constructor(private settingService: SettingService,
    private toastr: ToastrService,
    private _loaderService: LoaderService) { }

  ngOnInit() {

    this.SettingForm = new FormGroup({
      gstCharges: new FormControl(0),
      convenienceCharges: new FormControl(0)
    });
    this.getData();

  }

  public getData() {
    this._loaderService.showLoader();
    this.settingService.getSettings().subscribe((result: any) => {
      debugger;
      if (result) {
        var setttingObj = result[0];
        this.SettingForm.patchValue({
          gstCharges: setttingObj.gstCharges,
          convenienceCharges: setttingObj.convenienceCharges
        });

      }
      this._loaderService.hideLoader();
    }, err => {
      this._loaderService.hideLoader();
    });
  }

  onSubmit() {
    debugger;
    this._loaderService.showLoader();
    this.settingService.updateSettings(this.SettingForm.value).subscribe(
      (res: any) => {
        this.getData();
        this._loaderService.hideLoader();
        this.toastr.success('Setting updated successfully', '')
      }, err => {
        this._loaderService.hideLoader();
      })

  }

}
