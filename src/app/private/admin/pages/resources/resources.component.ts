import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalResourceComponent } from './modal-resource/modal-resource.component';
import { Resource } from 'src/app/models/Resource';
import { ModalImageResourceComponent } from './modal-image-resource/modal-image-resource.component';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  displayedColumns: string[] = [
    'typeResource',
    'region',
    'place',
    'address',
    'floor',
    'codeNumber',
    'capacity',
    'price',
    'image',
    'actions'
  ];

  dataSource!: MatTableDataSource<Resource>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listResources!: Resource[];
  successDelete: boolean = false;

  constructor(
    private resourceService: ResourceService,
    private modalService: MdbModalService
  ) {  }

  ngOnInit(): void {
    this.resourceService.getAll().subscribe((resources) => {
      console.log(resources)
      this.listResources = resources
      this.dataSource = new MatTableDataSource(this.listResources);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    (error) =>{
      console.log(error);
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createResource() {
    const modalRef: MdbModalRef<ModalResourceComponent> = this.modalService.open(ModalResourceComponent, {
      data: {  title: 'Nuevo Recurso' },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,

    });

    modalRef.onClose.subscribe((state: boolean) => {
      if(state){
        this.ngOnInit();
      }
    });
  }

  seeImage(path: string | null, title: string | null){
    const modalRef: MdbModalRef<ModalImageResourceComponent> = this.modalService.open(ModalImageResourceComponent, {
      data: {
          imageUrl: path,
          imageTitle: title
        },
      modalClass: 'modal-dialog-centered',
      });
  }

  editResource(row: Resource) {
    const modalRef: MdbModalRef<ModalResourceComponent> = this.modalService.open(ModalResourceComponent, {
      data: {
        title: 'Edición Recurso',
        isEditing: true,
        resource: row
      },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,

    });

    modalRef.onClose.subscribe((state: boolean) => {
      if(state){
        this.ngOnInit();
      }
    });
  }

  deleteResource(row: Resource){
    this.resourceService.delete(row.idResource).subscribe((response) => {
      console.log(response);
      this.successDelete = true;

      setTimeout(() => {
        this.successDelete = false;
        this.ngOnInit();
      }, 2000);
    },
    (error) =>{
      console.log(error);
    })
  }
}
