import { Location } from "./Location";

export class ResourceCreate {
    idResource!: number;
    idLocation!: Location;
    idTypeResource!: number;
    idDadResource!: number;
    capacity!: number;
    codNumber!: string;
    content!: string;
    price!: number;
    isParking!: boolean;
    pathImages!: string;
}