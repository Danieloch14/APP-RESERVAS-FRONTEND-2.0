import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { Router } from "@angular/router";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from "../../../auth/services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbValidationModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  newUserForm: FormGroup;

  newUser: boolean = false;
  recover: boolean = false;
  successRequest: boolean = false;
  successRecover: boolean = false;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.userForm = new FormGroup({});
    this.newUserForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.newUserForm = this.builder.group({
      mailNewUser: ['', [Validators.email, Validators.pattern(/^[a-zA-Z0-9._-]+@netlife\.net\.ec$/)]],
      recoverMail: ['', [Validators.email, Validators.pattern(/^[a-zA-Z0-9._-]+@netlife\.net\.ec$/)]]
    });
    // this.getRegionData();
  }

  private buildForm() {
    this.userForm = this.builder.group({

      userType: [''],
      mail: ['', [Validators.required]],
      password: ['', [Validators.required]],
      region: [''],
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

  get regionField() {
    return this.userForm.get('region');
  }

  get mailNewUserField() {
    return this.newUserForm.get('mailNewUser');
  }

  get recoverMailField() {
    return this.newUserForm.get('recoverMail');
  }

  // getRegionData(){
  //   this.regionService.getAllRegion().subscribe(
  //     (regions) => {
  //       console.log(regions);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   )
  // }

  onLogin() {
    if (this.userForm.invalid) return

    this.authService.performLogin(this.mailField?.value, this.passwordField?.value).subscribe({
      next: () => {
        this.router.navigate(['user/home']).then();
      },
      error: (loginError) => {
        console.error('Error during login:', loginError);
      }
    });


  }

  /**Request access dialog */
  requestAccess() {
    this.newUser = true;
  }

  closeRequestAccess() {
    this.newUser = false;
  }

  sendRequestAccess() {
    this.closeRequestAccess();
    this.successRequest = true;

    setTimeout(() => {
      this.successRequest = false;
    }, 3000);
  }

  /**Recover password */
  recoverPassword() {
    this.recover = true;
  }

  closeRecoverPassword() {
    this.recover = false;
  }

  sendRecoverPassword() {
    this.closeRecoverPassword();
    this.successRecover = true;

    setTimeout(() => {
      this.successRecover = false;
    }, 3000);
  }
}
