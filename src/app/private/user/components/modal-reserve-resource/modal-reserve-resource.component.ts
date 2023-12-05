import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from "mdb-angular-ui-kit/modal";
import { Resource } from "../../../../models/Resource";
import { MINUTES } from "../../../../../constants/minutes.const";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegionService } from "../../../admin/services/region.service";
import { ResourceService } from "../../../admin/services/resource.service";
import { ReservationService } from "../../services/reservation.service";
import { ReservationCreateDto } from "../../../../models/dto/ReservationCreateDto";
import { UsersService } from "../../../services/users.service";
import { User } from "../../../../models/User";
import { SearchResourceDto } from "../../../../models/dto/SearchResourceDto";

@Component({
  selector: 'app-modal-reserve-resource',
  templateUrl: './modal-reserve-resource.component.html',
  styleUrls: ['./modal-reserve-resource.component.scss']
})
export class ModalReserveResourceComponent implements OnInit {

  user: User | null = null;
  resource: Resource | null = null;
  minutes: number[] = MINUTES;
  reservationForm: FormGroup;
  isSearchDone: boolean = false;
  isAvailable: boolean = false;
  previousSearch: SearchResourceDto | null = null;

  constructor(
    public modalRef: MdbModalRef<ModalReserveResourceComponent>,
    private builder: FormBuilder,
    private regionService: RegionService,
    private resourceService: ResourceService,
    private reservationService: ReservationService,
    private userService: UsersService,
  ) {
    this.reservationForm = this.builder.group({});
    this.buildForm();

    this.isSearchDone = this.resourceService.isSearchDone;
    this.isAvailable = this.isSearchDone;

    if (this.isSearchDone) {
      this.previousSearch = this.reservationService.searchResourceDto;
      this.matchFormWithPreviousSearch();
    }
  }

  ngOnInit() {
    this.userService.user$.subscribe({
      next: user => {
        this.user = user;
      }
    });
  }

  private matchFormWithPreviousSearch() {
    const previousSearch = this.previousSearch;

    if (!previousSearch) return;

    const date = new Date(previousSearch.date);
    const time = this.formatTime(date);

    this.reservationForm.patchValue({
      date: date.toISOString().split('T')[0],
      time: time,
      hours: Math.floor(previousSearch.hours),
      minutes: previousSearch.minutes,
    });
  }

  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${ hours }:${ minutes }`;
  }

  private buildForm() {
    this.reservationForm = this.builder.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      hours: ['', [Validators.required]],
      minutes: ['', [Validators.required]],
    })
  }

  private buildSearchResourceDto(): {
    idResource: number;
    startDate: Date;
    hours: number;
    minutes: number;
  } {
    const rawDate = this.reservationForm.get('date')?.value;
    const date = rawDate ? new Date(rawDate) : new Date();
    const time = this.reservationForm.get('time')?.value;
    date.setHours(+time.split(':')[0]);
    date.setMinutes(+time.split(':')[1]);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return {
      startDate: new Date(date.setDate(date.getDate() + 1)),
      hours: this.reservationForm.get('hours')?.value ?? 0,
      minutes: +this.reservationForm.get('minutes')?.value ?? 0,
      idResource: this.resource?.idResource ?? 0,
    };
  }

  onCheckAvailability() {
    const searchResourceDto = this.buildSearchResourceDto();
    console.log('searchResourceDto', searchResourceDto);
    this.reservationService.verifyAvailability(searchResourceDto).subscribe({
      next: (isAvailable) => {
        this.isAvailable = isAvailable;
      }
    });
  }

  onReserve() {
    if (this.reservationForm.invalid) return;

    const reservation: ReservationCreateDto = {
      ...this.buildSearchResourceDto(),
      idUser: this.user?.idUser ?? 0,
      status: 'ACTIVO',
    }
    console.log('reservation', reservation);
    this.reservationService.create(reservation).subscribe({
      next: () => {
        console.log('Reserva creada');
        this.modalRef.close();
      }
    });
  }
}
