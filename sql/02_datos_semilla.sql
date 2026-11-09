USE sistema_asistencia;
GO

-- 1. Carga de Usuarios
INSERT INTO usuarios (id, nombre, apellido, email, rol, activo, password_hash) VALUES
('adm1', 'Martina', 'Costa',   'adm1@instituto.edu.ar', 'ADMIN',   1, 'Abc123!'),
('doc1', 'Laura',   'Méndez',  'doc1@instituto.edu.ar', 'DOCENTE', 1, 'Abc123!'),
('alu1', 'Sofía',   'Ramírez', 'alu1@instituto.edu.ar', 'ALUMNO',  1, 'Abc123!'),
('alu2', 'Lucas',   'Gómez',   'alu2@instituto.edu.ar', 'ALUMNO',  1, 'Abc123!');
GO

-- 2. Carga de Comisiones
INSERT INTO comisiones (id, materia, docente_id, ciclo_lectivo, estado) VALUES
('com-bd1',   'Bases de Datos I',   'doc1', '2026', 'ACTIVA'),
('com-prog2', 'Programación Web II', 'doc1', '2026', 'BORRADOR');
GO

-- 3. Carga de Inscripciones
INSERT INTO inscripciones_comision (comision_id, alumno_id) VALUES
('com-bd1', 'alu1'),
('com-bd1', 'alu2');
GO

PRINT 'Datos semilla insertados correctamente.';