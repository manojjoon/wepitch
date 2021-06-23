import { Injectable } from '@angular/core';
import { Tournament } from '../../models/Tournament.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { FormControl, FormArray,FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class TournamentService {
    formData: Tournament;
    TournamentValues: FormGroup;
    store: FormGroup;
  slots: any;
    

    constructor(private http: HttpClient) {
        this.TournamentValues = new FormGroup({
         
          Id: new FormControl(),
          TournamentName: new FormControl(),
          Gstin: new FormControl(),
          EntityName: new FormControl(),
          OrganizerName: new FormControl(),
          OrganizerName2: new FormControl(),
          OrganizerName3: new FormControl(),
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
          MatchAward: new FormControl(),
          SeriesAward: new FormControl(),
          Location: new FormControl(),
          GoogleLocation: new FormControl(),
          DistnaceFromLocation: new FormControl(), 
          AmenitiesList: new FormControl(),
          ImageList : new FormControl(),
          SlotList : new FormControl()
          
        });
      }

      getGroundNameList(){

        return this.http.get(environment.baseUrl + 'Ground/GetAllGroundName')
      }



      postTournament(formData: Tournament) {
    debugger;
        return (formData['id']
        ? this.http.put(`${environment.baseUrl}Tournament/EditTournament`, formData)
        : this.http.post(`${environment.baseUrl}Tournament/AddTournament`, formData))
    
        // .pipe(map((r: any) => {
        //   this.slots = this.convertToFormArray(r)
        //   return r;
        // }));
      }

      getTournament(id: number){
        return this.http.get(environment.baseUrl + `Tournament/${id}`)
          .pipe(map((res: any) => {
            return res.result
          }));
      }


      getAllGroundImages(groundId){
        return this.http.get(`${environment.baseUrl}Ground/GetAllGroundImages?GroundId=${groundId}`)
      }

      getTournamentRules(tournamentId){
        return this.http.get(`${environment.baseUrl}Tournament/GetTournamentRules?TournamentId=${tournamentId}`)
      }


      getTournamentList() {
        debugger;
        return this.http.get(environment.baseUrl + 'Tournament/GetAllTournaments');
      }
      saveRules(body){
        return this.http.post(`${environment.baseUrl}Tournament/AddTournamentRules`, body);
      }

      private handleError(error: HttpErrorResponse) {
        debugger;
        if (error.error instanceof ErrorEvent) {
          debugger;
          console.error('An error occured:', error.error.message);
        }
        else {
          console.error(`Backend returned code ${error.status},` + `body was :${error.error}`)
        }
        return throwError('something bad happened please try again later')
      }
  
    }
