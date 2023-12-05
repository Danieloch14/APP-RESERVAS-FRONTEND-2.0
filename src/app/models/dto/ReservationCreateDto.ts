export interface ReservationCreateDto {
  idResource: number;
  idUser: number;
  startDate: Date;
  hours: number;
  minutes: number;
  status: string;
}
