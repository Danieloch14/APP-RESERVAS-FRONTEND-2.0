import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { Rol } from 'src/app/models/Rol';

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
      rol_name: this.rol.rol_name,
      description: this.rol.description
    });
  }

  onClose(): void {
    const state = true;
    this.modalRef.close(state);
  }

  buildRol(): Rol {
    const rol: Rol = {
      id_role: this.isEditing ? this.rol.id_role : 0,
      rol_name: this.roleForm.value.rol_name,
      description: this.roleForm.value.description
    };
    return rol;
  }

  onSave() {
    if (this.isEditing) {
      // this.resourceService.update(this.buildResource(), this.resource.idResource).subscribe((resource) => {
      //   console.log(resource)
      this.alertType= AlertType.SUCCESS;
      this.messageAlert = 'Se ha modificado el rol exitosamente'
        this.isSuccessEdit = true;

        setTimeout(() => {
          this.isSuccessEdit = false;
          this.onClose();
        }, 3000);
      // })
      console.log(this.buildRol())

    } else {
      // this.resourceService.save(this.buildNewResource()).subscribe((resource) => {
      //   console.log(resource)
      this.alertType= AlertType.SUCCESS;
      this.messageAlert = 'Se ha creado un nuevo rol exitosamente'
        this.isSuccessCreate = true;

        setTimeout(() => {
          this.isSuccessCreate = false;
          this.onClose();
        }, 3000);
      // })
      console.log(this.buildRol())
    }
  }
}
