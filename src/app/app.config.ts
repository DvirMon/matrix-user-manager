import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
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
    provideUsersLogic(),
  ],
};
