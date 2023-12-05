import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesComponent } from './pages/resources/resources.component';
import { LayoutComponent } from '../components/layout/layout.component';
import { HomeComponent } from '../components/home/home.component';
import { TypeResourcesComponent } from './pages/type-resources/type-resources.component';
import { AccessRequestComponent } from './pages/access-request/access-request.component';
import { ProfileSettingsComponent } from '../components/profile-settings/profile-settings.component';
import { MenusComponent } from './pages/menus/menus.component';
import { RoleComponent } from './pages/role/role.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent,
      },
      {
        path: 'resources', component: ResourcesComponent,
      },
      {
        path: 'type-resources', component: TypeResourcesComponent
      },
      {
        path: 'access-request', component: AccessRequestComponent
      },
      {
        path: 'profile-settings', component: ProfileSettingsComponent
      },
      {
        path: 'menu', component: MenusComponent
      },
      {
        path: 'role', component: RoleComponent
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
