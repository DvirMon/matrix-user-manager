import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",

    loadComponent: () =>
      import("./users/users-dashboard.component").then(
        (m) => m.UsersDashboardComponent
      ),
  },
  { path: "", redirectTo: "/", pathMatch: "full" },
];
