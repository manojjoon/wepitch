import { Injectable } from '@angular/core';
import { SystemSetting } from '..//../models/SystemSetting.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingService {
  formData: SystemSetting;
  store: FormGroup;

  constructor(private http: HttpClient) {
    this.store = new FormGroup({

      Id: new FormControl(),
      Type: new FormControl(),
      Description: new FormControl(),

    });
  }

  getSystemSettingList() {
    return this.http.get(environment.baseUrl + 'Settings/GetAllPrivacyPolicy');
  }

  postSystemSetting(systemSettingFormValues) {
    return this.http.post(environment.baseUrl + 'Settings/AddPrivayPolicy', systemSettingFormValues)
  }

  updateSystemSetting(systemSettingFormValues) {
    return this.http.put(environment.baseUrl + 'Settings/UpdatePrivacyPolicy', systemSettingFormValues)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    }
    else {
      console.error(`Backend returned code ${error.status},` + `body was :${error.error}`)
    }
    return throwError('something bad happened please try again later')
  }

}
