import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseGridComponent } from "src/app/shared/app-grid/base-grid.component";
import { GroundService } from "src/app/shared/services/ground.service";
import { GroundBookingResponse, ListingResponse } from 'src/app/shared/models/response-model';

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

  constructor(_route: ActivatedRoute, private _groundService: GroundService) {
    super(_route);
  }

  ngOnInit() {
    this.GetGridColumns();
    this.getData();
    this.context = {
      action: this.onGridReady
    }
  }

  public getData() {
    this._groundService.getGroundBookings().subscribe((response: ListingResponse<GroundBookingResponse>) => {
      if (response) {
        this.AgLoad = true;
        this.RowData = response.result;
      }
    });
  }

  onGridReady = (params) => {
    const { actionId, item } = params;
    if (actionId === 'edit') {
    } else if (actionId === 'delete') {

    }
  }

  // Get columns defination for grid
  GetGridColumns() {
    this.ColumnDefs = [
      { headerName: 'BookingId', field: 'bookingId', sortable: true, filter: true },
      { headerName: 'PhoneNumber', field: 'phoneNumber', sortable: true, filter: true },
      { headerName: 'Match Date', field: 'matchDate', sortable: true, filter: true },
      { headerName: 'Order Date', field: 'createdDate', sortable: true, filter: true },
      { headerName: 'Booking Price', field: 'bookingPrice', sortable: true, filter: true },
      { headerName: 'Ground Name', field: 'groundName', sortable: true, filter: true },
      { headerName: 'Booking Slot', field: 'bookingSlot', sortable: true, filter: true }
      
    ];
  }
}
