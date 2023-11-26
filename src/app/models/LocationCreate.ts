import { Region } from "./Region";

export class LocationCreate{
    idLocation!: number;
    idRegion!: Region;
    place!: string;
    floor!: number;
    address!: string;
}