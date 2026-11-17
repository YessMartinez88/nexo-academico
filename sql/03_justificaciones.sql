-- Ejecutar despues de 01_crear_base_datos.sql y 02_datos_semilla.sql

SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

USE sistema_asistencia;
GO

-- se agregan los estados justificados (AJ, TJ, RJ) al check de asistencias
DECLARE @ck SYSNAME;

SELECT @ck = cc.name
FROM sys.check_constraints cc
INNER JOIN sys.columns c
    ON c.object_id = cc.parent_object_id
   AND c.column_id = cc.parent_column_id
WHERE cc.parent_object_id = OBJECT_ID('asistencias')
  AND c.name = 'estado';

IF @ck IS NOT NULL
    EXEC('ALTER TABLE asistencias DROP CONSTRAINT ' + @ck);
GO

ALTER TABLE asistencias
    ADD CONSTRAINT CK_asistencias_estado
    CHECK (estado IN ('P', 'A', 'AJ', 'T', 'TJ', 'R', 'RJ'));
GO

IF OBJECT_ID('justificaciones', 'U') IS NOT NULL
    DROP TABLE justificaciones;
GO

CREATE TABLE justificaciones (
    id                INT IDENTITY(1,1) PRIMARY KEY,
    asistencia_id     INT           NOT NULL,
    alumno_id         INT           NOT NULL,
    motivo            VARCHAR(500)  NOT NULL,
    archivo_url       VARCHAR(500)  NULL,
    estado            VARCHAR(20)   NOT NULL DEFAULT 'PENDIENTE'
                      CHECK (estado IN ('PENDIENTE', 'APROBADA', 'RECHAZADA')),
    observacion_admin VARCHAR(500)  NULL,
    fecha_solicitud   DATETIME2     NOT NULL DEFAULT SYSDATETIME(),
    fecha_revision    DATETIME2     NULL,
    CONSTRAINT FK_justificaciones_asistencia FOREIGN KEY (asistencia_id) REFERENCES asistencias(id),
    CONSTRAINT FK_justificaciones_alumno     FOREIGN KEY (alumno_id)     REFERENCES usuarios(id)
);
GO

-- una asistencia no puede tener dos solicitudes pendientes o aprobadas
CREATE UNIQUE INDEX UX_justificaciones_asistencia_activa
    ON justificaciones (asistencia_id)
    WHERE estado IN ('PENDIENTE', 'APROBADA');
GO

-- datos de prueba
INSERT INTO justificaciones (asistencia_id, alumno_id, motivo, archivo_url)
SELECT a.id, a.alumno_id, 'Turno médico programado', 'https://drive.example.com/certificado-lucas.pdf'
FROM asistencias a
WHERE a.clase_id = 1 AND a.alumno_id = 6;

INSERT INTO justificaciones (asistencia_id, alumno_id, motivo, archivo_url)
SELECT a.id, a.alumno_id, 'Paro de transporte (línea 60)', NULL
FROM asistencias a
WHERE a.clase_id = 1 AND a.alumno_id = 7;
GO

PRINT 'Tabla justificaciones creada y estados AJ/TJ/RJ habilitados con exito.';
