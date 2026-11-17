import { Component, inject, signal } from '@angular/core';
import { AsistenciaService } from '../../services/asistencia.service';
import { Estudiante } from '../../models/estudiante';
import { ComisionPlanilla } from '../../models/comision-planilla';
import { ClasePlanilla } from '../../models/clase-planilla';

interface FilaPlanilla {
  estudiante: Estudiante,
  estado: string
}

@Component({
  selector: 'app-planilla-asistencia',
  imports: [],
  templateUrl: './planilla-asistencia.component.html',
  styleUrl: './planilla-asistencia.component.css'
})
export class PlanillaAsistenciaComponent {
  private readonly _asistenciaService = inject(AsistenciaService)

  // Datos fijos (copiados de 02_datos_semilla.sql) hasta que exista la API
  readonly comisiones: ComisionPlanilla[] = [
    { id: 1, materia: 'Bases de Datos I' },
    { id: 3, materia: 'Desarrollo Web Frontend' },
    { id: 4, materia: 'Desarrollo Web Backend' }
  ]

  private readonly todasLasClases: ClasePlanilla[] = [
    { id: 3, comisionId: 1, fecha: '17/11/2026' },
    { id: 5, comisionId: 3, fecha: '11/11/2026' }
  ]

  readonly estados = ['P', 'A', 'T', 'R']

  readonly clases = signal<ClasePlanilla[]>([])
  readonly filas = signal<FilaPlanilla[]>([])
  readonly mensaje = signal('')
  readonly guardado = signal(false)

  elegirComision(valor: string): void {
    this.filas.set([])
    this.clases.set([])
    this.mensaje.set('')
    this.guardado.set(false)

    if (valor === '') {
      return
    }

    const comisionId = Number(valor)

    this.clases.set(this.todasLasClases.filter(c => c.comisionId === comisionId))

    this._asistenciaService.obtenerEstudiantesPorComisionService(comisionId).subscribe({
      next: estudiantes => {
        this.filas.set(estudiantes.map(e => ({ estudiante: e, estado: 'P' })))
      },
      error: error => {
        console.log(error)
        this.mensaje.set('No se pudieron cargar los alumnos')
      }
    })
  }

  cambiarEstado(alumnoId: number, estado: string): void {
    this.filas.update(lista =>
      lista.map(f => f.estudiante.id === alumnoId ? { ...f, estado } : f)
    )
  }

  guardarPlanilla(valorClase: string): void {
    if (valorClase === '') {
      this.mensaje.set('Elegí una clase antes de guardar')
      return
    }

    const claseId = Number(valorClase)
    let guardados = 0

    this.guardado.set(true)

    this.filas().forEach(fila => {
      this._asistenciaService.registrarAsistenciaService({
        claseId: claseId,
        alumnoId: fila.estudiante.id,
        estado: fila.estado
      }).subscribe({
        next: () => {
          guardados++
          this.mensaje.set(`Guardados ${guardados} de ${this.filas().length}`)
        },
        error: error => {
          console.log(error)
          this.mensaje.set(`Error al guardar a ${fila.estudiante.apellido}`)
        }
      })
    })
  }
}