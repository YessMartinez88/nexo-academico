USE master;
GO

IF EXISTS (SELECT name FROM sys.databases WHERE name = N'sistema_asistencia')
BEGIN
    ALTER DATABASE sistema_asistencia SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE sistema_asistencia;
END;
GO


CREATE DATABASE sistema_asistencia;
GO

USE sistema_asistencia;
GO

CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('ADMIN', 'DOCENTE', 'ALUMNO')),
    activo BIT NOT NULL DEFAULT 1,
    password_hash VARCHAR(255) NOT NULL
);
GO


CREATE TABLE comisiones (
    id INT IDENTITY(1,1) PRIMARY KEY,
    materia VARCHAR(100) NOT NULL,
    docente_id INT NOT NULL,
    ciclo_lectivo VARCHAR(10) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'BORRADOR' CHECK (estado IN ('BORRADOR', 'ACTIVA', 'CERRADA')),
    creado_en DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT FK_comisiones_docente FOREIGN KEY (docente_id) REFERENCES usuarios(id)
);
GO


CREATE TABLE inscripciones_comision (
    id INT IDENTITY(1,1) PRIMARY KEY,
    comision_id INT NOT NULL,
    alumno_id INT NOT NULL,
    CONSTRAINT UQ_comision_alumno UNIQUE (comision_id, alumno_id),
    CONSTRAINT FK_inscripciones_comision FOREIGN KEY (comision_id) REFERENCES comisiones(id),
    CONSTRAINT FK_inscripciones_alumno FOREIGN KEY (alumno_id) REFERENCES usuarios(id)
);
GO


CREATE TABLE clases (
    id INT IDENTITY(1,1) PRIMARY KEY,
    comision_id INT NOT NULL,
    fecha DATE NOT NULL,
    cerrada BIT NOT NULL DEFAULT 0,
    fecha_cierre DATETIME2 NULL,
    CONSTRAINT UQ_clase_comision_fecha UNIQUE (comision_id, fecha),
    CONSTRAINT FK_clases_comision FOREIGN KEY (comision_id) REFERENCES comisiones(id)
);
GO


CREATE TABLE asistencias (
    id INT IDENTITY(1,1) PRIMARY KEY,
    clase_id INT NOT NULL,
    alumno_id INT NOT NULL,
    estado VARCHAR(5) NOT NULL CHECK (estado IN ('P', 'A', 'T', 'R')),
    CONSTRAINT UQ_asistencia_clase_alumno UNIQUE (clase_id, alumno_id),
    CONSTRAINT FK_asistencias_clase FOREIGN KEY (clase_id) REFERENCES clases(id),
    CONSTRAINT FK_asistencias_alumno FOREIGN KEY (alumno_id) REFERENCES usuarios(id)
);
GO

PRINT 'Base sistema_asistencia reseteada y creada desde cero con exito.';
