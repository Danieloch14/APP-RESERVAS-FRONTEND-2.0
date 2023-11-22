import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
// import { ResoursesService } from 'src/app/private/user/services/resourses.service';
import { ModalResourceComponent } from './modal-resource/modal-resource.component';
import { Resource } from 'src/app/models/Resource';
import { ModalImageResourceComponent } from './modal-image-resource/modal-image-resource.component';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit, AfterViewInit {

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
  
  constructor(
    // private resourceService: ResoursesService,
    private modalService: MdbModalService
  ) {
    this.listResources = [
      {
        idResource: 1,
        idTypeResource: {
          idTypeResource: 1,
          name: 'Casa'
        },
        idLocation: {
          idLocation: 1,
          idRegion: {
            idRegion: 1,
            name: 'Metropolitana'
          },
          place: 'Santiago',
          floor: 1,
          address: 'Av. Siempre viva 123'
        },
        parentResource: null!,
        codNumber: '123',
        capacity: 1,
        price: 1,
        isParking: false,
        pathImages: 'assets/img/carousel_4.jpg'
      }

    ]
  }

  ngOnInit(): void {
    // this.resourceService.login("1703794626", "alejita123").subscribe(
    //   (res) => {
    //     console.log(res);
    //     // const token = this.resourceService.extractTokenFromResponse(res);
    //     this.getAllResources("token");
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // )
    this.dataSource = new MatTableDataSource(this.listResources);
  }

  // getAllResources(token: string | null) {
  //   this.resourceService.getAllResources(token).subscribe(
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   )
  // }

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

  createResource() {
    const modalRef: MdbModalRef<ModalResourceComponent> = this.modalService.open(ModalResourceComponent, {
      data: {  title: 'Nuevo Recurso' },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      
    });

    modalRef.onClose.subscribe((message: any) => {
      console.log(message);
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

    modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }
}