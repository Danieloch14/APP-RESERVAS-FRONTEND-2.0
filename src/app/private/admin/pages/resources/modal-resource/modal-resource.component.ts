import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Resource } from 'src/app/models/Resource';

@Component({
  selector: 'app-modal-resource',
  templateUrl: './modal-resource.component.html',
  styleUrls: ['./modal-resource.component.scss'],
})
export class ModalResourceComponent {
  @Input() isEditing = false;
  @Input() title!: string;
  @Input() resource!: Resource;

  resourceForm: FormGroup;
  selectedFile: string | null = null;

  constructor(
    public modalRef: MdbModalRef<ModalResourceComponent>,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.resourceForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.isEditing) {
      this.setForm();
    }
  }

  buildForm() {
    this.resourceForm = this.fb.group({
      idTypeResource: ['', [Validators.required]],
      idLocation: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      codNumber: ['', [Validators.required]],
      content: ['', [Validators.required]],
      price: ['', [Validators.required]],
      pathImages: ['', [Validators.required]],
    });
  }

  get idTypeResourceField() {
    return this.resourceForm.get('idTypeResource');
  }

  get idLocationField() {
    return this.resourceForm.get('idLocation');
  }

  get capacityField() {
    return this.resourceForm.get('capacity');
  }

  get codNumberField() {
    return this.resourceForm.get('codNumber');
  }

  get contentField() {
    return this.resourceForm.get('content');
  }

  get priceField() {
    return this.resourceForm.get('price');
  }

  get pathImagesField() {
    return this.resourceForm.get('pathImages');
  }

  setForm() {
    this.resourceForm.patchValue({
      idTypeResource: this.resource.idTypeResource.idTypeResource.toString(),
      idLocation: this.resource.idLocation.idLocation.toString(),
      capacity: this.resource.capacity,
      codNumber: this.resource.codNumber,
      price: this.resource.price,
      pathImages: this.resource.pathImages,
    });
    this.selectedFile = this.resource.pathImages;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      // build full picture path
      const imageUrl = 'assets/img/' + file.name;

      // set pathImage value to the form
      this.resourceForm.patchValue({
        pathImages: imageUrl,
      });
      this.selectedFile = imageUrl;
    }
  }

  clearFile(): void {
    this.resourceForm.patchValue({
      pathImages: '',
    });
    this.selectedFile = null;
  }

  getImageUrlPath(path: string): SafeUrl {
    const imageUrl = this.sanitizer.bypassSecurityTrustUrl(path);
    return imageUrl;
  }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage);
  }

  save() {
    if (this.isEditing) {
      console.log('Guardando cambios para:', this.resourceForm.value);
    } else {
      console.log('Creando nuevo elemento:', this.resourceForm.value);
    }
    this.close();
  }
}
