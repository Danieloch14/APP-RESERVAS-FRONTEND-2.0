import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { Menu } from 'src/app/models/Menu';

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

  menuForm: FormGroup;
  isSuccessCreate: boolean = false;
  isSuccessEdit: boolean = false;
  alertType: any;
  messageAlert!: string;

  constructor(
    public modalRef: MdbModalRef<ModalMenuComponent>,
    private fb: FormBuilder,
    // private menuService: MenuService,
  ) {
    this.menuForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.isEditing) {
      this.setForm();
    }
  }

  // ngAfterViewInit() {
  //   this.cdr.detectChanges();
  // }

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
      id_Menu: this.isEditing ? this.menu.id_Menu : 0,
      label: this.menuForm.value.label,
      parent_menu: this.isEditing ? this.menu.parent_menu : 0,
      order: parseInt(this.menuForm.value.order),
      path: this.menuForm.value.url,
      description: this.menuForm.value.description
    };
    return menu;
  }

  onSave() {
    if (this.isEditing) {
      // this.resourceService.update(this.buildResource(), this.resource.idResource).subscribe((resource) => {
      //   console.log(resource)
      this.alertType = AlertType.SUCCESS;
      this.messageAlert = 'Se ha modificado el menú exitosamente'
        this.isSuccessEdit = true;

        setTimeout(() => {
          this.isSuccessEdit = false;
          this.onClose();
        }, 3000);
      // })
      console.log('editando menu')

    } else {
      // this.resourceService.save(this.buildNewResource()).subscribe((resource) => {
      //   console.log(resource)
      this.alertType = AlertType.SUCCESS;
      this.messageAlert = 'Se ha creado un nuevo menú exitosamente'
        this.isSuccessCreate = true;

        setTimeout(() => {
          this.isSuccessCreate = false;
          this.onClose();
        }, 3000);
      // })
      console.log('creando menu')
    }
  }
}
