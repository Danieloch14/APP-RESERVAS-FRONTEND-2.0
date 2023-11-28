import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdbValidationModule } from "mdb-angular-ui-kit/validation";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material/icon";
import { MdbCheckboxModule } from "mdb-angular-ui-kit/checkbox";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../../auth/services/auth.service";


@NgModule({
  declarations: [
    BookingsComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MdbFormsModule,
    FormsModule,
    MdbValidationModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MdbCheckboxModule,
    HttpClientModule
  ],
})
export class UserModule { }
