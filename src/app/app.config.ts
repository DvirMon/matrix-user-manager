import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { ApplicationConfig } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideUsersLogic } from "./services/users/users.provider";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom([HttpClientModule, MatDialogModule]),
    provideUsersLogic({ useLocal: false }),
  ],
};
