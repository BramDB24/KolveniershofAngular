import { TestBed } from '@angular/core/testing';

import { OpmerkingenService } from './opmerkingen.service';

describe('OpmerkingenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpmerkingenService = TestBed.get(OpmerkingenService);
    expect(service).toBeTruthy();
  });
});
