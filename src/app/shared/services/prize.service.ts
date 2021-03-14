import { Injectable } from '@angular/core';
import{Prize} from '../../models/prizes.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
  export class PrizeService {
    formData: Prize;
    store: FormGroup;

    constructor(private http: HttpClient) {
        this.store = new FormGroup({
         
            Id: new FormControl(),
          PrizeDescription: new FormControl(),
          PrizeType: new FormControl(),
          ImagePath: new FormControl(),
          
        });
      }


      getPrizeList() {
        debugger;
        return this.http.get(environment.baseUrl + 'Prize/GetAllPrizes');
      }


      postPrizes(PrizeDetailForm)
  {debugger;
   return this.http.post(environment.baseUrl + 'Prize/AddPrizes',PrizeDetailForm);
  }

  updatePrizes(PrizeDetailForm)
  {debugger;
   return this.http.put(environment.baseUrl + 'Prize/Editprizes',PrizeDetailForm)
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



    
    

