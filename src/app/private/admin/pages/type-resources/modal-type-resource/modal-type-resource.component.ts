import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ResourceType } from 'src/app/models/ResourceType';
import { ResourceTypeService } from '../../../services/resource-type.service';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { AlertHandler } from 'src/app/utils/AlertHandler';

@Component({
  selector: 'app-modal-type-resource',
  templateUrl: './modal-type-resource.component.html',
  styleUrls: ['./modal-type-resource.component.scss']
})
export class ModalTypeResourceComponent implements OnInit{
  @Input() isEditing = false;
  @Input() title!: string;
  @Input() resourceType!: ResourceType;

  resourceTypeForm: FormGroup;

  constructor(
    public modalRef: MdbModalRef<ModalTypeResourceComponent>,
    private fb: FormBuilder,
    private typeResourceService: ResourceTypeService
  ) {
    this.resourceTypeForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.isEditing) {
      this.setForm();
    }
  }

  buildForm() {
    this.resourceTypeForm = this.fb.group({
      nameTypeResource: ['', [Validators.required]]
    });
  }

  get nameTypeResourceField() {
    return this.resourceTypeForm.get('nameTypeResource');
  }

  setForm() {
    this.resourceTypeForm.patchValue({
      nameTypeResource: this.resourceType.name
    });
  }

  close(): void {
    const state = true;
    this.modalRef.close(state);
  }

  buildTypeResource(): ResourceType {

    const typeResource: ResourceType = {
      idTypeResource: this.isEditing ? this.resourceType.idTypeResource : 0,
      name: this.resourceTypeForm.value.nameTypeResource
    }
    return typeResource;
  }

  save() {
    if (this.isEditing) {
      this.typeResourceService.update(this.buildTypeResource(), this.resourceType.idTypeResource)
      .subscribe((typeResource) => {
        AlertHandler.show('Se ha modificado el tipo de recurso exitosamente', AlertType.SUCCESS)
        setTimeout(() => {
          this.close();
        }, 3000);
      });

    } else {
      this.typeResourceService.create(this.buildTypeResource()).subscribe((typeResource) => {
        console.log('Creando elemento:', typeResource);
        AlertHandler.show('Se ha creado un nuevo tipo de recurso exitosamente', AlertType.SUCCESS)
        setTimeout(() => {
          this.close();
        }, 3000);
      });
    }
  }
}
