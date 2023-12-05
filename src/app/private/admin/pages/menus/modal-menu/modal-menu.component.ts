import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-modal-menu',
  templateUrl: './modal-menu.component.html',
  styleUrls: ['./modal-menu.component.scss']
})
export class ModalMenuComponent implements OnInit {
  @Input() isEditing = false;
  @Input() title!: string;
  @Input() menu!: Menu;
  @Input() levelMenu!: number;
  @Input() idParentMenu!: number;

  menuForm: FormGroup;
  isSuccessCreate: boolean = false;
  isSuccessEdit: boolean = false;
  alertType: any;
  messageAlert!: string;

  constructor(
    public modalRef: MdbModalRef<ModalMenuComponent>,
    private fb: FormBuilder,
    private menuService: MenuService,
  ) {
    this.menuForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.isEditing) {
      this.setForm();
    }
  }

  buildForm() {
    this.menuForm = this.fb.group({
      label: ['', Validators.required],
      order: ['', Validators.required],
      url: [''],
      description: ['', Validators.required]
    });
  }

  get labelField() {
    return this.menuForm.get('label');
  }

  get oderField() {
    return this.menuForm.get('order');
  }

  get descriptionField() {
    return this.menuForm.get('description');
  }

  setForm() {
    this.menuForm.patchValue({
      label: this.menu.label,
      order: this.menu.order,
      url: this.menu.path,
      description: this.menu.description
    });
  }

  onClose(): void {
    const state = true;
    this.modalRef.close(state);
  }

  buildMenu(): Menu {
    const menu: Menu = {
      idMenu: this.isEditing ? this.menu.idMenu : 0,
      label: this.menuForm.value.label,
      parentMenu: this.isEditing ? this.menu.parentMenu : this.idParentMenu,
      order: parseInt(this.menuForm.value.order),
      path: this.menuForm.value.url,
      description: this.menuForm.value.description
    };
    return menu;
  }

  onSave() {
    if (this.isEditing) {
      this.menuService.update(this.buildMenu(), this.menu.idMenu).subscribe((menu) => {
        this.alertType = AlertType.SUCCESS;
        this.messageAlert = 'Se ha modificado el menú exitosamente'
          this.isSuccessEdit = true;

          setTimeout(() => {
            this.isSuccessEdit = false;
            this.onClose();
          }, 3000);
      },
      (error) => {
        console.log(error);
        this.alertType = AlertType.ERROR;
        this.messageAlert = 'Error, no se pudo modificar el menú, inténtelo nuevamente'
          this.isSuccessEdit = true;

          setTimeout(() => {
            this.isSuccessEdit = false;
            this.onClose();
          }, 3000);
      });

    } else {
      this.menuService.save(this.buildMenu()).subscribe((menu) => {

        this.alertType = AlertType.SUCCESS;
        this.messageAlert = 'Se ha creado un nuevo menú exitosamente'
          this.isSuccessCreate = true;

          setTimeout(() => {
            this.isSuccessCreate = false;
            this.onClose();
          }, 3000);
      },
      (error) => {
        console.log(error);
        this.alertType = AlertType.ERROR;
        this.messageAlert = 'Error, no se pudo crear el menu, inténtelo nuevamente'
          this.isSuccessCreate = true;

          setTimeout(() => {
            this.isSuccessCreate = false;
            this.onClose();
          }, 3000);
      });
    }
  }
}
