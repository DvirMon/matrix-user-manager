import { TestBed } from '@angular/core/testing';

import { UserStrategyService } from './user-strategy.service';

describe('UserStrategyService', () => {
  let service: UserStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
