import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from 'src/app/models/Region';
import { environment } from "../../../../environments/environment";
import { REGION_NET_BOOKING } from "../../../../constants/environment.const";

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  currentRegion: Region | null;
  private baseURL = environment.API_URL + '/' + environment.API_VERSION + '/regions';

  constructor(private httpClient: HttpClient) {
    this.currentRegion = null;
  }


  // getAll(): Observable<Region[]> {
  //   return this.httpClient.get<Region[]>(`${ this.baseURL }`);
  // }

  getAll(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(`${ this.baseURL }`);
  }

  saveInLocalStorage(region: Region) {
    localStorage.setItem(REGION_NET_BOOKING, JSON.stringify(region));
  }

  getFromLocalStorage(): Region | null {
    const storedData = localStorage.getItem(REGION_NET_BOOKING);
    return storedData ? JSON.parse(storedData) : null;
  }

  clearLocalStorage() {
    this.currentRegion = null;
    localStorage.removeItem(REGION_NET_BOOKING);
  }

}
