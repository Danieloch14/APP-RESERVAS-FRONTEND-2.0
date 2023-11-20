import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  get() {
    return localStorage.getItem('token');
  }

  save(token: string) {
    localStorage.setItem('token', token);
  }

  remove() {
    localStorage.removeItem('token');
  }

}
