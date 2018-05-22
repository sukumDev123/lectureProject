import { TestBed, inject } from '@angular/core/testing';

import { ErrorsPageService } from './errors-page.service';

describe('ErrorsPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorsPageService]
    });
  });

  it('should be created', inject([ErrorsPageService], (service: ErrorsPageService) => {
    expect(service).toBeTruthy();
  }));
});
