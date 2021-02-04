import { Injectable } from '@angular/core';
import { Team } from 'src/app/models/Team.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
  export class TeamService {
    formData: Team;
    store: FormGroup;

    constructor(private http: HttpClient) {
        this.store = new FormGroup({
         
          Name: new FormControl(),
          AdminMember: new FormControl(),
          LogoUrl: new FormControl(),
          
        });
      }


      getTeamList() {
        debugger;
        return this.http.get(environment.baseUrl + '/Team/GetAllTeams');
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



    
    