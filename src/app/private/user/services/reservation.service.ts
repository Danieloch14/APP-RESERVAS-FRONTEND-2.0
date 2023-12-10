import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/models/Reservation';
import { environment } from "../../../../environments/environment";
import { ReservationCreateDto } from "../../../models/dto/ReservationCreateDto";
import { SearchResourceDto } from "../../../models/dto/SearchResourceDto";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseURL = `${ environment.API_URL }/${ environment.API_VERSION }/reservations`;

  searchResourceDto: SearchResourceDto | null;

  constructor(private httpClient: HttpClient) {
    this.searchResourceDto = null
  }

  getAll() {
    return this.httpClient.get<Reservation[]>(`${ this.baseURL }`,);
  }

  verifyAvailability(searchResourceDto: {
    idResource: number;
    startDate: Date;
    hours: number;
    minutes: number;
  }) {
    return this.httpClient.post<boolean>(`${ this.baseURL }/is-available`, searchResourceDto);
  }

  create(reservation: ReservationCreateDto) {
    return this.httpClient.post<any>(`${ this.baseURL }`, reservation);
  }


}
