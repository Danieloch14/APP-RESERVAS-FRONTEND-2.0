import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TypeResource } from 'src/app/models/TypeResource';
import { ModalTypeResourceComponent } from './modal-type-resource/modal-type-resource.component';

@Component({
  selector: 'app-type-resources',
  templateUrl: './type-resources.component.html',
  styleUrls: ['./type-resources.component.scss']
})
export class TypeResourcesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'typeResource',
    'actions'
  ];

  dataSource!: MatTableDataSource<TypeResource>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listTypeResources!: TypeResource[];
  
  constructor(
    private modalService: MdbModalService
  ) {
    this.listTypeResources = [
      {
        idTypeResource: 1,
        name: 'Casa'
      },
      {
        idTypeResource: 1,
        name: 'Casa'
      },
      {
        idTypeResource: 1,
        name: 'Casa'
      },
      {
        idTypeResource: 1,
        name: 'Casa'
      },
      {
        idTypeResource: 1,
        name: 'Casa'
      }
    ]
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.listTypeResources);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createTypeResource() {
    const modalRef: MdbModalRef<ModalTypeResourceComponent> = this.modalService.open(ModalTypeResourceComponent, {
      data: {  title: 'Nuevo Tipo de Recurso' },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      
    });

    modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }

  editTypeResource(row: TypeResource) {
    const modalRef: MdbModalRef<ModalTypeResourceComponent> = this.modalService.open(ModalTypeResourceComponent, {
      data: { 
        title: 'Edición de Tipo de Recurso',
        isEditing: true,
        resourceType: row 
      },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      
    });

    modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }
}
