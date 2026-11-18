import { Routes } from "@angular/router";
export const routes: Routes = [
    { path: "", redirectTo: "comisiones", pathMatch: "full" },
    { path: "comisiones", loadComponent: () => import("./components/comisiones/comisiones").then((m) => m.Comisiones) },
    {
        path: "asistencia-docente",
        loadComponent: () =>
            import("./components/planilla-asistencia/planilla-asistencia.component").then(
                (m) => m.PlanillaAsistenciaComponent,
            ),
    },
    {
        path: "justificaciones",
        loadComponent: () =>
            import("./components/justificaciones/justificaciones.component").then((m) => m.JustificacionesComponent),
    },
    {
        path: "revision-justificaciones",
        loadComponent: () =>
            import("./components/revision-justificaciones/revision-justificaciones.component").then(
                (m) => m.RevisionJustificacionesComponent,
            ),
    },
    { path: "**", redirectTo: "comisiones" },
];
