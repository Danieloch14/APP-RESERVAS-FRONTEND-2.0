import { Injectable } from '@angular/core';
import { TOKEN_NETBOOKING } from "../../../constants/environment.const";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  get() {
    return localStorage.getItem(TOKEN_NETBOOKING);
  }

  save(token: string) {
    localStorage.setItem(TOKEN_NETBOOKING, token);
  }

  remove() {
    localStorage.removeItem(TOKEN_NETBOOKING);
  }

}
