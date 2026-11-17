import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'asistencia-docente',
    loadComponent: () =>
      import('./components/planilla-asistencia/planilla-asistencia.component')
        .then(m => m.PlanillaAsistenciaComponent)
  },
  {
    path: '**',
    redirectTo: 'login' 
  }
];