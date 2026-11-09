USE master;
GO

-- 1. Forzar el cierre de todas las conexiones activas a la base y eliminarla(lo uso porque probando me generaba errores despues de los cambios)
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'sistema_asistencia')
BEGIN
    ALTER DATABASE sistema_asistencia SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE sistema_asistencia;
END;
GO

-- 2. Crear la base limpia
CREATE DATABASE sistema_asistencia;
GO

USE sistema_asistencia;
GO

-- 3. Tabla Usuarios
CREATE TABLE usuarios (
    id VARCHAR(50) NOT NULL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('ADMIN', 'DOCENTE', 'ALUMNO')),
    activo BIT NOT NULL DEFAULT 1,
    password_hash VARCHAR(255) NOT NULL
);
GO

-- 4. Tabla Comisiones
CREATE TABLE comisiones (
    id VARCHAR(50) NOT NULL PRIMARY KEY,
    materia VARCHAR(100) NOT NULL,
    docente_id VARCHAR(50) NOT NULL,
    ciclo_lectivo VARCHAR(10) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'BORRADOR' CHECK (estado IN ('BORRADOR', 'ACTIVA', 'CERRADA')),
    CONSTRAINT FK_comisiones_docente FOREIGN KEY (docente_id) REFERENCES usuarios(id)
);
GO

-- 5. Tabla Inscripciones por Comisión
CREATE TABLE inscripciones_comision (
    id INT IDENTITY(1,1) PRIMARY KEY,
    comision_id VARCHAR(50) NOT NULL,
    alumno_id VARCHAR(50) NOT NULL,
    CONSTRAINT UQ_comision_alumno UNIQUE (comision_id, alumno_id),
    CONSTRAINT FK_inscripciones_comision FOREIGN KEY (comision_id) REFERENCES comisiones(id),
    CONSTRAINT FK_inscripciones_alumno FOREIGN KEY (alumno_id) REFERENCES usuarios(id)
);
GO

-- 6. Tabla Asistencias
CREATE TABLE asistencias (
    id INT IDENTITY(1,1) PRIMARY KEY,
    comision_id VARCHAR(50) NOT NULL,
    alumno_id VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    estado VARCHAR(5) NOT NULL CHECK (estado IN ('P', 'A', 'T', 'R')),
    CONSTRAINT UQ_asistencia_registro UNIQUE (comision_id, alumno_id, fecha),
    CONSTRAINT FK_asistencias_comision FOREIGN KEY (comision_id) REFERENCES comisiones(id),
    CONSTRAINT FK_asistencias_alumno FOREIGN KEY (alumno_id) REFERENCES usuarios(id)
);
GO

PRINT 'Base sistema_asistencia reseteada y creada desde cero con exito.';