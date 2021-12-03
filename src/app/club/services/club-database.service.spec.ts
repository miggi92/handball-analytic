import { TestBed } from '@angular/core/testing';

import { ClubDatabaseService } from './club-database.service';

describe('ClubDatabaseService', () => {
  let service: ClubDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
