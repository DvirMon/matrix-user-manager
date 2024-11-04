import { TestBed } from '@angular/core/testing';

import { MessagesMangerService } from './messages-manger.service';

describe('MessagesMangerService', () => {
  let service: MessagesMangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesMangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
