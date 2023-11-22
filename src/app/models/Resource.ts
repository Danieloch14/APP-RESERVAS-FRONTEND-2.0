import { TypeResource } from './TypeResource';
import { Location } from './Location';

export class Resource {
    idResource!: number;
    idTypeResource!: TypeResource;
    idLocation!: Location;
    parentResource!: Resource;
    codNumber!: string;
    capacity!: number;
    price!: number;
    isParking!: boolean;
    pathImages!: string;
}
