import { DecimalPipe } from "@angular/common";
import { GroundAmenities } from "./groundAmenities.model";
import { GroundImages } from "./groundImages.model";
import {GroundSlot} from "./groundSlot.model"

export class Ground {
      GroundName : string;
      GroundAddress : string;
      Discount : number;
      GroundEntityName : string;
      GSTIN: string;
      Rating : number;
      ContactNo : string;
      GroundOwner :string;
      GroundOwner2 :string;
      ownerEmailId :string;
      owner2EmailId :string;
      LikesCount : number;
      ViewsCount : number;
      GoogleLocation : string; 
      IsFloodLights: boolean;
      DistanceFromLocation : string;
      groundSlotList : GroundSlot[];
      amenitiesList : GroundAmenities[];
      groundImagesList : GroundImages[];
}

