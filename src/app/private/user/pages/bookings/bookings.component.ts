import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SearchResourceDto } from "../../../../models/dto/SearchResourceDto";
import { ResourceType } from "../../../../models/ResourceType";
import { ResourceTypeService } from "../../../admin/services/resource-type.service";
import { ICONS } from "../../../../../constants/icons.const";
import { MINUTES } from "../../../../../constants/minutes.const";
import { Resource } from "../../../../models/Resource";
import { ResourceService } from "../../../admin/services/resource.service";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  searchForm: FormGroup;
  resourceTypes: ResourceType[];
  filteredResourceTypes: ResourceType[];
  resources: Resource[];
  filteredResources: Resource[];
  minutes: number[] = MINUTES;

  constructor(
    private builder: FormBuilder,
    private resourceTypeService: ResourceTypeService,
    private resourceService: ResourceService
  ) {
    this.resourceTypes = []
    this.resources = [];
    this.filteredResources = [];
    this.filteredResourceTypes = [];
    this.searchForm = new FormGroup({});
    this.buildForm();
  }

  ngOnInit() {
    this.loadResourceTypes();
    this.loadResources();
  }

  private loadResourceTypes() {
    this.resourceTypeService.getAll().subscribe({
      next: (resourceTypes) => {
        this.resourceTypes = resourceTypes;
        this.resourceTypes.forEach(resourceType => {
          resourceType.icon = ICONS[resourceType.name.toLowerCase()];
        });
        this.sortResourceTypes();
      },
      error: (err) => this.handleError(err)
    });
  }

  private loadResources() {
    this.resourceService.getAllByRegionId(1).subscribe({
      next: (resources) => {
        this.resources = resources;
        this.filteredResources = resources;
      },
      error: (err) => this.handleError(err)
    });
  }

  private sortResourceTypes() {
    this.resourceTypes.sort((a, b) => a.name.localeCompare(b.name));
    this.resourceTypes.sort((a, b) => (a.name.toLowerCase() === 'otros') ? 1 : (b.name.toLowerCase() === 'otros') ? -1 : 0);
  }

  private filterResources(filteredResourceTypes: ResourceType[]) {
    if (filteredResourceTypes.length === 0) {
      this.filteredResources = this.resources;
      return;
    }

    this.filteredResources = this.resources.filter(resource => {
      return filteredResourceTypes.some(type => type.idTypeResource === resource.idTypeResource.idTypeResource);
    });
  }

  private handleError(err: any) {
    console.error(err);
  }

  private buildForm() {
    this.searchForm = this.builder.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      hours: ['', [Validators.required]],
      minutes: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
    });
  }

  onSearchResource() {
    if (this.searchForm.invalid) return;

    const rawDate = this.searchForm.get('date')?.value;
    const date = rawDate ? new Date(rawDate) : new Date();

    const search: SearchResourceDto = {
      date: new Date(date.setDate(date.getDate() + 1)),
      time: this.searchForm.get('time')?.value ?? '',
      hours: this.searchForm.get('hours')?.value ?? 0,
      minutes: +this.searchForm.get('minutes')?.value ?? 0,
      capacity: this.searchForm.get('capacity')?.value ?? 0,
    };

    console.log({ search })

    // Realizar la lógica de búsqueda según 'search'
  }

  onToggleFilterResource(resourceType: ResourceType) {
    const index = this.filteredResourceTypes.findIndex(
      (type) => type.idTypeResource === resourceType.idTypeResource
    );

    index !== -1 ? this.filteredResourceTypes.splice(index, 1) : this.filteredResourceTypes.push(resourceType);
    this.filterResources(this.filteredResourceTypes);
  }

}
