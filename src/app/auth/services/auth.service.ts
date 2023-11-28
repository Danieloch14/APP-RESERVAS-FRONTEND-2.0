import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment.dev";
import { API_URL, API_VERSION } from "../../../constants/environment.const";
import { User } from "../../models/User";
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from "rxjs";
import { TokenService } from "./token.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment[API_URL]
  private apiVersion = environment[API_VERSION]

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();


  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }

  private setUser(user: User | null) {
    console.log('Auth services user:', user)
    this.user.next(user)
  }

  private handleLoginResponse(res: HttpResponse<User>): void {
    const token = res.headers.get('Jwt-Token');

    if (!token) {
      throw new Error('Token not found in headers');
    }

    this.tokenService.save(token);

    if (!res.body) {
      throw new Error('User data not found in response body');
    }

    this.setUser(res.body);
  }

  performLogin(email: string, password: string) {
    const url = `${ this.apiUrl }/${ this.apiVersion }/users/login`;

    return this.http.post<User>(url, { username: email, password }, { observe: 'response' }).pipe(
      tap((res: HttpResponse<User>) => this.handleLoginResponse(res))
    );
  }

  performLogout() {
    this.tokenService.remove()
    this.user.next(null);
    this.router.navigate(['']).then()
  }


}
