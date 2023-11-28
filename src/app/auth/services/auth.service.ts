import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment.dev";
import { API_URL, API_VERSION } from "../../../constants/environment.const";
import { User } from "../../models/User";
import { TokenService } from "./token.service";
import { Router } from "@angular/router";
import { UsersService } from "../../private/services/users.service";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment[API_URL]
  private apiVersion = environment[API_VERSION]

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private usersService: UsersService
  ) { }


  private handleLoginResponse(res: HttpResponse<User>): void {
    const token = res.headers.get('Jwt-Token');

    if (!token) {
      throw new Error('Token not found in headers');
    }

    this.tokenService.save(token);

    if (!res.body) {
      throw new Error('User data not found in response body');
    }

    this.usersService.setUser(res.body);
    this.usersService.saveInCache(res.body);
  }

  performLogin(email: string, password: string) {
    const url = `${ this.apiUrl }/${ this.apiVersion }/users/login`;

    return this.http.post<User>(url, { username: email, password }, { observe: 'response' }).pipe(
      tap((res: HttpResponse<User>) => this.handleLoginResponse(res))
    );
  }

  performLogout() {
    this.tokenService.remove();
    this.usersService.setUser(null);
    this.usersService.clearCache();
    this.router.navigate(['']).then();
  }


}
