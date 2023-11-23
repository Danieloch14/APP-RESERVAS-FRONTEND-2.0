import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ResourcesComponent } from './pages/resources/resources.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import { ModalResourceComponent } from './pages/resources/modal-resource/modal-resource.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ModalImageResourceComponent } from './pages/resources/modal-image-resource/modal-image-resource.component';
import { TypeResourcesComponent } from './pages/type-resources/type-resources.component';
import { ModalTypeResourceComponent } from './pages/type-resources/modal-type-resource/modal-type-resource.component';
@NgModule({
  declarations: [
    ResourcesComponent,
    ModalResourceComponent,
    ModalImageResourceComponent,
    TypeResourcesComponent,
    ModalTypeResourceComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MdbValidationModule
  ]
})
export class AdminModule { }
