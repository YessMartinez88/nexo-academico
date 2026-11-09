-- Nexo-Academico: Datos Semilla (Seeds)

USE sistema_asistencia;
GO

INSERT INTO usuarios (id, nombre, apellido, email, rol) VALUES
('usr-admin', 'Martina', 'Costa', 'admin@instituto.edu.ar', 'ADMIN'),
('usr-docente', 'Laura', 'Méndez', 'docente@instituto.edu.ar', 'DOCENTE'),
('alu-sofia', 'Sofía', 'Ramírez', 'sofia@instituto.edu.ar', 'ALUMNO'),
('alu-lucas', 'Lucas', 'Gómez', 'lucas@instituto.edu.ar', 'ALUMNO');

INSERT INTO comisiones (id, materia, docente_id, ciclo_lectivo, estado) VALUES
('com-bd1', 'Bases de Datos I', 'usr-docente', '2026', 'ACTIVA'),
('com-prog2', 'Programación Web II', 'usr-docente', '2026', 'BORRADOR');

INSERT INTO inscripciones_comision (comision_id, alumno_id) VALUES
('com-bd1', 'alu-sofia'),
('com-bd1', 'alu-lucas');
