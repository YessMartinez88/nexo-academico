USE sistema_asistencia;
GO

-- 1. Usuarios -------------------------------------------------------------
SET IDENTITY_INSERT usuarios ON;
INSERT INTO usuarios (id, nombre, apellido, email, rol, activo, password_hash) VALUES
( 1, 'Martina',   'Costa',     'adm1@instituto.edu.ar',  'ADMIN',   1, 'Abc123!'),
( 2, 'Laura',     'Méndez',    'doc1@instituto.edu.ar',  'DOCENTE', 1, 'Abc123!'),
( 3, 'Ricardo',   'Paz',       'doc2@instituto.edu.ar',  'DOCENTE', 1, 'Abc123!'),
( 4, 'Ana',       'Torres',    'doc3@instituto.edu.ar',  'DOCENTE', 1, 'Abc123!'),
( 5, 'Sofía',     'Ramírez',   'alu1@instituto.edu.ar',  'ALUMNO',  1, 'Abc123!'),
( 6, 'Lucas',     'Gómez',     'alu2@instituto.edu.ar',  'ALUMNO',  1, 'Abc123!'),
( 7, 'Valentina', 'López',     'alu3@instituto.edu.ar',  'ALUMNO',  1, 'Abc123!'),
( 8, 'Mateo',     'Fernández', 'alu4@instituto.edu.ar',  'ALUMNO',  1, 'Abc123!'),
( 9, 'Camila',    'Díaz',      'alu5@instituto.edu.ar',  'ALUMNO',  1, 'Abc123!'),
(10, 'Tomás',     'Pereyra',   'alu6@instituto.edu.ar',  'ALUMNO',  1, 'Abc123!'),
(11, 'Julieta',   'Sosa',      'alu7@instituto.edu.ar',  'ALUMNO',  1, 'Abc123!'),
(12, 'Nicolás',   'Romero',    'alu8@instituto.edu.ar',  'ALUMNO',  0, 'Abc123!'),  -- INACTIVO
(13, 'Agustina',  'Herrera',   'alu9@instituto.edu.ar',  'ALUMNO',  1, 'Abc123!'),
(14, 'Bruno',     'Acosta',    'alu10@instituto.edu.ar', 'ALUMNO',  1, 'Abc123!');
SET IDENTITY_INSERT usuarios OFF;
GO

-- 2. Comisiones -----------------------------------------------------------
SET IDENTITY_INSERT comisiones ON;
INSERT INTO comisiones (id, materia, docente_id, ciclo_lectivo, estado) VALUES
(1, 'Bases de Datos I',         2, '2026', 'ACTIVA'),    -- docente: Laura Méndez
(2, 'Programación Web II',      2, '2026', 'BORRADOR'),  -- docente: Laura Méndez (sin inscriptos)
(3, 'Desarrollo Web Frontend',  3, '2026', 'ACTIVA'),    -- docente: Ricardo Paz
(4, 'Desarrollo Web Backend',   3, '2026', 'ACTIVA'),    -- docente: Ricardo Paz
(5, 'Ingeniería de Software I', 4, '2025', 'CERRADA');   -- docente: Ana Torres
SET IDENTITY_INSERT comisiones OFF;
GO


INSERT INTO inscripciones_comision (comision_id, alumno_id) VALUES
-- Comisión 1: Bases de Datos I
(1, 5), (1, 6), (1, 7), (1, 8),
(1, 12),                         
-- Comisión 3: Frontend
(3, 5), (3, 9), (3, 10), (3, 11),
-- Comisión 4: Backend
(4, 6), (4, 7), (4, 9), (4, 13), (4, 14),
-- Comisión 5: Ingeniería de Software I
(5, 8), (5, 10);
GO

-- 4. Clases ---------------------------------------------------------------
SET IDENTITY_INSERT clases ON;
INSERT INTO clases (id, comision_id, fecha, cerrada, fecha_cierre) VALUES
(1, 1, '2026-11-03', 1, '2026-11-03T21:00:00'),
(2, 1, '2026-11-10', 1, '2026-11-10T21:00:00'),
(3, 1, '2026-11-17', 0, NULL),                  
(4, 3, '2026-11-04', 1, '2026-11-04T21:00:00'),
(5, 3, '2026-11-11', 0, NULL),                  
(6, 4, '2026-11-05', 1, '2026-11-05T21:00:00'),
(7, 5, '2025-10-15', 1, '2025-10-15T21:00:00');
SET IDENTITY_INSERT clases OFF;
GO


INSERT INTO asistencias (clase_id, alumno_id, estado) VALUES
-- Clase 1: comisión 1, 03/11 (cerrada)
(1, 5, 'P'), (1, 6, 'A'), (1, 7, 'T'), (1, 8, 'P'),
-- Clase 2: comisión 1, 10/11 (cerrada)
(2, 5, 'P'), (2, 6, 'P'), (2, 7, 'R'), (2, 8, 'A'),
-- Clase 4: comisión 3, 04/11 (cerrada)
(4, 5, 'P'), (4, 9, 'T'), (4, 10, 'A'), (4, 11, 'P'),
-- Clase 5: comisión 3, 11/11 (abierta, a medias: Tomás y Julieta sin cargar)
(5, 5, 'P'), (5, 9, 'P'),
-- Clase 6: comisión 4, 05/11 (cerrada)
(6, 6, 'P'), (6, 7, 'P'), (6, 9, 'A'), (6, 13, 'T'), (6, 14, 'R'),
-- Clase 7: comisión 5, 15/10/2025 (cerrada, comisión CERRADA)
(7, 8, 'P'), (7, 10, 'P');
GO

PRINT 'Datos semilla insertados correctamente.';