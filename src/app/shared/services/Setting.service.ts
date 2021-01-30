import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Settings } from '../../models/Setting.Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SettingService {
    constructor(private http : HttpClient) { }

    getSettings()
  {
    debugger;
    return this.http.get(environment.baseUrl + 'Settings/GetSettings')
  }

  updateSettings(SettingForm)
  {debugger;
   return this.http.put(environment.baseUrl + 'Settings/UpdateSettings',SettingForm)
  }
}