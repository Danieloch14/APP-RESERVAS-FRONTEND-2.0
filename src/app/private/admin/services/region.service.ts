import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from 'src/app/models/Region';
import { environment } from "../../../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private baseURL = environment.API_URL + environment.API_VERSION + "/regions";
  private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBZG1pbmlzdHJhY2nDs24gZGUgbGEgcGxhdGFmb3JtYSBkZSByZXNlcnZhcyBkZSByZWN1cnNvcyIsInN1YiI6IjE3MDM3OTQ2MjYiLCJpc3MiOiJQbGF0YWZvcm1hIGRlIHJlc2VydmFzIGRlIHJlY3Vyc29zIiwicGVybWlzb3MiOltdLCJleHAiOjE3MDE0MDAzMTEsImlhdCI6MTcwMDk2ODMxMX0.TMVZlRFf0wJm8gOxFKMp-pJ11c7syk-114Giu040pve1E8uwPf2eb5hUivzjknVwYtp_Nlq81fFPQhruiyGF8w'

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Region[]> {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.httpClient.get<Region[]>(`${this.baseURL}`, { headers});
  }
}
