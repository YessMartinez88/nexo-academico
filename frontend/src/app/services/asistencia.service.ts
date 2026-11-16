import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante';
import { Asistencia } from '../models/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private _url = 'http://localhost:3000/api'
  private readonly _httpClient = inject(HttpClient)

  public obtenerEstudiantesPorComisionService(comisionId: number): Observable<Estudiante[]> {
    return this._httpClient.get<Estudiante[]>(`${this._url}/estudiantes?comisionId=${comisionId}`)
  }

  public registrarAsistenciaService(asistencia: Asistencia): Observable<Asistencia> {
    return this._httpClient.post<Asistencia>(`${this._url}/asistencias`, asistencia)
  }
}