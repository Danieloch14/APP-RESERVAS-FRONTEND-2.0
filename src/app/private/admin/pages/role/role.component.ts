import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalRoleComponent } from './modal-role/modal-role.component';
import { Rol } from 'src/app/models/Rol';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { RolService } from '../../services/rol.service';
import { AlertHandler } from 'src/app/utils/AlertHandler';

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

  constructor(
    private modalService: MdbModalService,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
    this.rolService.getAll().subscribe((roles) => {
      this.listRoles = roles;
      this.dataSource = new MatTableDataSource(this.listRoles);
    },
    (error) => {
      console.log(error);
    });
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
    this.rolService.delete(row.idRol).subscribe({
      next: () => {
          AlertHandler.show('Se ha eliminado el rol exitosamente', AlertType.SUCCESS)
          setTimeout(() => {
            this.ngOnInit();
          }, 3000);
      },
      error: (error) => {
        console.log(error);
          AlertHandler.show('No se pudo eliminar el rol, inténtelo nuevamente', AlertType.ERROR)
          setTimeout(() => {
            this.ngOnInit();
          }, 3000);
      }
    })
  }
}
