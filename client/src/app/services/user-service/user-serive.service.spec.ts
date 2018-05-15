import { TestBed, inject } from '@angular/core/testing';

import { UserSeriveService } from './user-serive.service';

describe('UserSeriveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSeriveService]
    });
  });

  it('should be created', inject([UserSeriveService], (service: UserSeriveService) => {
    expect(service).toBeTruthy();
  }));
});
