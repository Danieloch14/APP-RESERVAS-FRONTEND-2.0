import { TestBed } from '@angular/core/testing';

import { TypeResourceService } from './type-resource.service';

describe('TypeResourceService', () => {
  let service: TypeResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
