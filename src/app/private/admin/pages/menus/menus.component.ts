import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Menu } from 'src/app/models/Menu';
import { ModalMenuComponent } from './modal-menu/modal-menu.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit{

  firstTableColumns: string[] = [
    'select',
    'label',
    'order',
    'description',
    'action'
  ];

  secondTableColumns: string[] = [
    'label',
    'order',
    'description',
    'action'
  ];

  firstTable!: MatTableDataSource<Menu>;
  secondTable!: MatTableDataSource<Menu>;

  listFirstLevelMenu: Menu[] = [];
  listSecondLevelMenu: Menu[] = [];

  selectedRow: any;
  isFirstLevelSelected: boolean = false;
  parentMenu!: Menu;;

  constructor(
    private modalService: MdbModalService
  ) {
    
    this.listFirstLevelMenu = [
      {
        id_Menu: 1,
        label: 'Home',
        parent_menu: 0,
        order: 1,
        path: '/home',
        description: 'Home'
      },
      {
        id_Menu: 2,
        label: 'Admin',
        parent_menu: 0,
        order: 2,
        path: '/admin',
        description: 'Admin'
      },
      {
        id_Menu: 3,
        label: 'Resources',
        parent_menu: 0,
        order: 3,
        path: '/resources',
        description: 'Resources'
      },
      {
        id_Menu: 4,
        label: 'Access Request',
        parent_menu: 0,
        order: 4,
        path: '/access-request',
        description: 'Access Request'
      },
      {
        id_Menu: 5,
        label: 'Profile Settings',
        parent_menu: 0,
        order: 5,
        path: '/profile-settings',
        description: 'Profile Settings'
      },
      {
        id_Menu: 6,
        label: 'Administración plataforma',
        parent_menu: 0,
        order: 6,
        path: '/admin',
        description: 'Administración plataforma'
      }
    ]
   }

  ngOnInit(): void {
      this.firstTable = new MatTableDataSource(this.listFirstLevelMenu);

  }

  // selección de menu de primer nivel
  public onSelectRow(menu: Menu, level: number): void {
    console.log('menu seleccionado', menu);
    if (level === 1) {
      this.isFirstLevelSelected = true;
      this.parentMenu = menu;
      // this.menuN1Seleccionado = menu;
      // this.menuN2Seleccionado = null;
      // this.menuN3Seleccionado = null;

      this.listSecondLevelMenu = [];
      this.getChildrenMenu(menu.id_Menu, level);

      // obtiene los hijos del menú seleccionado
      // this.obtenerMenusHijos(menu.codMenu, nivel);
    } else if (level === 2) {
      // this.menuN2Seleccionado = menu;

      // obtiene los hijos del menú seleccionado
      // this.obtenerMenusHijos(menu.codMenu, nivel);
    } else{
      this.isFirstLevelSelected = false;
    }
  }

  getChildrenMenu(idParentMenu: number, level: number): void {
    // this.subscriptions.push(
    //   this.menuService.listarHijos(codMenuPadre).subscribe((data: Menu[]) => {
    //     if (nivel === 1) this.menusSegundoNivel = data;
    //     else if (nivel === 2) this.menusTercerNivel = data;
    //   })
    // );
    this.listSecondLevelMenu = [
      {
        id_Menu: 7,
        label: 'Resources',
        parent_menu: 0,
        order: 1,
        path: '/resources',
        description: 'Resources'
      },
      {
        id_Menu: 8,
        label: 'Type Resources',
        parent_menu: 0,
        order: 2,
        path: '/type-resources',
        description: 'Type Resources'
      },
      {
        id_Menu: 9,
        label: 'Role',
        parent_menu: 0,
        order: 3,
        path: '/role',
        description: 'Role'
      },
      {
        id_Menu: 10,
        label: 'Menu by Role',
        parent_menu: 0,
        order: 4,
        path: '/menu-by-role',
        description: 'Menu by Role'
      },
      {
        id_Menu: 11,
        label: 'Menu',
        parent_menu: 0,
        order: 5,
        path: '/menu',
        description: 'Menu'
      }
    ]

    this.secondTable = new MatTableDataSource(this.listSecondLevelMenu);
  }

  onCreate(level: number) {
    
    if(level === 1){
      const modalRef: MdbModalRef<ModalMenuComponent> = this.modalService.open(ModalMenuComponent, {
        data: {
          title: 'Nuevo Menú de Primer Nivel',
          levelMenu: level
        },
        modalClass: 'modal-dialog-centered',
        ignoreBackdropClick: true,
  
      });
  
      modalRef.onClose.subscribe((state: boolean) => {
        if(state){
          this.ngOnInit();
        }
      });
      
    }else if(level === 2){
      const modalRef: MdbModalRef<ModalMenuComponent> = this.modalService.open(ModalMenuComponent, {
        data: {
          title: 'Nuevo Menú de Segundo Nivel',
          levelMenu: level
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
   
  }

  onEdit(level: number, menu: Menu) {
    
    if(level === 1){
      const modalRef: MdbModalRef<ModalMenuComponent> = this.modalService.open(ModalMenuComponent, {
        data: {
          title: 'Edición Menú de Primer Nivel',
          isEditing: true,
          menu: menu,
          levelMenu: level
        },
        modalClass: 'modal-dialog-centered',
        ignoreBackdropClick: true,
  
      });
  
      modalRef.onClose.subscribe((state: boolean) => {
        if(state){
          this.ngOnInit();
        }
      });
      
    }else if(level === 2){
      const modalRef: MdbModalRef<ModalMenuComponent> = this.modalService.open(ModalMenuComponent, {
        data: {
          title: 'Edición Menú de Segundo Nivel',
          isEditing: true,
          menu: menu,
          levelMenu: level
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
   
  }
}
