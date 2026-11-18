import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import {
    AsistenciaJustificable,
    EstadoJustificacion,
    Justificacion,
    NuevaJustificacion,
    RevisionJustificacion,
    Usuario,
} from "../models";

@Injectable({ providedIn: "root" })
export class JustificacionService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "http://localhost:3000/api";

    listar(filtros: { estado?: EstadoJustificacion; alumnoId?: number } = {}): Observable<Justificacion[]> {
        let params = new HttpParams();
        if (filtros.estado) params = params.set("estado", filtros.estado);
        if (filtros.alumnoId) params = params.set("alumnoId", filtros.alumnoId);
        return this.http.get<Justificacion[]>(`${this.apiUrl}/justificaciones`, { params });
    }

    obtenerJustificables(alumnoId: number): Observable<AsistenciaJustificable[]> {
        return this.http.get<AsistenciaJustificable[]>(`${this.apiUrl}/justificaciones/justificables/${alumnoId}`);
    }

    crear(datos: NuevaJustificacion): Observable<Justificacion> {
        return this.http.post<Justificacion>(`${this.apiUrl}/justificaciones`, datos);
    }

    revisar(id: number, revision: RevisionJustificacion): Observable<Justificacion> {
        return this.http.patch<Justificacion>(`${this.apiUrl}/justificaciones/${id}/revisar`, revision);
    }

    // por ahora se elige el alumno de una lista, despues va el usuario logueado
    obtenerAlumnos(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(`${this.apiUrl}/estudiantes`);
    }
}
