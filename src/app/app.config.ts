import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideUsersLogic } from "./users/data-access/users.provider";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideUsersLogic(),
  ],
};
