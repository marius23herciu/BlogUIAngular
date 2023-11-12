import { TestBed } from '@angular/core/testing';

import { UserCommentsService } from './user-comments.service';

describe('UserCommentsService', () => {
  let service: UserCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
