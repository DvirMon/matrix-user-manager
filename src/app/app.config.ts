import { ApplicationConfig } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { importProvidersFrom } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { provideFormMessageManger } from "./services/messages-error.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom([HttpClientModule, MatDialogModule]),
  ],
};
