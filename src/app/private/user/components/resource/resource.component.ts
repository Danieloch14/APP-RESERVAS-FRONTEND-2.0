import { Component, Input } from '@angular/core';
import { Resource } from "../../../../models/Resource";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent {

  @Input() resource: Resource

  constructor() {
    this.resource = {} as Resource;
  }

}
