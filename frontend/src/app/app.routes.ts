import { Routes } from '@angular/router';
import { MisAsistenciasComponent } from './components/mis-asistencias/mis-asistencias.component';

export const routes: Routes = [
  { path: 'mis-asistencias', component: MisAsistenciasComponent },
  { path: '', redirectTo: 'mis-asistencias', pathMatch: 'full' },
  { path: '**', redirectTo: 'mis-asistencias' }
];