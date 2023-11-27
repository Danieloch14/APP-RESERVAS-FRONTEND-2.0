import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.dev";
import { API_URL, API_VERSION } from "../../../constants/environment.const";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment[API_URL]
  private apiVersion = environment[API_VERSION]

  constructor(private http: HttpClient) { }

  performLogin(email: string, password: string) {
    const url = `${ this.apiUrl }/${ this.apiVersion }/users/login`;

    return this.http.post(url, { email, password });
  }
}
