import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./alert.component.scss',]
})
export class AlertComponent {
  @Input() typeAlert!: string;
  @Input() messageAlert!: string;
}
