import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { NgIf, NgOptimizedImage, UpperCasePipe } from "@angular/common";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    NgIf,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    NgOptimizedImage,
    UpperCasePipe,
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {


}
