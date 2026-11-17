const queries = {
    obtenerComisiones: "SELECT * FROM comisiones ORDER BY creado_en DESC",
    crearComision: `
    INSERT INTO comisiones (materia, docente_id, ciclo_lectivo, estado)
    VALUES (@materia, @docenteId, @cicloLectivo, @estado)
  `,

    obtenerAsistenciasPorAlumno: `
    SELECT a.*, c.fecha, c.comision_id
    FROM asistencias a
    INNER JOIN clases c ON a.clase_id = c.id
    WHERE a.alumno_id = @alumnoId
  `,

    obtenerAsistenciasJustificables: `
    SELECT a.id AS asistenciaId, a.estado, c.id AS claseId, c.fecha,
           co.id AS comisionId, co.materia
    FROM asistencias a
    INNER JOIN clases c      ON c.id = a.clase_id
    INNER JOIN comisiones co ON co.id = c.comision_id
    WHERE a.alumno_id = @alumnoId
      AND a.estado IN ('A', 'T', 'R')
      AND NOT EXISTS (
        SELECT 1 FROM justificaciones j
        WHERE j.asistencia_id = a.id
          AND j.estado IN ('PENDIENTE', 'APROBADA')
      )
    ORDER BY c.fecha DESC
  `,

    obtenerAsistenciaPorId: `
    SELECT a.id, a.alumno_id AS alumnoId, a.estado,
           (SELECT COUNT(*) FROM justificaciones j
            WHERE j.asistencia_id = a.id
              AND j.estado IN ('PENDIENTE', 'APROBADA')) AS solicitudesActivas
    FROM asistencias a
    WHERE a.id = @asistenciaId
  `,

    crearJustificacion: `
    INSERT INTO justificaciones (asistencia_id, alumno_id, motivo, archivo_url)
    OUTPUT INSERTED.id
    VALUES (@asistenciaId, @alumnoId, @motivo, @archivoUrl)
  `,

    listarJustificaciones: `
    SELECT j.id, j.asistencia_id AS asistenciaId, j.alumno_id AS alumnoId,
           u.nombre + ' ' + u.apellido AS alumno,
           j.motivo, j.archivo_url AS archivoUrl, j.estado,
           j.observacion_admin AS observacionAdmin,
           j.fecha_solicitud AS fechaSolicitud, j.fecha_revision AS fechaRevision,
           a.estado AS estadoAsistencia, c.fecha AS fechaClase, co.materia
    FROM justificaciones j
    INNER JOIN usuarios u    ON u.id = j.alumno_id
    INNER JOIN asistencias a ON a.id = j.asistencia_id
    INNER JOIN clases c      ON c.id = a.clase_id
    INNER JOIN comisiones co ON co.id = c.comision_id
  `,

    revisarJustificacion: `
    UPDATE justificaciones
    SET estado = @estado,
        observacion_admin = @observacionAdmin,
        fecha_revision = SYSDATETIME()
    OUTPUT INSERTED.id, INSERTED.asistencia_id AS asistenciaId, INSERTED.estado
    WHERE id = @id AND estado = 'PENDIENTE'
  `,

    marcarAsistenciaJustificada: `
    UPDATE asistencias
    SET estado = estado + 'J'
    WHERE id = @asistenciaId AND estado IN ('A', 'T', 'R')
  `,

    obtenerUsuarioPorEmail: `
  SELECT
    id,
    nombre,
    apellido,
    email,
    rol,
    activo,
    password_hash
  FROM usuarios
  WHERE email = @email
`,

    obtenerEstudiantes: `
    SELECT id, nombre, apellido, email, rol, activo
    FROM usuarios
    WHERE
      rol = 'ALUMNO' AND activo = 1
    ORDER BY apellido, nombre
  `,

    obtenerEstudiantePorId: `
    SELECT id, nombre, apellido, email, rol, activo
    FROM usuarios
    WHERE
      id = @id AND rol = 'ALUMNO'
  `,

    obtenerEstudiantesPorComision: `
    SELECT u.id, u.nombre, u.apellido, u.email, u.rol, u.activo
    FROM inscripciones_comision i
    INNER JOIN usuarios u ON u.id = i.alumno_id
    WHERE
      i.comision_id = @comisionId
      AND u.activo = 1
    ORDER BY u.apellido, u.nombre
  `,

    crearAsistencia: `
    INSERT INTO asistencias (clase_id, alumno_id, estado)
    OUTPUT INSERTED.id, INSERTED.clase_id, INSERTED.alumno_id, INSERTED.estado
    VALUES (@claseId, @alumnoId, @estado)
  `,
};

module.exports = { queries };
