import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from 'src/app/models/Rol';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/private/services/users.service';
import { RolService } from '../../services/rol.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRolService } from '../../services/user-rol.service';
import { RolUser } from 'src/app/models/RolUser';

@Component({
  selector: 'app-user-by-role',
  templateUrl: './user-by-role.component.html',
  styleUrls: ['./user-by-role.component.scss']
})
export class UserByRoleComponent {

  
  displayedColumns: string[] = [
    'name',
    'lastname',
    'email',
    'rol',
    'actions'
  ];

  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listUsers!: User[];
  listRoles!: Rol[]; 
  userRolForms: { [key: number]: FormGroup } = {};
  isButtonActive: boolean = false;
  buttonActivationState: { [key: number]: boolean } = {};

  constructor(
    private userService: UsersService,
    private rolService: RolService,
    private fb: FormBuilder,
    private rolUserService: UserRolService
  ) {}

  ngOnInit(): void {
    // this.buildForm();
    this.listRol();
    this.listUser();
  }
  
  listUser(){
    this.userService.getAll().subscribe(users => {
      this.listUsers = users;
      this.dataSource = new MatTableDataSource(this.listUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.listUserRol(users);
    });
  }

  listRol(){
    this.rolService.getAll().subscribe(rols => {
      this.listRoles = rols;
    });
  }

  listUserRol(users: User[]) {
    users.forEach(user => {
      // Obtén el formulario específico para el usuario actual
      const userForm = this.getUserRolForm(user);
      this.rolUserService.listByIdUser(user.idUser).subscribe(userRol => {
        // Actualiza el valor del rol en el formulario específico
        userForm.get('idRol')?.setValue(userRol[0] ? userRol[0].rolUserId.idRol : null);
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filteredUsers = this.listUsers.filter(user => {
      const personalData = user.personalData;
      return (
        personalData.name.toLowerCase().includes(filterValue) ||
        personalData.lastname.toLowerCase().includes(filterValue) ||
        personalData.email.toLowerCase().includes(filterValue)
      );
    });
    this.dataSource = new MatTableDataSource(filteredUsers);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUserRolForm(user: User): FormGroup {
    if (!this.userRolForms[user.idUser]) {
      this.userRolForms[user.idUser] = this.fb.group({
        idUser: [user.idUser],
        idRol: [''],
      });
    }
  
    return this.userRolForms[user.idUser];
  }

  // buildForm(){
  //   this.userRolForm = this.fb.group({
  //     idRol: ['', Validators.required],
  //     idUser: ['', Validators.required]
  //   });
  // }

  onChange(user: User) {
    const form = this.getUserRolForm(user);
    this.buttonActivationState[user.idUser] = true;
  }

  onSave(user: User) {
    const form = this.getUserRolForm(user);
    const rolUser: RolUser = {
      rolUserId: {
        idRol: form.get('idRol')?.value,
        idUser: form.get('idUser')?.value
      }
    }
    this.rolUserService.update(rolUser).subscribe(() => {
      this.buttonActivationState[user.idUser] = false;
      console.log(form.value);
      this.listUserRol(this.listUsers);
    });

  }
  
}
