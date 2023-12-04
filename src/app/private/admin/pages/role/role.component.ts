import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalRoleComponent } from './modal-role/modal-role.component';
import { Rol } from 'src/app/models/Rol';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  
  displayedColumns: string[] = [
    'role',
    'description',
    'actions'
  ];

  dataSource!: MatTableDataSource<Rol>;

  listRoles!: Rol[];
  isSuccessDeleted: boolean = false;
  messageAlert!: string;
  alertType: any;

  constructor(
    private modalService: MdbModalService
  ) {  
    this.listRoles = [
      {
        id_role: 1,
        rol_name: 'Admin',
        description: "gestiona toda la plataforma"
      },
      {
        id_role: 2,
        rol_name: 'User',
        description: 'accede a ciertas funcionalidades'
      },
      {
        id_role: 3,
        rol_name: 'Client',
        description: 'accede a ciertas funcionalidades'
      }
    ];
  }

  ngOnInit(): void {
      this.dataSource = new MatTableDataSource(this.listRoles);

  }

  onSave() {
    const modalRef: MdbModalRef<ModalRoleComponent> = this.modalService.open(ModalRoleComponent, {
      data: {
        title: 'Nuevo Rol'
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

  onEdit(row: Rol) {
    const modalRef: MdbModalRef<ModalRoleComponent> = this.modalService.open(ModalRoleComponent, {
      data: {
        title: 'Edición Rol',
        isEditing: true,
        rol: row
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

  onDelete(row: Rol){
    this.alertType= AlertType.SUCCESS;
    this.messageAlert = 'Se ha eliminado el rol exitosamente'
    this.isSuccessDeleted = true;

      setTimeout(() => {
        this.isSuccessDeleted = false;
        this.ngOnInit();
      }, 2000);
  }
}
