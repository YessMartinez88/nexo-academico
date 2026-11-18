import { Routes } from "@angular/router";
import { rolGuard } from "./guards/rol.guard";

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    {
        path: "login",
        loadComponent: () => import("./components/login/login.component").then((m) => m.LoginComponent),
    },
    {
        path: "comisiones",
        canActivate: [rolGuard],
        data: { roles: ["ADMIN"] },
        loadComponent: () => import("./components/comisiones/comisiones").then((m) => m.Comisiones),
    },
    {
        path: "asistencia-docente",
        canActivate: [rolGuard],
        data: { roles: ["DOCENTE"] },
        loadComponent: () =>
            import("./components/planilla-asistencia/planilla-asistencia.component").then(
                (m) => m.PlanillaAsistenciaComponent,
            ),
    },
    {
        path: "justificaciones",
        canActivate: [rolGuard],
        data: { roles: ["ALUMNO"] },
        loadComponent: () =>
            import("./components/justificaciones/justificaciones.component").then((m) => m.JustificacionesComponent),
    },
    {
        path: "revision-justificaciones",
        canActivate: [rolGuard],
        data: { roles: ["ADMIN"] },
        loadComponent: () =>
            import("./components/revision-justificaciones/revision-justificaciones.component").then(
                (m) => m.RevisionJustificacionesComponent,
            ),
    },
    { path: "**", redirectTo: "login" },
];
