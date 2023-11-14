import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {NotificationBellComponent} from "../notification-bell/notification-bell.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatMenuModule, MatButtonModule, NotificationBellComponent],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Output() toggleSideNav = new EventEmitter<boolean>();
  isToggled = false;

  toggleMenu() {
    this.isToggled = !this.isToggled;
    this.toggleSideNav.emit(this.isToggled);
  }

}
