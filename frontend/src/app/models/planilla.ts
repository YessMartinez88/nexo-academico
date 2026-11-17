export interface AsistenciaPlanilla {
    alumnoId: number;
    estado: string;
}

export interface Planilla {
    claseId: number;
    asistencias: AsistenciaPlanilla[];
}

export interface AsistenciaGuardada {
    id: number;
    clase_id: number;
    alumno_id: number;
    estado: string;
}
