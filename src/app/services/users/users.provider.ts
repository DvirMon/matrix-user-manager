import { Provider } from "@angular/core";
import { AbstractUsersService } from "./abstract-users.service";
import { UsersLocalService } from "./users-local.service";
import { UsersRemoteService } from "./users-remote.service";

interface UsersConfig {
  useLocal: boolean;
}

export function provideUsersLogic(
  config: UsersConfig = { useLocal: true }
): Provider {
  return {
    provide: AbstractUsersService,
    useClass: config.useLocal ? UsersLocalService : UsersRemoteService,
  };
}
