import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeResource } from 'src/app/models/TypeResource';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TypeResourceService {

  private baseURL = environment.API_URL + environment.API_VERSION + "/type-resources";

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<TypeResource[]> {
    return this.httpClient.get<TypeResource[]>(`${ this.baseURL }`,);
  }

  create(typeResource: TypeResource): Observable<any> {
    return this.httpClient.post<any>(`${ this.baseURL }`, typeResource);
  }

  update(typeResource: TypeResource, idTypeResource: number) {
    return this.httpClient.put<any>(`${ this.baseURL }/${ idTypeResource }`, typeResource);
  }

  delete(idTypeResource: number) {
    return this.httpClient.delete<any>(`${ this.baseURL }/${ idTypeResource }`);
  }
}
