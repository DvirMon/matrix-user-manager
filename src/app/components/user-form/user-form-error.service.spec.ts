import { TestBed } from '@angular/core/testing';

import { UserFormErrorService } from './user-form-error.service';

describe('UserFormErrorService', () => {
  let service: UserFormErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFormErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
