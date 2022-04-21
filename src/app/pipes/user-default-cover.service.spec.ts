import { TestBed } from '@angular/core/testing';

import { UserDefaultCoverService } from './user-default-cover.service';

describe('UserDefaultCoverService', () => {
  let service: UserDefaultCoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDefaultCoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
