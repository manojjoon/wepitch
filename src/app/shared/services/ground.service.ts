import { Injectable } from '@angular/core';
import { Ground } from 'src/app/models/ground.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GroundBookingResponse, ListingResponse } from '../models/response-model';
import { CalendarEvent } from 'angular-calendar';
//import { ConsoleReporter } from 'jasmine';
// import { Console } from 'console';

// Constant for API Urls
const groundBookingListUrl = `GroundBooking`;

@Injectable({
  providedIn: 'root'
})
export class GroundService {
  formData: Ground;
  store: FormGroup;
  slots: any;
  calenderEvents: CalendarEvent[] = [];


  constructor(private http: HttpClient) {
    this.store = new FormGroup({
      // Id: new FormControl(Math.ceil(Math.random()*10000)),
      groundName: new FormControl(),
      groundAddress: new FormControl(),
      googleLocation: new FormControl(),
      distanceFromLocation: new FormControl(),
      groundEntityName: new FormControl(),
      amenitiesList: new FormArray([]),
      slots: new FormArray([]),
      gstin: new FormControl(null, Validators.pattern(/\d{2}[a-zA-Z]{5}\d{4}[a-zA-Z]\dZ\d/gm)),
      viewscount: new FormControl(),
      likescount: new FormControl(),
      rating: new FormControl(),
      IsFloodLights: new FormControl()
    });
    this.addSlot();
  }

  convertToFormArray(value){
    this.slots = [];
    value.slots.forEach((slot) => {
      this.slots.push(new FormGroup({
        groundId: new FormControl(value.groundId || value.id),
        groundSlotTimingId: new FormControl(slot.id),
        groundSlotName: new FormControl(slot.slotName),
        startDate: new FormControl(),
        endDate: new FormControl(),
        pricing: new FormControl()
      }))
    })
  }

  addSlot(){
    let max;
    if (this.store.value.IsFloodLights !== "false") {
      max = 4
    } else {
      max = 3;
    }
    if ((this.store.get('slots') as any).controls.length === max) {
      return;
    }
    (this.store.get('slots') as any).push(new FormGroup({
      slotName: new FormControl(),
      fromTime: new FormControl(),
      endTime: new FormControl()
    }));
  }

  addSlotDates(addAnother, slotData){
    /**
     * Add Anoyther will save and add another
     */
    const [startDate, endDate] = slotData.startDate.split(' - ');
    const body = {
      groundId: slotData.groundId,
      startDate,
      endDate,
      pricing: slotData.pricing,
      groundSlotTimingId: slotData.groundSlotTimingId
     }
    
    if (addAnother) {
      this.slots.push(
        new FormGroup({
          groundId: new FormControl(slotData.groundId),
          groundSlotTimingId: new FormControl(slotData.slotName),
          startDate: new FormControl(),
          endDate: new FormControl(),
          pricing: new FormControl()
        })
      )
    }

    return this.postSlotDate(body)
    .pipe(map((res) => {
      this.calenderEvents.push(this.convertToEvent(body, res))
      return res;
    }));
  }

  convertToEvent(slotData, res){
    return <CalendarEvent<{pricing: number, groundId: number}>> {
      start: new Date(slotData.startDate),
      end: new Date(slotData.endDate),
      title: slotData.groundSlotTimingId,
      meta: {
        pricing: slotData.pricing,
        groundId: slotData.pricing
      }
    }
  }

  postSlotDate(slotTiming){
    return this.http.post(`${environment.baseUrl}Ground/AddSlotPricing`, slotTiming)
  }
  

  postGround(formData: Ground) {
    return this.http.post(`${environment.baseUrl}Ground/AddGround`, formData)
    .pipe(map((r: any) => {
      this.slots = this.convertToFormArray(r)
      return r;
    }));
  }

  getGround(id: number){
    return this.http.get(environment.baseUrl + `Ground/${id}`)
      .pipe(map((res: any) => {
        return res.result
      }));
  }

  getGroundSlotTimings(id: number){
    return this.http.get(environment.baseUrl + `Ground/GetGroundTimingSlots?Id=${id}`)
      .pipe(map((res: any) => {
        return res.result
      }));
  }

  getGroundList() {
    debugger;
    return this.http.get(environment.baseUrl + 'Ground/GetAllGrounds')
  }
  uploadFile(data): Observable<any> {
    let formData = new FormData();
    formData.append('formFile', data);
    return this.http.post(`${environment.baseUrl}Document`, formData);
  }

  deleteImage(formData) {
    return this.http.post<any>(`${environment.baseUrl}Document/Delete`, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteAmenity(amenityId) {
    return this.http.delete<any>(`${environment.baseUrl}Document/Delete/${amenityId}`,).pipe(
      catchError(this.handleError)
    );
  }

  getGroundBookings() {
    return this.http.get<ListingResponse<GroundBookingResponse>>(`${environment.baseUrl}${groundBookingListUrl}`).pipe(
      catchError(this.handleError)
    );
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

  updateGroundImages(body){
    return this.http.post('/api/Ground/AddGroundImages', body);
  }

}
