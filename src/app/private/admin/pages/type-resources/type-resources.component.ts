import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TypeResource } from 'src/app/models/TypeResource';
import { ModalTypeResourceComponent } from './modal-type-resource/modal-type-resource.component';
import { TypeResourceService } from '../../services/type-resource.service';

@Component({
  selector: 'app-type-resources',
  templateUrl: './type-resources.component.html',
  styleUrls: ['./type-resources.component.scss'],
})
export class TypeResourcesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['typeResource', 'actions'];

  dataSource!: MatTableDataSource<TypeResource>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listTypeResources!: TypeResource[];
  successDelete: boolean = false;

  constructor(
    private modalService: MdbModalService,
    private typeResourceService: TypeResourceService
  ) {}

  ngOnInit(): void {
    this.typeResourceService.getAll().subscribe((type_resource) => {
      this.listTypeResources = type_resource;
      this.dataSource = new MatTableDataSource(this.listTypeResources);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createTypeResource() {
    const modalRef: MdbModalRef<ModalTypeResourceComponent> =
      this.modalService.open(ModalTypeResourceComponent, {
        data: { title: 'Nuevo Tipo de Recurso' },
        modalClass: 'modal-dialog-centered',
        ignoreBackdropClick: true,
      });

    modalRef.onClose.subscribe((status: true) => {
      if (status) {
        this.ngOnInit();
      }
    });
  }

  editTypeResource(row: TypeResource) {
    const modalRef: MdbModalRef<ModalTypeResourceComponent> =
      this.modalService.open(ModalTypeResourceComponent, {
        data: {
          title: 'Edición de Tipo de Recurso',
          isEditing: true,
          resourceType: row,
        },
        modalClass: 'modal-dialog-centered',
        ignoreBackdropClick: true,
      });

    modalRef.onClose.subscribe((status: boolean) => {
      if (status) {
        this.ngOnInit();
      }
    });
  }

  deleteTypeResource(row: TypeResource) {
    this.typeResourceService
      .deleteTypeResource(row.idTypeResource)
      .subscribe((response) => {
        this.successDelete = true;

        setTimeout(() => {
          this.successDelete = false;
          this.ngOnInit();
        }, 2000);
      });
  }
}