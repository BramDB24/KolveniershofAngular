import { TestBed } from '@angular/core/testing';

import { TemplateResolverService } from './template-resolver.service';

describe('TemplateResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemplateResolverService = TestBed.get(TemplateResolverService);
    expect(service).toBeTruthy();
  });
});
