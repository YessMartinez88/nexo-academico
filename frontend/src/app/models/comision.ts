export type EstadoComision = "BORRADOR" | "ACTIVA" | "CERRADA";
export interface Comision {
    id: number;
    materia: string;
    docenteId: number;
    cicloLectivo: string;
    estado: EstadoComision;
}
export interface ComisionPayload {
    materia: string;
    docente_id: number | string;
    ciclo_lectivo: string;
    estado: EstadoComision;
}
