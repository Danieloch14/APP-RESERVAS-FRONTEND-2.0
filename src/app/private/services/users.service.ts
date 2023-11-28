import { Injectable } from '@angular/core';
import { USER_NET_BOOKING } from "../../../constants/environment.const";
import { User } from "../../models/User";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor() { }

  setUser(user: User | null) {
    this.user.next(user)
  }

  getFromCache(): User | null {
    const storedData = localStorage.getItem(USER_NET_BOOKING);
    return storedData ? JSON.parse(storedData) : null;
  }

  saveInCache(user: User) {
    localStorage.setItem(USER_NET_BOOKING, JSON.stringify(user));
  }

  clearCache() {
    localStorage.removeItem(USER_NET_BOOKING);
  }


}
