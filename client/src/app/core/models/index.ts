export type RolUsuario = 'ADMIN' | 'DOCENTE' | 'ALUMNO';
export type EstadoComision = 'BORRADOR' | 'ACTIVA' | 'CERRADA';
export type EstadoAsistencia = 'P' | 'A' | 'AJ' | 'T' | 'TJ' | 'R' | 'RJ';
export type EstadoJustificacion = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';

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