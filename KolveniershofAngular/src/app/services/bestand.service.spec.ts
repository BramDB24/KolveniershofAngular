import { TestBed } from '@angular/core/testing';

import { BestandService } from './bestand.service';

describe('BestandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BestandService = TestBed.get(BestandService);
    expect(service).toBeTruthy();
  });
});
