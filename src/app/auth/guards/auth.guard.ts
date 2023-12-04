import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from "../services/token.service";
import { UsersService } from "../../private/services/users.service";
import { RegionService } from "../../private/admin/services/region.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private usersService: UsersService,
    private regionService: RegionService

  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const token = this.tokenService.get();
    if (token) {
      this.usersService.setUser(this.usersService.getFromLocalStorage());
      this.regionService.currentRegion = this.regionService.getFromLocalStorage();
      return true;
    } else {
      this.router.createUrlTree(['/auth/login'])
      return false;
    }
  }
}

