import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, API_VERSION } from 'src/constants/environment.const';
import { environment } from 'src/environments/environment';
import { Request } from 'src/app/models/Request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = environment[API_URL]
  private apiVersion = environment[API_VERSION]
  
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Request[]> {
    return this.http.get<Request[]>(`${ this.apiUrl }/${ this.apiVersion }/request`,);
  }
  
}
