USE sistema_asistencia;
GO

IF COL_LENGTH('usuarios', 'password_hash') IS NULL
BEGIN
    ALTER TABLE usuarios
    ADD password_hash VARCHAR(255) NULL;
END;
GO

USE sistema_asistencia;
GO

IF COL_LENGTH('usuarios', 'password_hash') IS NULL
BEGIN
    ALTER TABLE usuarios
    ADD password_hash VARCHAR(255) NULL;
END;
GO

UPDATE usuarios
SET password_hash = $2b$10$5qTI/ISQAacA3RPkMUMrVe.KWi4Dgc8M6fjx/ubueOsE2I0fIZtY6
WHERE password_hash IS NULL;
GO

ALTER TABLE usuarios
ALTER COLUMN password_hash VARCHAR(255) NOT NULL;
GO


