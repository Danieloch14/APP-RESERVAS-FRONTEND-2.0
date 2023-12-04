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
import { RegionService } from "../../../private/admin/services/region.service";
import { Region } from "../../../models/Region";

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
  regions: Region[];

  newUser: boolean = false;
  recover: boolean = false;
  successRequest: boolean = false;
  successRecover: boolean = false;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private regionService: RegionService
  ) {
    this.regions = [];
    this.userForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.loadRegionData();
    this.buildForm();
  }

  private buildForm() {
    this.userForm = this.builder.group({
      userType: [''],
      mail: ['', [Validators.required]],
      password: ['', [Validators.required]],
      region: [''],
    });
  }

  private loadRegionData() {
    this.regionService.getAll().subscribe({
      next: (regions) => {
        this.regions = regions;
      },
      error: (error) => {
        console.error('Error during region load:', error);
      }
    })

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


  onLogin() {
    if (this.userForm.invalid) return

    this.authService.performLogin(this.mailField?.value, this.passwordField?.value).subscribe({
      next: () => {
        const region: Region = this.regionField?.value;
        this.regionService.currentRegion = region;
        this.regionService.saveInLocalStorage(region);
        this.router.navigate(['user/home']).then();
      },
      error: (loginError) => {
        console.error('Error during login:', loginError);
      }
    });


  }

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
