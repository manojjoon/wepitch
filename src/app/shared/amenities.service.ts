import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { GroundAmenities } from '../models/groundAmenities.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {
 
  constructor(private http : HttpClient) { }
  
  getAmenitiesList()
  {
    debugger;
    return this.http.get(environment.baseUrl + 'Amenities/GetAllAmenities')
  }

  postAmenities(amenrtiesFormValues)
  {debugger;
   return this.http.post(environment.baseUrl + 'Amenities/AddAmenities',amenrtiesFormValues)
  }

  updateAmenities(amenrtiesFormValues)
  {debugger;
   return this.http.put(environment.baseUrl + 'Amenities/EditAmenities',amenrtiesFormValues)
  }

  
}
