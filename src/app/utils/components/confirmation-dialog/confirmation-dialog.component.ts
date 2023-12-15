import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MdbModalModule
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() data!: any;

  constructor(
    public modalRef: MdbModalRef<ConfirmationDialogComponent>
  ) { }

  ngOnInit(): void {
      
  }

  onNoClick(): void {
    this.modalRef.close(false); // User cancelled the operation
  }

  onYesClick(): void {
    this.modalRef.close(true); // User confirmed the operation
  }
}
