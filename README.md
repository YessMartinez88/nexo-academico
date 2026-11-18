# Nexo-Académico

Sistema web para la gestión y el seguimiento de la asistencia estudiantil en instituciones educativas.

El proyecto se desarrolla como Trabajo Práctico Integrador de las materias **Desarrollo de Sistemas Web — Frontend y Backend** de la **Tecnicatura Superior en Desarrollo de Software — IFTS N.º 11**.

---

## Tecnologías

- **Frontend:** Angular 22, TypeScript, HTML5 y CSS3.
- **Navegación:** Angular Router.
- **Consumo de APIs:** `HttpClient` de Angular.
- **Backend:** Node.js y Express con CommonJS.
- **Base de datos:** Microsoft SQL Server.
- **Acceso a datos:** paquete `mssql`, conexión y consultas separadas.
- **Control de versiones:** Git y GitHub.

La versión de Angular verificar la version:

```bash
npx ng version
```

---

## Distribución real de responsabilidades

La distribución se realiza entre cinco integrantes. Cada integrante es responsable de desarrollar al menos un componente Angular y una parte del backend conectada con SQL Server, incluyendo las capas necesarias para su funcionalidad.

| Integrante | Responsabilidad principal | Frontend Angular | Backend Node.js / Express / SQL Server | Rama sugerida |
|---|---|---|---|---|
| **Yesica Martinez** | Autenticación, sesión y roles | Pantalla `/login`, simulación o cambio de rol, `AuthService` y `RolGuard` para proteger rutas. | `POST /api/auth/login` y `GET /api/auth/perfil`. Validación de credenciales, sesión, token y roles. | `feature/auth-roles` |
| **Fausto De Laval** | Gestión de comisiones e inscripciones | Pantalla `/comisiones`: alta, edición, estado y asignación de docentes y alumnos. | `GET /api/comisiones` y `POST /api/comisiones`. CRUD y gestión de estados de comisión. | `feature/gestion-comisiones` |
| **Diego Reynoso** | Planilla docente de asistencia | Pantalla `/asistencia-docente`: selección de comisión y fecha, carga de estados `P`, `A`, `T`, `R` y cierre de planilla. | `PUT /api/asistencias/planilla` y `POST /api/clases/:id/cerrar`. Guardado en bloque y control de cierre mediante transacción. | `feature/planilla-asistencia` |
| **Noelia Cosio** | Panel de asistencia del alumno | Pantalla `/mis-asistencias`: porcentaje acumulado, faltas computadas y detalle por fecha. | `GET /api/asistencias/alumno/:id`. Consultas relacionales y cálculo del porcentaje de asistencia. | `feature/consulta-asistencias` |
| **Francisco Millan** | Circuito de justificaciones y API de feriados | Pantallas `/justificaciones` y `/revision-justificaciones`, más el servicio de feriados. | `POST /api/justificaciones` y `PATCH /api/justificaciones/:id/revisar`. Cambio de estados y revisión administrativa. | `feature/justificaciones-feriados` |

## Funcionalidades previstas

### Administración

- Gestionar comisiones e inscripciones.
- Asignar docentes y alumnos.
- Cambiar el estado de las comisiones.
- Revisar solicitudes de justificación.

### Docentes

- Consultar las comisiones asignadas.
- Seleccionar una fecha de clase.
- Registrar la asistencia de los alumnos.
- Cerrar una planilla para impedir modificaciones posteriores.
- Recibir una advertencia cuando la fecha corresponda a un feriado nacional.

### Alumnos

- Consultar sus comisiones.
- Visualizar el historial de asistencia.
- Consultar el porcentaje acumulado.
- Solicitar la justificación de una ausencia, tardanza o retiro.
- Consultar el estado de sus solicitudes.

---

## Estados de asistencia y cálculo

| Código | Estado | Falta computada |
|---|---|---:|
| `P` | Presente | 0 |
| `A` | Ausente | 1 |
| `AJ` | Ausente justificado | 1, identificada como justificada |
| `T` | Tarde | 0,5 |
| `TJ` | Tarde justificado | 0,5, identificada como justificada |
| `R` | Retiro anticipado | 0,5 |
| `RJ` | Retiro justificado | 0,5, identificada como justificada |

El porcentaje previsto se calcula de la siguiente manera:

```text
Porcentaje = ((Clases dictadas - Faltas computadas) / Clases dictadas) × 100
```

Cuando todavía no existen clases dictadas, el porcentaje inicial previsto es 100 %.

---

## Base de datos

La base de datos utilizada es **Microsoft SQL Server**.

Los scripts deben ejecutarse en el siguiente orden desde SQL Server Management Studio:

1. `sql/01_crear_base_y_datos.sql`
2. `sql/02_datos_semilla.sql`
3. `sql/03_justificaciones.sql`

El esquema contempla inicialmente las tablas:

- `usuarios`
- `comisiones`
- `inscripciones_comision`
- `clases`
- `registros_asistencia`
- `justificaciones`

La configuración de conexión se realiza mediante variables de entorno definidas en `backend/.env` a partir de `backend/.env.example`.

---

## Instalación y ejecución

### Requisitos previos

- Node.js `22.22.3` o superior dentro de la 22, o `24.15` o superior (requisito de Angular 22).
- npm.
- Angular CLI 22 (se usa la del proyecto con `npx ng`).
- Microsoft SQL Server.
- SQL Server Management Studio u otra herramienta equivalente.
- Git.

### Clonar el repositorio

```bash
git clone <[URL_DEL_REPOSITORIO](https://github.com/YessMartinez88/nexo-academico.git)>
cd Nexo-Academico
```

### Configurar la base de datos

Ejecutar en SQL Server:

```text
sql/01_crear_base_y_datos.sql
sql/02_datos_semilla.sql
sql/03_justificaciones.sql
```

### Configurar y ejecutar el backend

En una terminal:

```bash
cd backend
```

Copiar el archivo de ejemplo:

```bash
# Linux/macOS
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

Completar en `.env` los datos de SQL Server y luego ejecutar:

```bash
npm install
npm run dev
```

El backend utiliza el puerto definido en `PORT`, cuyo valor inicial previsto es `3000`.

### Configurar y ejecutar el frontend

En otra terminal:

```bash
cd frontend
npm install
npm start
```

La aplicación Angular se ejecuta normalmente en:

```text
http://localhost:4200
```

Para verificar la versión instalada:

```bash
npx ng version
```

Para generar una compilación de producción:

```bash
npm run build
```

---
