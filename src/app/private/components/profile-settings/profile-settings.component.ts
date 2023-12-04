import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { User } from 'src/app/models/User';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MatMenuModule } from '@angular/material/menu';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbRippleModule } from "mdb-angular-ui-kit/ripple";

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, MatMenuModule, ReactiveFormsModule, MdbRippleModule],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  user: User | null = null;
  username: string = '';
  userEmail: string = '';
  currentRol: string = '';
  isEditProfile: boolean = false;
  isPhotoUploaded: boolean = true;
  profileForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private location: Location,
    private builder: FormBuilder,
  ) {
    this.profileForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.usersService.user$.subscribe({
      next: (user) => {
        this.user = user;
      }
    });
    const currentPath = this.location.path().split('/');

    if (currentPath[1] === 'user') {
      this.currentRol = 'Usuario';
    }
    if (currentPath[1] === 'admin') {
      this.currentRol = 'Administrador';
    }

    this.buildForm();
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
      firstName: this.user?.personalData.name,
      lastName: this.user?.personalData.lastname,
      company: this.user?.personalData.company,
      address: this.user?.personalData.address,
      mail: this.user?.personalData.email,
      cellphone: this.user?.personalData.cellphone,
    });
  }

  onEdit() {
    this.setForm();
    this.isEditProfile = true;

  }

  onSave() {
    this.isEditProfile = false;
  }

  onCancel() {
    this.isEditProfile = false;
  }

  onUploadPhoto() {

  }

  onDeletePhoto() {
  }
}
