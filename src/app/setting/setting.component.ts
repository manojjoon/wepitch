import { Component, OnInit } from '@angular/core';
import {SettingService} from '../shared/services/Setting.service';
import { AppRoutes } from 'src/app/enum/app-routes.type';
import { ActivatedRoute } from '@angular/router';
import { Settings } from '../models/Setting.Model';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  SettingForm : FormGroup;
  constructor(private settingService: SettingService,  
    private toastr: ToastrService) { }

  ngOnInit() {
   
    this.SettingForm = new FormGroup({
      gstCharges : new FormControl(0),
      convenienceCharges : new FormControl(0)
    });
    this.getData();
    
  }

  public getData() {
   
    this.settingService.getSettings().subscribe((result: any) => {
      debugger;
      if (result) {
        var setttingObj=result[0];
        this.SettingForm.patchValue({
          gstCharges: setttingObj.gstCharges, 
          convenienceCharges: setttingObj.convenienceCharges
        });
            
      }
    });
  }

  onSubmit(){
    debugger;
    this.settingService.updateSettings(this.SettingForm.value).subscribe(
      (res : any)=>{ 
        this.getData();
        this.toastr.success('Setting updated successfully', '')
      })
    
  }

}
