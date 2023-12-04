import { Region } from "./Region";

export interface LocationCreate{
    idLocation: number;
    idRegion: number;
    place: string;
    floor: number;
    address: string;
}