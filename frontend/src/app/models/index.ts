export type RolUsuario = "ADMIN" | "DOCENTE" | "ALUMNO";
export type EstadoComision = "BORRADOR" | "ACTIVA" | "CERRADA";
export type EstadoAsistencia = "P" | "A" | "AJ" | "T" | "TJ" | "R" | "RJ";
export type EstadoJustificacion = "PENDIENTE" | "APROBADA" | "RECHAZADA";

export interface Usuario {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    rol: RolUsuario;
}

export interface Comision {
    id: string;
    materia: string;
    docenteId: string;
    cicloLectivo: string;
    estado: EstadoComision;
}

export interface AsistenciaJustificable {
    asistenciaId: number;
    estado: "A" | "T" | "R";
    claseId: number;
    fecha: string;
    comisionId: number;
    materia: string;
}

export interface Justificacion {
    id: number;
    asistenciaId: number;
    alumnoId: number;
    alumno: string;
    motivo: string;
    archivoUrl: string | null;
    estado: EstadoJustificacion;
    observacionAdmin: string | null;
    fechaSolicitud: string;
    fechaRevision: string | null;
    estadoAsistencia: EstadoAsistencia;
    fechaClase: string;
    materia: string;
}

export interface NuevaJustificacion {
    asistenciaId: number;
    alumnoId: number;
    motivo: string;
    archivoUrl?: string | null;
}

export interface RevisionJustificacion {
    estado: "APROBADA" | "RECHAZADA";
    observacion?: string | null;
}

export interface Feriado {
    fecha: string;
    tipo: string;
    nombre: string;
}
