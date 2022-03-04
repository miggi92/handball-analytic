import { TestBed } from '@angular/core/testing';

import { DefaultServiceService } from './default-service.service';

describe('DefaultServiceService', () => {
  let service: DefaultServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
