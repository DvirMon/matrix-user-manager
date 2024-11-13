import { ApplicationConfig } from "@angular/core";
import { routes } from "./app.routes";
import { provideUsersLogic } from "./services/users/users.provider";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideUsersLogic(),
  ],
};
