import { Injectable } from '@angular/core';
import { Ground } from 'src/app/models/ground.model';
import{HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
//import { ConsoleReporter } from 'jasmine';
// import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class GroundService {
 formData : Ground;
  constructor(private http : HttpClient) { }
  
  postGround(formData : Ground){
  return this.http.post(`${environment.baseUrl}Ground/AddGround`,formData);
  }

  getGroundList()
  {
    debugger;
    return this.http.get(environment.baseUrl + 'Ground/GetAllGrounds')
  }
  uploadFile(data): Observable<any> {
    debugger;
    let formData = new FormData();
    formData.append('formFile', data);
    return this.http.post(`${environment.baseUrl}Document`, formData);
}

deleteImage(formData){
return this.http.post<any>(`${environment.baseUrl}Document/Delete`,formData).pipe(
  catchError(this.handleError)
);
}


private handleError(error : HttpErrorResponse)
{
  if(error.error instanceof ErrorEvent)
  {
    console.error('An error occured:',error.error.message);
  }
  else{
    console.error(`Backend returned code ${error.status},`+`body was :${error.error}`)
  }
  return throwError('something bad happened please try again later')
}


}