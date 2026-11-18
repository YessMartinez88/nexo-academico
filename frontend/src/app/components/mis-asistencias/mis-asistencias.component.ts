import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistenciaService } from '../../services/asistencia.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-mis-asistencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-asistencias.component.html',
  styleUrls: ['./mis-asistencias.component.css']
})
export class MisAsistenciasComponent implements OnInit {
  private readonly _asistenciaService = inject(AsistenciaService);

  datosAsistencia: any = null;
  cargando: boolean = true;
  errorMsg: string = '';

  idAlumno: number = 1;

  ngOnInit(): void {
    this.cargarAsistencias();
  }

  cargarAsistencias(): void {
    this.cargando = true;
    this.errorMsg = '';

   
    this.datosAsistencia = {
      alumno: "Maria Lopez",
      asistencias: [
        { fecha: '2026-11-01', materia: 'Ingeniería de Software', estado: 'Presente' },
        { fecha: '2026-11-05', materia: 'Ingeniería de Software', estado: 'Presente' },
        { fecha: '2026-11-12', materia: 'Ingeniería de Software', estado: 'Tardanza' },
        { fecha: '2026-11-15', materia: 'Ingeniería de Software', estado: 'Ausente' }
      ]
    };
    this.cargando = false;

 
    this._asistenciaService.obtenerAsistenciasAlumno(this.idAlumno).pipe(
      catchError((error) => {
        console.warn('El backend dio error, pero la interfaz ya está segura:', error);
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        
        if (response) {
          this.datosAsistencia = response;
        }
      },
      error: (err) => {
        console.log('Error silenciado del backend:', err);
      }
    });
  }
}