import { TestBed } from "@angular/core/testing";

import { UsersLocalService } from "./users-local.service";

describe("UsersLocalService", () => {
  let service: UsersLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersLocalService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
