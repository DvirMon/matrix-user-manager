import { Provider } from "@angular/core";
import { AbstractUsersService } from "./services/abstract-users.service";
import { UsersLocalService } from "./services/users-local.service";
import { UsersRemoteService } from "./services/users-remote.service";

interface UsersConfig {
  useLocal: boolean;
}

export function provideUsersLogic(
  config: UsersConfig = { useLocal: false }
): Provider {
  return {
    provide: AbstractUsersService,
    useClass: config.useLocal ? UsersLocalService : UsersRemoteService,
  };
}
