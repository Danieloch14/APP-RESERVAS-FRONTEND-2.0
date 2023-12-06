import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/models/Rol';
import { API_URL, API_VERSION } from 'src/constants/environment.const';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrl = environment[API_URL]
  private apiVersion = environment[API_VERSION]
  private baseUrl = `${this.apiUrl}/${this.apiVersion}/roles`;
  
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${ this.baseUrl}`,);
  }

  save(newRol: Rol): Observable<any> {
    return this.http.post<any>(`${ this.baseUrl }`, newRol);
  }

  update(rol: Rol) {
    return this.http.put<Rol>(`${ this.baseUrl }`, rol);
  }

  delete(idRol: number) {
    return this.http.delete<any>(`${ this.baseUrl }/${ idRol }`);
  }
}