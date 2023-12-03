import { Component } from '@angular/core';
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { Resource } from "../../../../models/Resource";

@Component({
  selector: 'app-modal-reserve-resource',
  templateUrl: './modal-reserve-resource.component.html',
  styleUrls: ['./modal-reserve-resource.component.scss']
})
export class ModalReserveResourceComponent {

  resource: Resource | null

  constructor(public modalRef: MdbModalRef<ModalReserveResourceComponent>) {
    this.resource = null;
  }
}
