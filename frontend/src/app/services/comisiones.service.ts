import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { ComisionPayload } from "../models/comision";
export interface ComisionApi {
    id: number;
    materia: string;
    docente_id: number;
    ciclo_lectivo: string;
    estado: "BORRADOR" | "ACTIVA" | "CERRADA";
}
@Injectable({ providedIn: "root" })
export class ComisionesService {
    private readonly url = "http://localhost:3000/api/comisiones";
    private readonly http = inject(HttpClient);
    obtenerComisionesService(): Observable<ComisionApi[]> {
        return this.http.get<ComisionApi[]>(this.url);
    }
    crearComisionService(comision: ComisionPayload): Observable<ComisionApi[]> {
        return this.http.post<ComisionApi[]>(this.url, comision);
    }
}
