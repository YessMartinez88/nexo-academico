import { Component, OnInit, inject, signal } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { JustificacionService } from "../../services/justificacion.service";
import { EstadoJustificacion, Justificacion } from "../../models";

const ETIQUETAS_ASISTENCIA: Record<string, string> = {
    A: "Ausente",
    AJ: "Ausente justificado",
    T: "Tarde",
    TJ: "Tarde justificado",
    R: "Retiro anticipado",
    RJ: "Retiro justificado",
    P: "Presente",
};

const CLASE_ESTADO_JUSTIFICACION: Record<string, string> = {
    PENDIENTE: "text-bg-warning",
    APROBADA: "text-bg-success",
    RECHAZADA: "text-bg-danger",
};

@Component({
    selector: "app-revision-justificaciones",
    standalone: true,
    imports: [FormsModule, DatePipe],
    templateUrl: "./revision-justificaciones.component.html",
})
export class RevisionJustificacionesComponent implements OnInit {
    private readonly justificacionService = inject(JustificacionService);

    readonly etiquetas = ETIQUETAS_ASISTENCIA;
    readonly claseEstadoJustificacion = CLASE_ESTADO_JUSTIFICACION;
    readonly filtros: { valor: EstadoJustificacion | null; texto: string }[] = [
        { valor: "PENDIENTE", texto: "Pendientes" },
        { valor: "APROBADA", texto: "Aprobadas" },
        { valor: "RECHAZADA", texto: "Rechazadas" },
        { valor: null, texto: "Todas" },
    ];

    filtro = signal<EstadoJustificacion | null>("PENDIENTE");
    justificaciones = signal<Justificacion[]>([]);
    cargando = signal(false);
    procesandoId = signal<number | null>(null);
    mensajeOk = signal<string | null>(null);
    mensajeError = signal<string | null>(null);

    observaciones: Record<number, string> = {};

    ngOnInit(): void {
        this.cargar();
    }

    cambiarFiltro(valor: EstadoJustificacion | null): void {
        this.filtro.set(valor);
        this.mensajeOk.set(null);
        this.mensajeError.set(null);
        this.cargar();
    }

    cargar(): void {
        this.cargando.set(true);
        this.justificacionService.listar({ estado: this.filtro() ?? undefined }).subscribe({
            next: (lista) => {
                this.justificaciones.set(lista);
                this.cargando.set(false);
            },
            error: () => {
                this.mensajeError.set("No se pudieron obtener las solicitudes. ¿Está corriendo el backend?");
                this.cargando.set(false);
            },
        });
    }

    revisar(j: Justificacion, estado: "APROBADA" | "RECHAZADA"): void {
        const observacion = (this.observaciones[j.id] ?? "").trim();

        if (estado === "RECHAZADA" && !observacion) {
            this.mensajeError.set(`Para rechazar la solicitud de ${j.alumno} escribí una observación.`);
            return;
        }

        this.procesandoId.set(j.id);
        this.mensajeOk.set(null);
        this.mensajeError.set(null);

        this.justificacionService.revisar(j.id, { estado, observacion: observacion || null }).subscribe({
            next: () => {
                const accion = estado === "APROBADA" ? "aprobada" : "rechazada";
                this.mensajeOk.set(`Solicitud de ${j.alumno} ${accion}.`);
                delete this.observaciones[j.id];
                this.procesandoId.set(null);
                this.cargar();
            },
            error: (err: HttpErrorResponse) => {
                this.mensajeError.set(err.error?.mensaje ?? "No se pudo revisar la solicitud.");
                this.procesandoId.set(null);
            },
        });
    }
}
