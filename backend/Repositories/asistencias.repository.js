import sql from 'mssql';
import { dbConfig } from '../database/config.js';

export class AsistenciasRepository {
    static async obtenerPorAlumno(idAlumno) {
        try {
            let pool = await sql.connect(dbConfig);
            let resultado = await pool.request()
                .input('id', sql.VarChar(50), idAlumno)
                .query(`
                    SELECT 
                        c.fecha, 
                        com.materia AS comision, 
                        r.estado AS codigo 
                    FROM registros_asistencia r
                    JOIN clases c ON r.clase_id = c.id
                    JOIN comisiones com ON c.comision_id = com.id
                    WHERE r.alumno_id = @id
                `);
            
            return resultado.recordset;
        } catch (error) {
            console.error('Error al consultar asistencias en la base de datos:', error);
            throw error;
        }
    }
}