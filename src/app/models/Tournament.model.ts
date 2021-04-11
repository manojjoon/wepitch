import { DecimalPipe } from "@angular/common";
import { GroundAmenities } from "./groundAmenities.model";
import { GroundImages } from "./groundImages.model";
import {GroundSlot} from "./groundSlot.model";


export class Tournament {
    //Id : number;
    TournamentName : string;
    Gstin : string;
    EntityName : string;
    OrganizerName : string;
    OrganizerName2 : string;
    OrganizerName3 : string;
    ContactNumber1 : string;
    ContactNumber2 : string;
    ContactNumber3 : string;
    EmailId1 : string;
    EmailId2 : string;
    EmailId3 : string;
    StartDateOfTournament : string;
    LastDateOfRegistration : string;
    FullMatchPricing : string;
    PerMatchPricing : string;
    TournamentDescription : string;
    FormatDescription : string;
    MatchAward : string;
    SeriesAward : string;
    AmenitiesList : GroundAmenities[];
    ImageList : GroundImages[];
    SlotList : GroundSlot[];
    
   
}
