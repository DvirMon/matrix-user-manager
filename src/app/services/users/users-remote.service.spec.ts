import { TestBed } from "@angular/core/testing";

import { UsersRemoteService } from "./users-remote.service";

describe("UsersRemoteService", () => {
  let service: UsersRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersRemoteService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
