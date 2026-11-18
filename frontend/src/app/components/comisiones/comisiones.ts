import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Comision, EstadoComision } from "../../models/comision";
import { ComisionesService, ComisionApi } from "../../services/comisiones.service";
@Component({
    selector: "app-comisiones",
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: "./comisiones.html",
    styleUrl: "./comisiones.css",
})
export class Comisiones {
    private readonly service = inject(ComisionesService);
    private readonly builder = inject(FormBuilder);
    readonly comisiones = signal<Comision[]>([]);
    readonly mensaje = signal("");
    readonly filtro = this.builder.nonNullable.control("");
    readonly estadoFiltro = this.builder.nonNullable.control("TODOS");
    readonly formulario = this.builder.nonNullable.group({
        materia: ["", [Validators.required, Validators.minLength(2)]],
        docente_id: [0, Validators.required],
        ciclo_lectivo: ["", [Validators.required, Validators.pattern("^[0-9]{4}$")]],
        estado: ["BORRADOR" as EstadoComision, Validators.required],
    });
    ngOnInit(): void {
        this.obtenerComisiones();
    }
    private convertir(comision: ComisionApi): Comision {
        return {
            id: Number(comision.id),
            materia: comision.materia,
            docenteId: Number(comision.docente_id),
            cicloLectivo: comision.ciclo_lectivo,
            estado: comision.estado,
        };
    }
    obtenerComisiones(): void {
        this.service.obtenerComisionesService().subscribe({
            next: (data) => {
                this.comisiones.set(data.map((item) => this.convertir(item)));
                this.mensaje.set("");
            },
            error: () => this.mensaje.set("No se pudieron cargar las comisiones."),
        });
    }
    get comisionesFiltradas(): Comision[] {
        const texto = this.filtro.value.toLowerCase();
        const estado = this.estadoFiltro.value;
        return this.comisiones().filter(
            (c) =>
                (!texto ||
                    String(c.id).includes(texto) ||
                    c.materia.toLowerCase().includes(texto) ||
                    String(c.docenteId).includes(texto) ||
                    c.cicloLectivo.includes(texto)) &&
                (estado === "TODOS" || c.estado === estado),
        );
    }
    guardarComision(): void {
        if (this.formulario.invalid) {
            this.formulario.markAllAsTouched();
            return;
        }
        this.service.crearComisionService(this.formulario.getRawValue()).subscribe({
            next: () => {
                this.mensaje.set("Comisión creada.");
                this.limpiarFormulario();
                this.obtenerComisiones();
            },
            error: () => this.mensaje.set("No se pudo crear la comisión."),
        });
    }
    limpiarFormulario(): void {
        this.formulario.reset({ materia: "", docente_id: 0, ciclo_lectivo: "", estado: "BORRADOR" });
    }
}
