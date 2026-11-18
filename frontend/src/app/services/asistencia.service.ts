import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Estudiante } from "../models/estudiante";
import { Planilla, AsistenciaGuardada } from "../models/planilla";

@Injectable({
    providedIn: "root",
})
export class AsistenciaService {
    private _url = "http://localhost:3000/api";
    private readonly _httpClient = inject(HttpClient);

    public obtenerEstudiantesPorComisionService(comisionId: number): Observable<Estudiante[]> {
        return this._httpClient.get<Estudiante[]>(`${this._url}/estudiantes?comisionId=${comisionId}`);
    }

    public guardarPlanillaService(planilla: Planilla): Observable<AsistenciaGuardada[]> {
        return this._httpClient.post<AsistenciaGuardada[]>(`${this._url}/asistencias/planilla`, planilla);
    }
    public obtenerAsistenciasAlumno(idAlumno: number | string): Observable<any> {
        return this._httpClient.get<any>(`${this._url}/asistencias/alumno/${idAlumno}`);
    }
}
