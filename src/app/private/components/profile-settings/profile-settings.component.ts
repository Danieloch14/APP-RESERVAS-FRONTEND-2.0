import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { User } from 'src/app/models/User';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MatMenuModule } from '@angular/material/menu';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalData } from 'src/app/models/PersonalData';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, MatMenuModule, ReactiveFormsModule, MdbValidationModule],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit{
  user!: User;
  username: string = '';
  userEmail: string = '';
  currentRol: string = '';
  isEditProfile: boolean = false;
  isPhotoUploaded: boolean = true;
  profileForm: FormGroup;
  isSuccessEdit: boolean = false;

  constructor(
    private usersService: UsersService,
    private location: Location,
    private builder: FormBuilder,
  ) {
    this.user = this.usersService.getFromCache()!;
    this.username = `${this?.user.personalData.name} ${this?.user.personalData.lastname}`;
    this.userEmail = this.user?.personalData.email!;
    this.profileForm = new FormGroup({});
  }

  ngOnInit(): void {
    const currentPath = this.location.path().split('/');

    if(currentPath[1] === 'user'){
      this.currentRol = 'Usuario';
    }
    if(currentPath[1] === 'admin'){
      this.currentRol = 'Administrador';
    }

    this.buildForm();
    this.profileForm.get('mail')?.disable();
  }

  private buildForm() {
    this.profileForm = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      company: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._-]+@netlife\.net\.ec$/)]],
      cellphone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  setForm() {
    this.profileForm.patchValue({
      firstName: this.user.personalData.name,
      lastName: this.user.personalData.lastname,
      company: this.user.personalData.company,
      address: this.user.personalData.address,
      mail: this.user.personalData.email,
      cellphone: this.user.personalData.cellphone,
    });
  }

  onEdit(){
    this.setForm();
    this.isEditProfile = true;

  }

  buildPersonalData(): PersonalData{
    const PersonalData: PersonalData = {
      idPersonalData: this.user.personalData.idPersonalData,
      name: this.profileForm.get('firstName')?.value,
      lastname: this.profileForm.get('lastName')?.value,
      company: this.profileForm.get('company')?.value,
      address: this.profileForm.get('address')?.value,
      email: this.profileForm.get('mail')?.value,
      cellphone: this.profileForm.get('cellphone')?.value,
    }
    return PersonalData;
  }

  buildUser(): User{
    const User: User = {
      idUser: this.user.idUser,
      personalData: this.buildPersonalData(),
      username: this.user.username,
      dateEntry: this.user.dateEntry,
      dateLastLogin: this.user.dateLastLogin,
      active: this.user.active,
      notLocked: this.user.notLocked
    }
    return User;
  }

  onSave(){
    // this.isEditProfile = false;
    console.log(this.buildUser());
    this.usersService.update(this.buildUser()).subscribe(
      (response) => {
        console.log(response);
        this.isSuccessEdit = true;

        setTimeout(() => {
          this.isEditProfile = false;
          this.isSuccessEdit = false;
          this.ngOnInit();
        }, 2000);
        
      },
      (error) => {
        console.log(error);
      }
    );
    
  }

  onCancel(){
    this.isEditProfile = false;
  }
  
  onUploadPhoto(){

  }

  onDeletePhoto(){
  }
}
