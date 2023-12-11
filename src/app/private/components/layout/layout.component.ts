import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { NavComponent } from "../nav/nav.component";
import { CommonModule, UpperCasePipe } from "@angular/common";
import { AuthService } from "../../../auth/services/auth.service";
import { MenuRolService } from '../../admin/services/menu-rol.service';
import { UserRolService } from '../../admin/services/user-rol.service';
import { UsersService } from '../../services/users.service';
import { User } from 'src/app/models/User';
import { MenuService } from '../../admin/services/menu.service';
import { Menu } from 'src/app/models/Menu';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    NavComponent,
    UpperCasePipe,
    CommonModule,
  ],
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  user: User | null = null;
  listMenus: Menu[] = [];
  submenus: Menu[] = [];
  
  constructor(
    private usersService: UsersService,
    private rolUserService: UserRolService,
    private menuRolService: MenuRolService,
    private menuService: MenuService
  ){}

  // items = [
  //   {
  //     name: 'Inicio',
  //     icon: 'fa-home',
  //     route: 'home'
  //   },
  //   {
  //     name: 'Reservas',
  //     icon: 'fa-book',
  //     route: 'bookings'
  //   },
  //   {
  //     name: 'Calendario',
  //     icon: 'fa-calendar',
  //     route: 'calendar'
  //   }
  // ]

  ngOnInit(){
    this.usersService.user$.subscribe({
      next: (user) => {
        this.user = user;

        this.rolUserService.listByIdUser(this.user?.idUser!).subscribe(role => {
          
          this.menuRolService.getById(role[0].rolUserId.idRol).subscribe(menuRoles => {
            this.listMenus = [];
            menuRoles.forEach(menuRol => {
              this.menuService.getMenuById(menuRol.menuRolId.idMenu).subscribe(menu => {
                this.listMenus.push(menu);
                this.listMenus.sort((a, b) => a.order - b.order);
                // this.listSubmenus(menu.idMenu);
              })
            })
          })
        })
      }
    });

  }

  // listSubmenus(idMenu: number){

  //   this.menuService.getAllByMenuParent(idMenu).subscribe(submenu => {
  //     this.submenus.push(...submenu);
  //     this.submenus.sort((a, b) => a.order - b.order);
  //   });
  // }

  // filterByParent(idMenu: number) : Menu[]{
  //   return this.submenus.filter(submenu => submenu.parentMenu === idMenu);
  // }
}
