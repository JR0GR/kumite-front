import { TestBed } from '@angular/core/testing';

import { UserTournamentsService } from './user-tournaments.service';

describe('UserTournamentsService', () => {
  let service: UserTournamentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTournamentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
