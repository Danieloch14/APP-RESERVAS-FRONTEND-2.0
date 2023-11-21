import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { NavComponent } from "../nav/nav.component";
import { CommonModule, UpperCasePipe } from "@angular/common";

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    NavComponent,
    UpperCasePipe,
    CommonModule,
  ],
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  items = [
    {
      name: 'Inicio',
      icon: 'fa-home',
      route: 'home'
    },
    {
      name: 'Reservas',
      icon: 'fa-book',
      route: 'bookings'
    },
    {
      name: 'Calendario',
      icon: 'fa-calendar',
      route: 'calendar'
    }
  ]


}
