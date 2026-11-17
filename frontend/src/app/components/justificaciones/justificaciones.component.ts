import { Component, OnInit, inject, signal } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { forkJoin } from "rxjs";
import { JustificacionService } from "../../services/justificacion.service";
import { FeriadosService } from "../../services/feriados.service";
import { AuthService } from "../../services/auth.service";
import { AsistenciaJustificable, Justificacion, Usuario } from "../../models";

const ETIQUETAS_ESTADO: Record<string, string> = {
    A: "Ausente",
    AJ: "Ausente justificado",
    T: "Tarde",
    TJ: "Tarde justificado",
    R: "Retiro anticipado",
    RJ: "Retiro justificado",
    P: "Presente",
};

const CLASE_ESTADO_ASISTENCIA: Record<string, string> = {
    A: "text-bg-danger",
    T: "text-bg-warning",
    R: "text-bg-warning",
    AJ: "text-bg-secondary",
    TJ: "text-bg-secondary",
    RJ: "text-bg-secondary",
    P: "text-bg-success",
};

const CLASE_ESTADO_JUSTIFICACION: Record<string, string> = {
    PENDIENTE: "text-bg-warning",
    APROBADA: "text-bg-success",
    RECHAZADA: "text-bg-danger",
};

@Component({
    selector: "app-justificaciones",
    standalone: true,
    imports: [ReactiveFormsModule, DatePipe],
    templateUrl: "./justificaciones.component.html",
})
export class JustificacionesComponent implements OnInit {
    private readonly justificacionService = inject(JustificacionService);
    private readonly feriadosService = inject(FeriadosService);
    private readonly authService = inject(AuthService);
    private readonly fb = inject(FormBuilder);

    readonly etiquetas = ETIQUETAS_ESTADO;
    readonly claseEstadoAsistencia = CLASE_ESTADO_ASISTENCIA;
    readonly claseEstadoJustificacion = CLASE_ESTADO_JUSTIFICACION;

    alumnos = signal<Usuario[]>([]);
    alumnoId = signal<number | null>(null);
    alumnoLogueado = signal<Usuario | null>(null);
    justificables = signal<AsistenciaJustificable[]>([]);
    solicitudes = signal<Justificacion[]>([]);
    feriados = signal<Map<string, string>>(new Map());

    cargando = signal(false);
    enviando = signal(false);
    mensajeOk = signal<string | null>(null);
    mensajeError = signal<string | null>(null);

    form = this.fb.nonNullable.group({
        asistenciaId: [0, [Validators.required, Validators.min(1)]],
        motivo: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
        archivoUrl: ["", [Validators.maxLength(500), Validators.pattern(/^https?:\/\/\S+$/)]],
    });

    ngOnInit(): void {
        const usuario = this.authService.obtenerUsuarioActualService();
        if (usuario && usuario.rol === "ALUMNO") {
            this.alumnoLogueado.set(usuario);
            this.seleccionarAlumno(String(usuario.id));
            return;
        }

        this.justificacionService.obtenerAlumnos().subscribe({
            next: (alumnos) => this.alumnos.set(alumnos),
            error: () => this.mensajeError.set("No se pudo obtener la lista de alumnos. ¿Está corriendo el backend?"),
        });
    }

    seleccionarAlumno(valor: string): void {
        const id = Number(valor) || null;
        this.alumnoId.set(id);
        this.form.reset();
        this.mensajeOk.set(null);
        this.mensajeError.set(null);
        if (id) this.cargarDatosAlumno(id);
    }

    private cargarDatosAlumno(alumnoId: number): void {
        this.cargando.set(true);
        forkJoin({
            justificables: this.justificacionService.obtenerJustificables(alumnoId),
            solicitudes: this.justificacionService.listar({ alumnoId }),
        }).subscribe({
            next: ({ justificables, solicitudes }) => {
                this.justificables.set(justificables);
                this.solicitudes.set(solicitudes);
                this.cargarFeriados(justificables);
                this.cargando.set(false);
            },
            error: () => {
                this.mensajeError.set("No se pudieron obtener las asistencias del alumno.");
                this.cargando.set(false);
            },
        });
    }

    private cargarFeriados(asistencias: AsistenciaJustificable[]): void {
        const anios = [...new Set(asistencias.map((a) => Number(a.fecha.substring(0, 4))))];
        if (!anios.length) return;

        forkJoin(anios.map((anio) => this.feriadosService.obtenerFeriados(anio))).subscribe((listas) => {
            const mapa = new Map<string, string>();
            listas.flat().forEach((f) => mapa.set(f.fecha, f.nombre));
            this.feriados.set(mapa);
        });
    }

    feriadoDe(fecha: string): string | undefined {
        return this.feriados().get(fecha.substring(0, 10));
    }

    enviar(): void {
        const alumnoId = this.alumnoId();
        if (this.form.invalid || !alumnoId) {
            this.form.markAllAsTouched();
            return;
        }

        const { asistenciaId, motivo, archivoUrl } = this.form.getRawValue();
        this.enviando.set(true);
        this.mensajeOk.set(null);
        this.mensajeError.set(null);

        this.justificacionService.crear({ asistenciaId, alumnoId, motivo, archivoUrl: archivoUrl || null }).subscribe({
            next: () => {
                this.mensajeOk.set("Solicitud enviada. Queda pendiente de revisión administrativa.");
                this.form.reset();
                this.enviando.set(false);
                this.cargarDatosAlumno(alumnoId);
            },
            error: (err: HttpErrorResponse) => {
                this.mensajeError.set(err.error?.mensaje ?? "No se pudo enviar la solicitud.");
                this.enviando.set(false);
            },
        });
    }

    campoInvalido(campo: "asistenciaId" | "motivo" | "archivoUrl"): boolean {
        const control = this.form.controls[campo];
        return control.invalid && control.touched;
    }
}
