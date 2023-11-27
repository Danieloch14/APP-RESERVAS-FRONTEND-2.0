import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeResource } from 'src/app/models/TypeResource';
import { environmentProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TypeResourceService {

  private baseURL = environmentProd.API_URL + environmentProd.API_VERSION + "/type-resources";
  private token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBZG1pbmlzdHJhY2nDs24gZGUgbGEgcGxhdGFmb3JtYSBkZSByZXNlcnZhcyBkZSByZWN1cnNvcyIsInN1YiI6IjE3MDM3OTQ2MjYiLCJpc3MiOiJQbGF0YWZvcm1hIGRlIHJlc2VydmFzIGRlIHJlY3Vyc29zIiwicGVybWlzb3MiOltdLCJleHAiOjE3MDE0MDAzMTEsImlhdCI6MTcwMDk2ODMxMX0.TMVZlRFf0wJm8gOxFKMp-pJ11c7syk-114Giu040pve1E8uwPf2eb5hUivzjknVwYtp_Nlq81fFPQhruiyGF8w'

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<TypeResource[]> {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.httpClient.get<TypeResource[]>(`${this.baseURL}`, { headers});
  }
  
  createTypeResource(typeResource: TypeResource): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.httpClient.post<any>(`${this.baseURL}`, typeResource, { headers});
  }

  updateTypeResource(typeResource: TypeResource, idTypeResource: number){
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.httpClient.put<any>(`${this.baseURL}/${idTypeResource}`, typeResource, { headers});
  }

  deleteTypeResource(idTypeResource: number){
    const headers: HttpHeaders = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.httpClient.delete<any>(`${this.baseURL}/${idTypeResource}`, { headers});
  }
}
