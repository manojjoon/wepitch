import { TestBed } from '@angular/core/testing';

import { GroundService } from './ground.service';

describe('GroundService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroundService = TestBed.get(GroundService);
    expect(service).toBeTruthy();
  });
});
