import { Component, inject, signal } from "@angular/core";
import { AsistenciaService } from "../../services/asistencia.service";
import { Estudiante } from "../../models/estudiante";
import { ComisionPlanilla } from "../../models/comision-planilla";
import { ClasePlanilla } from "../../models/clase-planilla";
import { Planilla } from "../../models/planilla";

interface FilaPlanilla {
    estudiante: Estudiante;
    estado: string;
}

@Component({
    selector: "app-planilla-asistencia",
    imports: [],
    templateUrl: "./planilla-asistencia.component.html",
    styleUrl: "./planilla-asistencia.component.css",
})
export class PlanillaAsistenciaComponent {
    private readonly _asistenciaService = inject(AsistenciaService);

    readonly comisiones: ComisionPlanilla[] = [
        { id: 1, materia: "Bases de Datos I" },
        { id: 3, materia: "Desarrollo Web Frontend" },
        { id: 4, materia: "Desarrollo Web Backend" },
    ];

    private readonly todasLasClases: ClasePlanilla[] = [
        { id: 3, comisionId: 1, fecha: "17/11/2026" },
        { id: 5, comisionId: 3, fecha: "11/11/2026" },
    ];

    readonly estados = ["P", "A", "T", "R"];

    readonly clases = signal<ClasePlanilla[]>([]);
    readonly filas = signal<FilaPlanilla[]>([]);
    readonly mensaje = signal("");
    readonly guardando = signal(false);

    elegirComision(valor: string): void {
        this.filas.set([]);
        this.clases.set([]);
        this.mensaje.set("");
        this.guardando.set(false);

        if (valor === "") {
            return;
        }

        const comisionId = Number(valor);

        this.clases.set(this.todasLasClases.filter((c) => c.comisionId === comisionId));

        this._asistenciaService.obtenerEstudiantesPorComisionService(comisionId).subscribe({
            next: (estudiantes) => {
                this.filas.set(estudiantes.map((e) => ({ estudiante: e, estado: "P" })));
            },
            error: (error) => {
                console.log(error);
                this.mensaje.set("No se pudieron cargar los alumnos");
            },
        });
    }

    cambiarEstado(alumnoId: number, estado: string): void {
        this.filas.update((lista) => lista.map((f) => (f.estudiante.id === alumnoId ? { ...f, estado } : f)));
    }

    guardarPlanilla(valorClase: string): void {
        if (valorClase === "") {
            this.mensaje.set("Elegí una clase antes de guardar");
            return;
        }

        const planilla: Planilla = {
            claseId: Number(valorClase),
            asistencias: this.filas().map((f) => ({ alumnoId: f.estudiante.id, estado: f.estado })),
        };

        this.guardando.set(true);

        this._asistenciaService.guardarPlanillaService(planilla).subscribe({
            next: (guardadas) => {
                this.guardando.set(false);
                this.mensaje.set(`Planilla guardada: ${guardadas.length} alumnos`);
            },
            error: (error) => {
                console.log(error);
                this.guardando.set(false);
                this.mensaje.set("No se pudo guardar la planilla");
            },
        });
    }
}
