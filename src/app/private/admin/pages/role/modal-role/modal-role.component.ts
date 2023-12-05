import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { Rol } from 'src/app/models/Rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-modal-role',
  templateUrl: './modal-role.component.html',
  styleUrls: ['./modal-role.component.scss']
})
export class ModalRoleComponent implements OnInit {
  @Input() isEditing = false;
  @Input() title!: string;
  @Input() rol!: Rol;

  roleForm: FormGroup;
  isSuccessCreate: boolean = false;
  isSuccessEdit: boolean = false;
  alertType: any;
  messageAlert!: string;

  constructor(
    public modalRef: MdbModalRef<ModalRoleComponent>,
    private fb: FormBuilder,
    private rolService: RolService
  ) {
    this.roleForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.isEditing) {
      this.setForm();
    }
  }

  buildForm() {
    this.roleForm = this.fb.group({
      rol_name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get rolNameField() {
    return this.roleForm.get('rol_name');
  }
  
  get descriptionField() {
    return this.roleForm.get('description');
  }

  setForm() {
    this.roleForm.patchValue({
      rol_name: this.rol.nombre,
      description: this.rol.description
    });
  }

  onClose(): void {
    const state = true;
    this.modalRef.close(state);
  }

  buildRol(): Rol {
    const rol: Rol = {
      idRol: this.isEditing ? this.rol.idRol : 0,
      nombre: this.roleForm.value.rol_name,
      description: this.roleForm.value.description
    };
    return rol;
  }

  onSave() {
    if (this.isEditing) {
      this.rolService.update(this.buildRol()).subscribe((rol) => {
        this.alertType= AlertType.SUCCESS;
        this.messageAlert = 'Se ha modificado el rol exitosamente'
          this.isSuccessEdit = true;

          setTimeout(() => {
            this.isSuccessEdit = false;
            this.onClose();
          }, 3000);
      },
      (error) => {
        console.log(error);
        this.alertType= AlertType.ERROR;
        this.messageAlert = 'No se pudo modificar el rol, inténtelo nuevamente'
          this.isSuccessEdit = true;

          setTimeout(() => {
            this.isSuccessEdit = false;
            this.onClose();
          }, 3000);
      });

    } else {
      this.rolService.save(this.buildRol()).subscribe((rol) => {
        this.alertType= AlertType.SUCCESS;
        this.messageAlert = 'Se ha creado un nuevo rol exitosamente'
          this.isSuccessCreate = true;

          setTimeout(() => {
            this.isSuccessCreate = false;
            this.onClose();
          }, 3000);
      },
      (error) => {
        console.log(error);
        this.alertType= AlertType.ERROR;
        this.messageAlert = 'No se pudo crear el rol, inténtelo nuevamente'
          this.isSuccessCreate = true;

          setTimeout(() => {
            this.isSuccessCreate = false;
            this.onClose();
          }, 3000);
      });
    }
  }
}
