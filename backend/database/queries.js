const queries = {
  // Comisiones
  obtenerComisiones: 'SELECT * FROM comisiones ORDER BY creado_en DESC',
  crearComision: `
    INSERT INTO comisiones (materia, docente_id, ciclo_lectivo, estado)
    VALUES (@materia, @docenteId, @cicloLectivo, @estado)
  `,

  // Asistencias
  obtenerAsistenciasPorAlumno: `
    SELECT a.*, c.fecha, c.comision_id
    FROM asistencias a
    INNER JOIN clases c ON a.clase_id = c.id
    WHERE a.alumno_id = @alumnoId
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


  /**
   *   --------   QUERYS ESTUDIANTES  ----------------
   */
  obtenerEstudiantes: `   
    SELECT id, nombre, apellido, email, rol, activo
    FROM usuarios
    WHERE 
      rol = 'ALUMNO' AND activo = 1
    ORDER BY apellido, nombre
  `,

  obtenerEstudiantePorId:
    `
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
  `

};

module.exports = { queries };
