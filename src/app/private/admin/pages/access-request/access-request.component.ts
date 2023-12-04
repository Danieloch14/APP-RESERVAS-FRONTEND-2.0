import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from '../../services/request.service';
import { Request } from 'src/app/models/Request';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';

@Component({
  selector: 'app-access-request',
  templateUrl: './access-request.component.html',
  styleUrls: ['./access-request.component.scss']
})
export class AccessRequestComponent {

  
  displayedColumns: string[] = [
    'dateRequest',
    'requesterName',
    'requesterLastname',
    'requesterEmail',
    'status',
    'actions'
  ];

  dataSource!: MatTableDataSource<Request>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listRequest!: Request[];
  successAccepted: boolean = false;
  successDenied: boolean = false;

  alertType!: string;
  messageAlert!: string;

  constructor(
    private requestService: RequestService
  ) {  
    this.listRequest = [
      {
        dateRequest: new Date(20, 10, 10),
        requesterName: 'Juan',
        requesterLastname: 'Perez',
        requesterEmail: 'juan.perez@netlife.ec',
        status: 'Pendiente'
      },
      {
        dateRequest: new Date(20, 10, 10),
        requesterName: 'Juan',
        requesterLastname: 'Perez',
        requesterEmail: 'juan.perez@netlife.ec',
        status: 'Pendiente'
      },
      {
        dateRequest: new Date(),
        requesterName: 'Juan',
        requesterLastname: 'Perez',
        requesterEmail: 'juan.perez@netlife.ec',
        status: 'Aceptada'
      },
      {
        dateRequest: new Date(21, 10, 10),  
        requesterName: 'Juan',
        requesterLastname: 'Perez',
        requesterEmail: 'juan.perez@netlife.ec',
        status: 'Rechazada'
      },
      {
        dateRequest: new Date(22, 10, 10),
        requesterName: 'Juan',
        requesterLastname: 'Perez',
        requesterEmail: 'juan.perez@netlife.ec',
        status: 'Pendiente'
      },
      {
        dateRequest: new Date(23, 10, 10),
        requesterName: 'Juan',
        requesterLastname: 'Perez',
        requesterEmail: 'juan.perez@netlife.ec',
        status: 'Pendiente'
      }
    ];
  }

  ngOnInit(): void {
    // this.requestService.getAll().subscribe((requests) => {
    //   console.log(requests)
    //   this.listRequest = requests
      this.dataSource = new MatTableDataSource(this.listRequest);

    // },
    // (error) =>{
    //   console.log(error);
    // })

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

  onAccept(row: Request) {
    this.alertType= AlertType.SUCCESS;
    this.messageAlert = 'Se ha aceptado la solicitud exitosamente'
    this.successAccepted = true;

      setTimeout(() => {
        this.successAccepted = false;
        this.ngOnInit();
      }, 2000);
  }

  onDenied(row: Request){
    // this.resourceService.delete(row.idResource).subscribe((response) => {
    //   console.log(response);
    //   this.successDelete = true;

    //   setTimeout(() => {
    //     this.successDelete = false;
    //     this.ngOnInit();
    //   }, 2000);
    // },
    // (error) =>{
    //   console.log(error);
    // })
    this.alertType= AlertType.SUCCESS;
    this.messageAlert = 'Se ha rechazado la solicitud exitosamente'
    this.successDenied = true;

      setTimeout(() => {
        this.successDenied = false;
        this.ngOnInit();
      }, 2000);
  }
}
