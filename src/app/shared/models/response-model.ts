export interface ListingResponse<T> {
  result: Array<T>;
  pagingOptions: PagingOptionsModel

}

export class PagingOptionsModel {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
}

export class GroundBookingResponse {
  bookingId: number;
  createdDate: string;
  bookingPrice: number;
  groundName: string;
  bookingSlot: string;
  groundLocation: string;
  matchDate: string;
  matchStartTime: string;
}
