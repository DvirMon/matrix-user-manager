import { TestBed } from '@angular/core/testing';

import { MessageErrorsService } from './message-errors.service';

describe('MessageErrorsService', () => {
  let service: MessageErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
