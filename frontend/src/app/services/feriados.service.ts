import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of, shareReplay } from "rxjs";
import { Feriado } from "../models";

// si la api de feriados no responde devuelve una lista vacia
@Injectable({ providedIn: "root" })
export class FeriadosService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "https://api.argentinadatos.com/v1/feriados";

    private readonly cache = new Map<number, Observable<Feriado[]>>();

    obtenerFeriados(anio: number): Observable<Feriado[]> {
        if (!this.cache.has(anio)) {
            const pedido$ = this.http.get<Feriado[]>(`${this.apiUrl}/${anio}`).pipe(
                catchError((error) => {
                    console.warn(`[FeriadosService] No se pudieron obtener los feriados de ${anio}`, error);
                    this.cache.delete(anio);
                    return of([]);
                }),
                shareReplay(1),
            );
            this.cache.set(anio, pedido$);
        }
        return this.cache.get(anio)!;
    }

    buscarFeriado(fecha: string): Observable<Feriado | null> {
        const dia = fecha.substring(0, 10);
        const anio = Number(dia.substring(0, 4));
        return this.obtenerFeriados(anio).pipe(map((feriados) => feriados.find((f) => f.fecha === dia) ?? null));
    }
}
