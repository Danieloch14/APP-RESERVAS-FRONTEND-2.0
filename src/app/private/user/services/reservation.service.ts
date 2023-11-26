import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/models/Reservation';
import { environmentProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseURL = environmentProd.API_URL + environmentProd.API_VERSION + "/reservations";
  private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBZG1pbmlzdHJhY2nDs24gZGUgbGEgcGxhdGFmb3JtYSBkZSByZXNlcnZhcyBkZSByZWN1cnNvcyIsInN1YiI6IjE3MDM3OTQ2MjYiLCJpc3MiOiJQbGF0YWZvcm1hIGRlIHJlc2VydmFzIGRlIHJlY3Vyc29zIiwicGVybWlzb3MiOltdLCJleHAiOjE3MDE0MDAzMTEsImlhdCI6MTcwMDk2ODMxMX0.TMVZlRFf0wJm8gOxFKMp-pJ11c7syk-114Giu040pve1E8uwPf2eb5hUivzjknVwYtp_Nlq81fFPQhruiyGF8w'

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Reservation[]> {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.httpClient.get<Reservation[]>(`${this.baseURL}`, { headers});
  }

}
