import { TestBed } from '@angular/core/testing';

import { CommentaarService } from './commentaar.service';

describe('CommentaarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentaarService = TestBed.get(CommentaarService);
    expect(service).toBeTruthy();
  });
});
