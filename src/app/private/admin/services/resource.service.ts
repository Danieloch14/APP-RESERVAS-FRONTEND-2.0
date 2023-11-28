import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from 'src/app/models/Resource';
import { ResourceCreate } from 'src/app/models/ResourceCreate';
import { environment } from "../../../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private baseURL = environment.API_URL + environment.API_VERSION + "/resources";
  private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBZG1pbmlzdHJhY2nDs24gZGUgbGEgcGxhdGFmb3JtYSBkZSByZXNlcnZhcyBkZSByZWN1cnNvcyIsInN1YiI6IjE3MDM3OTQ2MjYiLCJpc3MiOiJQbGF0YWZvcm1hIGRlIHJlc2VydmFzIGRlIHJlY3Vyc29zIiwicGVybWlzb3MiOltdLCJleHAiOjE3MDE0MDAzMTEsImlhdCI6MTcwMDk2ODMxMX0.TMVZlRFf0wJm8gOxFKMp-pJ11c7syk-114Giu040pve1E8uwPf2eb5hUivzjknVwYtp_Nlq81fFPQhruiyGF8w'

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Resource[]> {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.httpClient.get<Resource[]>(`${this.baseURL}`, { headers});
  }

  saveResource(resource: ResourceCreate): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.httpClient.post<any>(`${this.baseURL}`, resource, { headers});
  }

  updateResource(resource: Resource, idResource: number){
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.httpClient.post<any>(`${this.baseURL}/${idResource}`, resource, { headers});
  }

  deleteResource(idResource: number){
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.httpClient.delete<any>(`${this.baseURL}/${idResource}`, { headers});
  }
}
