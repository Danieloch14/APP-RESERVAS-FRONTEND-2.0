import { TypeResource } from './TypeResource';
import { Location } from './Location';

export interface Resource {
  idResource: number;
  idTypeResource: TypeResource;
  idLocation: Location;
  parentResource: any;
  codNumber: string;
  capacity: number;
  price: number;
  isParking: boolean;
  pathImages: string;
  name: string;
  description: string;
}
