import { TestBed } from '@angular/core/testing';

import { MessagesErrorService } from './messages-error.service';

describe('MessagesErrorService', () => {
  let service: MessagesErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
