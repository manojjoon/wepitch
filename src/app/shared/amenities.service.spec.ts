import { TestBed } from '@angular/core/testing';

import { AmenitiesService } from './amenities.service';

describe('AmenitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmenitiesService = TestBed.get(AmenitiesService);
    expect(service).toBeTruthy();
  });
});
