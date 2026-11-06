import { Routes } from '@angular/router';

export const routes: Routes = [
  // Cada integrante registrará aquí la ruta hacia su componente:
  // Persona 1: { path: 'comisiones', component: ComisionesComponent },
  // Persona 2: { path: 'asistencia-docente', component: AsistenciaDocenteComponent },
  // Persona 3: { path: 'mis-asistencias', component: MisAsistenciasComponent },
  // Persona 4: { path: 'justificaciones', component: JustificacionesComponent },
  // Persona 5: { path: 'revision-justificaciones', component: RevisionJustificacionesComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
];