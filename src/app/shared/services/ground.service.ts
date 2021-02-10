import { Injectable } from '@angular/core';
import { Ground } from 'src/app/models/ground.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { concat, forkJoin, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GroundBookingResponse, ListingResponse } from '../models/response-model';
import { CalendarEvent } from 'angular-calendar';
//import { ConsoleReporter } from 'jasmine';
// import { Console } from 'console';

// Constant for API Urls
const groundBookingListUrl = `GroundBooking`;
const cancelGroundBookingUrl = `GroundBooking/Cancel`;

@Injectable({
  providedIn: 'root'
})
export class GroundService {
  formData: Ground;
  store: FormGroup;
  slots: any;
  calenderEvents: CalendarEvent[] = [];
  calenderEvent: Subject<any> = new Subject<any>();


  constructor(private http: HttpClient) {
    this.store = new FormGroup({
      // Id: new FormControl(Math.ceil(Math.random()*10000)),
      groundName: new FormControl(),
      groundOwner: new FormControl(),
      discount:new FormControl(),
      contactNo: new FormControl()
,     groundAddress: new FormControl(),
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
        pricing: new FormControl(),
        isAdded: new FormControl(false)
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

  addSlotDates(addAnother, slots){
    const cE = [];
    slots.forEach((e) => {
      cE.push(this.addSlotDate(e.value));
    });
    return forkJoin(cE);
  }

  addSlotDate(slotData){
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


    return this.postSlotDate(body)
    .pipe(map((res) => {
      const eventToReplace = this.calenderEvents.findIndex((e) => {
        return e.meta.groundSlotTimingId === body.groundSlotTimingId
      })
      if(eventToReplace != -1){
        this.calenderEvents[eventToReplace] = this.convertToEvent(body, slotData.groundSlotName, res);
      }else{
        this.calenderEvents.push(this.convertToEvent(body, slotData.groundSlotName, res))
      }

      return res;
    }));
  }

  convertToEvent(slotData, groundSlotName, res){

    return <CalendarEvent<{pricing: number, groundSlotTimingId: number}>> {
      id: slotData.groundSlotTimingId,
      start: new Date(slotData.startDate),
      end: new Date(slotData.endDate),
      title: `${groundSlotName}: ${slotData.pricing}`,
      meta: {
        pricing: slotData.pricing,
        groundSlotTimingId: slotData.groundSlotTimingId,
        groundSlotName,
        groundId: slotData.groundId
      },
      actions: [
        {
          label: '<i class="fas fa-fw fa-pencil-alt"></i>',
          a11yLabel: 'Edit',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.handleEvent(event);
          },
        }
      ]
    }
  }

  handleEvent = (event) => {
    /**
     * Will be modifing in case of Update
     */
    const slotToEdit = this.slots.find((fg: FormGroup) => {
        return fg.get('groundSlotTimingId').value === event.meta.groundSlotTimingId;
    });
    this.calenderEvent.next(slotToEdit);

    //slotToEdit.get('isAdded').setValue(true);
  }

  postSlotDate(slotTiming){
    return this.http.post(`${environment.baseUrl}Ground/AddSlotPricing`, slotTiming)
  }


  postGround(formData: Ground) {
    debugger;
    return (formData['id']
    ? this.http.put(`${environment.baseUrl}Ground/UpdateGround`, formData)
    : this.http.post(`${environment.baseUrl}Ground/AddGround`, formData))

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
    return this.http.get<ListingResponse<GroundBookingResponse>>(environment.baseUrl + groundBookingListUrl).pipe(
      catchError(this.handleError)
    );
  }

  postCancelGroundBooking(req) {
    return this.http.post(`${environment.baseUrl}${cancelGroundBookingUrl}`, req).pipe(
      catchError(this.handleError)
    );
  }

  saveRules(body){
    return this.http.post(`${environment.baseUrl}Ground/AddGroundRules`, body);
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
    return this.http.post(`${environment.baseUrl}Ground/AddGroundImages`, body);
  }

}
