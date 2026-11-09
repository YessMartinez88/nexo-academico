export const queries = {
  // Comisiones
  obtenerComisiones: 'SELECT * FROM comisiones ORDER BY creado_en DESC',
  crearComision: `
    INSERT INTO comisiones (id, materia, docente_id, ciclo_lectivo, estado)
    VALUES (@id, @materia, @docenteId, @cicloLectivo, @estado)
  `,

  // Asistencias
  obtenerAsistenciasPorAlumno: `
    SELECT ra.*, c.fecha, c.comision_id
    FROM registros_asistencia ra
    INNER JOIN clases c ON ra.clase_id = c.id
    WHERE ra.alumno_id = @alumnoId
  `,

  // Justificaciones
  crearJustificacion: `
    INSERT INTO justificaciones (id, registro_asistencia_id, alumno_id, motivo, archivo_url)
    VALUES (@id, @registroAsistenciaId, @alumnoId, @motivo, @archivoUrl)
  `,
  revisarJustificacion: `
    UPDATE justificaciones
    SET estado = @estado,
        observacion_admin = @observacionAdmin,
        fecha_revision = GETDATE()
    WHERE id = @id
  `,
};
