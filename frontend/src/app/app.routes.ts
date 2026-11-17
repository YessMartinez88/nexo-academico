
export const routes: Routes = [
  {
    path: 'asistencia-docente',
    loadComponent: () =>
      import('./components/planilla-asistencia/planilla-asistencia.component')
        .then(m => m.PlanillaAsistenciaComponent)
  }
];