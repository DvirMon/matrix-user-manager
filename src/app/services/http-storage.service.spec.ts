import { TestBed } from '@angular/core/testing';

import { HttpStorageService } from './http-storage.service';

describe('HttpStorageService', () => {
  let service: HttpStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
