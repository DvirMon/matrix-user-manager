import { TestBed } from "@angular/core/testing";

import { RemoteUsersService } from "./http-storage.service";

describe("RemoteUsersService", () => {
  let service: RemoteUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteUsersService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
