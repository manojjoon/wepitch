import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseGridComponent } from "src/app/shared/app-grid/base-grid.component";
import { GroundService } from "src/app/shared/services/ground.service";
import { GroundBookingResponse, ListingResponse } from 'src/app/shared/models/response-model';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActionComponent } from "src/app/shared/action-formatter.component";
import { ModalService } from "src/app/_modal/modal.service";
import { LoaderService } from '../../../shared/services/loader/loader.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent extends BaseGridComponent implements OnInit {
  ColumnDefs;
  RowData: any;
  AgLoad: boolean;
  context;

  cancelBookingForm: FormGroup;

  constructor(private _loaderService: LoaderService,
    _route: ActivatedRoute, private _groundService: GroundService, private _fb: FormBuilder, public _modalService: ModalService) {
    super(_route);
  }

  ngOnInit() {
    this.instantiateCancelBookingForm();
    this.GetGridColumns();
    this.getData();
    this.context = {
      action: this.onGridReady
    }
  }

  // cancel booking form

  // To instantiate cancel booking form
  instantiateCancelBookingForm() {
    this.cancelBookingForm = this._fb.group({
      userId: 1,
      bookingId: 0,
      cancellationRemarks: ''
    });
  }

  // To reset cancel booking form
  resetCancelBookingForm = () => {
    this.cancelBookingForm.reset();
  }

  patchCancelBookingForm = (data) => {
    this.cancelBookingForm.patchValue({
      userId: 1, // To be changes once user id functionality implemented
      bookingId: data.bookingId
    });
  }
  // cancel booking form ends


  // Http get request and subscription to get ground booking list
  public getData() {
    this._loaderService.showLoader();
    this._groundService.getGroundBookings().subscribe((response: ListingResponse<GroundBookingResponse>) => {
      if (response) {
        this.AgLoad = true;
        this.RowData = response.result;
      }
      this._loaderService.hideLoader();
    }, err => {
      this._loaderService.hideLoader();
    });
  }

  public onSubmit() {
    this._loaderService.showLoader();
    this._groundService.postCancelGroundBooking(this.cancelBookingForm.value).subscribe(() => {
      this.resetCancelBookingForm();
      alert('Ground booking deleted successfully');
      this._loaderService.hideLoader();
      this.getData();
    }, err => {
      this._loaderService.hideLoader();
    });
  }

  // call once grid gets ready
  onGridReady = (params) => {
    const { actionId, item } = params;
    if (actionId === 'edit') {
    } else if (actionId === 'delete') {
      this.patchCancelBookingForm(item);
      this.openModal('DeleteGroundBookingModal');
    }
  }

  // Get columns defination for grids
  GetGridColumns() {
    this.ColumnDefs = [
      { headerName: 'BookingId', field: 'bookingId', sortable: true, filter: true },
      { headerName: 'PhoneNumber', field: 'phoneNumber', sortable: true, filter: true },
      { headerName: 'Match Date', field: 'matchDate', sortable: true, filter: true },
      { headerName: 'Order Date', field: 'createdDate', sortable: true, filter: true },
      { headerName: 'Booking Price', field: 'bookingPrice', sortable: true, filter: true },
      { headerName: 'Ground Name', field: 'groundName', sortable: true, filter: true },
      { headerName: 'Booking Slot', field: 'bookingSlot', sortable: true, filter: true },
      { headerName: 'Action', field: 'Action', sortable: true, filter: true, cellRendererFramework: ActionComponent }
    ];
  }

  openModal(targetModal) {
    this._modalService.open(targetModal);
  }

  closeModel() {
    this._modalService.close('DeleteGroundBookingModal');
    this.resetCancelBookingForm();
  }
}
