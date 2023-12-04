import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { Router } from '@angular/router';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { AlertComponent } from 'src/app/private/components/alert/alert.component';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbValidationModule,
    AlertComponent
  ],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit{

  userForm: FormGroup;
  checkTerms!: boolean;
  showVideoDialog: boolean = false;
  videoEnded: boolean = false;
  enableRegister: boolean = false;
  success: boolean = false;
  alertType: any;
  messageAlert!: string;

  constructor(
    private builder: FormBuilder,
    private route: Router
  ){
    this.userForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.userForm = this.builder.group({

      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      enterprise: ['Netlife', [Validators.required]],
      cellphone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      mail: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._-]+@netlife\.net\.ec$/)]],
      role: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  get nameField() {
    return this.userForm.get('name');
  }

  get lastnameField(){
    return this.userForm.get('lastname');
  }

  get enterpriseField() {
    return this.userForm.get('enterprise');
  }

  get cellphoneField() {
    return this.userForm.get('cellphone');
  }

  get mailField() {
    return this.userForm.get('mail');
  }

  get roleField() {
    return this.userForm.get('role');
  }

  get addressField() {
    return this.userForm.get('address');
  }

  openVideoDialog() {
    this.showVideoDialog = true;
  }

  closeVideoDialog() {
    this.showVideoDialog = false;
  }

  endedVideo() {
    console.log('El video ha terminado');
    this.closeVideoDialog();
    this.videoEnded = true;
  }

  onCheckTermsChange(event: any) {
    this.checkTerms = event.target.checked;
    if (this.checkTerms) {
      this.enableRegister = true;
    } else {
      this.enableRegister = false;
    }
  }

  register(path: string){
    this.alertType= AlertType.SUCCESS;
    this.messageAlert = 'Se ha registrado exitosamente en la plataforma, por favor inicie sesión';
    this.success = true;

    setTimeout(() => {
      this.success = false;
      this.route.navigate([path]);
    }, 3000);
  }
}
