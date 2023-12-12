import { LocationCreate } from "./LocationCreate";

export interface ResourceCreate {
    idResource: number;
    idLocation: LocationCreate;
    idTypeResource: number;
    idDadResource: number;
    capacity: number;
    codNumber: string;
    content: string;
    price: number;
    isParking: boolean;
    pathImages: string;
    name: string;
    // description: string;
}