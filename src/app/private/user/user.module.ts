import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { CalendarComponent } from './pages/calendar/calendar.component';


@NgModule({
  declarations: [
    BookingsComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
