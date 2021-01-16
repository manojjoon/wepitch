import { DecimalPipe } from "@angular/common";
import { GroundAmenities } from "./groundAmenities.model";
import { GroundImages } from "./groundImages.model";
import {GroundSlot} from "./groundSlot.model"

export class Ground {
      GroundName : string;
      GroundAddress : string;
      GroundEntityName : string;
      GSTIN: string;
      Rating : number;
      LikesCount : number;
      ViewsCount : number;
      GoogleLocation : string; 
      DistanceFromLocation : string;
      BookingAmount : number;
      groundSlotList : GroundSlot[];
      amenitiesList : GroundAmenities[];
      groundImagesList : GroundImages[];
}

