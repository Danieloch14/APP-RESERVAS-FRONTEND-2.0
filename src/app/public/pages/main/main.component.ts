import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MainLayoutComponent } from 'src/app/components/main-layout/main-layout.component';
import { MainFooterComponent } from 'src/app/components/main-footer/main-footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    MainFooterComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(
    private route: Router
  ) { }

  login(path: string) {
    this.route.navigateByUrl(path);
  }
}
