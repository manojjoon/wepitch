import { Injectable } from '@angular/core';
import { Tournament } from '../../models/Tournament.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class TournamentService {
    formData: Tournament;
    store: FormGroup;

    constructor(private http: HttpClient) {
        this.store = new FormGroup({
         
          Id: new FormControl(),
          TournamentName: new FormControl(),
          Gstin: new FormControl(),
          EntityName: new FormControl(),
          OrganizerName: new FormControl(),
          ContactNumber1: new FormControl(),
          ContactNumber2: new FormControl(),
          ContactNumber3: new FormControl(),
          EmailId1: new FormControl(),
          EmailId2: new FormControl(),
          EmailId3: new FormControl(),
          StartDateOfTournament: new FormControl(),
          LastDateOfRegistration: new FormControl(),
          FullMatchPricing: new FormControl(),
          PerMatchPricing: new FormControl(),
          TournamentDescription: new FormControl(),
          FormatDescription: new FormControl(),
          
        });
      }

      getTournamentList() {
        debugger;
        return this.http.get(environment.baseUrl + 'Tournament/GetAllTournaments');
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
