import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    constructor(private http : HttpClient) { }

    getPlayerList()
    {
      debugger;
      return this.http.get(environment.baseUrl + 'Account/GetPlayer')
    }

    getOrganiserList()
    {
      debugger;
      return this.http.get(environment.baseUrl + 'Account/GetOrganiser')
    }

    getUserList()
    {
      debugger;
      return this.http.get(environment.baseUrl + 'Account/GetAllUsers')
    }
}
