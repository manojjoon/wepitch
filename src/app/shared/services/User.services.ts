import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    constructor(private http : HttpClient) { }
  
    getUserList()
    {
      debugger;
      return this.http.get(environment.baseUrl + 'Account/GetAllUsers')
    }
}