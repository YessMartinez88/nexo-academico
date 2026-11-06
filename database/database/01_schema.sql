-- Nexo-Academico: Esquema Inicial de Base de Datos (SQL Server)

-- 1. Tabla de Usuarios
CREATE TABLE usuarios (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('ADMIN', 'DOCENTE', 'ALUMNO')),
    activo BIT DEFAULT 1,
    creado_en DATETIME DEFAULT GETDATE()
);

-- 2. Tabla de Comisiones
CREATE TABLE comisiones (
    id VARCHAR(50) PRIMARY KEY,
    materia VARCHAR(150) NOT NULL,
    docente_id VARCHAR(50) NOT NULL FOREIGN KEY REFERENCES usuarios(id),
    ciclo_lectivo VARCHAR(10) NOT NULL,
    estado VARCHAR(20) DEFAULT 'BORRADOR' CHECK (estado IN ('BORRADOR', 'ACTIVA', 'CERRADA')),
    creado_en DATETIME DEFAULT GETDATE()
);

-- 3. Tabla de Inscripciones a Comisiones
CREATE TABLE inscripciones_comision (
    id INT IDENTITY(1,1) PRIMARY KEY,
    comision_id VARCHAR(50) NOT NULL FOREIGN KEY REFERENCES comisiones(id),
    alumno_id VARCHAR(50) NOT NULL FOREIGN KEY REFERENCES usuarios(id),
    creado_en DATETIME DEFAULT GETDATE(),
    CONSTRAINT UQ_Comision_Alumno UNIQUE (comision_id, alumno_id)
);

-- 4. Tabla de Clases (Sesiones)
CREATE TABLE clases (
    id INT IDENTITY(1,1) PRIMARY KEY,
    comision_id VARCHAR(50) NOT NULL FOREIGN KEY REFERENCES comisiones(id),
    fecha DATE NOT NULL,
    cerrada BIT DEFAULT 0,
    creado_en DATETIME DEFAULT GETDATE(),
    CONSTRAINT UQ_Comision_Fecha UNIQUE (comision_id, fecha)
);

-- 5. Tabla de Registros de Asistencia
CREATE TABLE registros_asistencia (
    id VARCHAR(50) PRIMARY KEY,
    clase_id INT NOT NULL FOREIGN KEY REFERENCES clases(id),
    alumno_id VARCHAR(50) NOT NULL FOREIGN KEY REFERENCES usuarios(id),
    estado VARCHAR(5) NOT NULL CHECK (estado IN ('P', 'A', 'AJ', 'T', 'TJ', 'R', 'RJ')),
    creado_en DATETIME DEFAULT GETDATE(),
    CONSTRAINT UQ_Clase_Alumno UNIQUE (clase_id, alumno_id)
);

-- 6. Tabla de Justificaciones
CREATE TABLE justificaciones (
    id VARCHAR(50) PRIMARY KEY,
    registro_asistencia_id VARCHAR(50) NOT NULL FOREIGN KEY REFERENCES registros_asistencia(id),
    alumno_id VARCHAR(50) NOT NULL FOREIGN KEY REFERENCES usuarios(id),
    motivo VARCHAR(500) NOT NULL,
    archivo_url VARCHAR(255) NULL,
    estado VARCHAR(20) DEFAULT 'PENDIENTE' CHECK (estado IN ('PENDIENTE', 'APROBADA', 'RECHAZADA')),
    observacion_admin VARCHAR(500) NULL,
    fecha_solicitud DATETIME DEFAULT GETDATE(),
    fecha_revision DATETIME NULL
);