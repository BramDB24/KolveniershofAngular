import { TestBed } from '@angular/core/testing';

import { AtelierService } from './atelier.service';

describe('AtelierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtelierService = TestBed.get(AtelierService);
    expect(service).toBeTruthy();
  });
});
