import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbValidationModule,
    
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  userForm: FormGroup;
  
  constructor(
    public modalRef: MdbModalRef<LoginComponent>,
    private builder: FormBuilder,
  ) {
    this.userForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.userForm = this.builder.group({

      userType: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._-]+@netlife\.net\.ec$/)]],
      password: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

  get userTypeField() {
    return this.userForm.get('userType');
  }

   get mailField() {
    return this.userForm.get('mail');
  }
  

  get passwordField() {
    return this.userForm.get('password');
  }

  get locationField() {
    return this.userForm.get('location');
  }

  login() {

  }
}
