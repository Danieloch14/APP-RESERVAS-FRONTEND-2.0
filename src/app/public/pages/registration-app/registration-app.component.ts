import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { MdbValidationModule } from "mdb-angular-ui-kit/validation";

@Component({
  selector: 'app-registration-app',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MdbFormsModule,
    MdbValidationModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration-app.component.html',
  styleUrls: ['./registration-app.component.scss']
})
export class RegistrationAppComponent {
  requestForm: FormGroup;

  constructor(private builder: FormBuilder) {
    this.requestForm = new FormGroup({});
    this.buildForm();
  }

  private buildForm() {
    this.requestForm = this.builder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._-]+@netlife\.net\.ec$/)]],
    });
  }

  onSendRequest() {

  }
}
