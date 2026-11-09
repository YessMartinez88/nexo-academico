# Nexo-Académico

Sistema web para la gestión y el seguimiento de la asistencia estudiantil en instituciones educativas.

El proyecto se desarrolla como Trabajo Práctico Integrador de las materias **Desarrollo de Sistemas Web — Frontend y Backend** de la **Tecnicatura Superior en Desarrollo de Software — IFTS N.º 11**.

> **Estado del proyecto:** el repositorio contiene actualmente la estructura inicial del frontend Angular, el backend Node.js/Express, la configuración de conexión a SQL Server y los scripts de creación y carga de datos. Los módulos funcionales y sus endpoints se encuentran planificados según la matriz de responsabilidades y se implementarán progresivamente.

---

## Tecnologías

- **Frontend:** Angular, TypeScript, HTML5 y CSS3.
- **Navegación:** Angular Router.
- **Consumo de APIs:** `HttpClient` de Angular.
- **Backend:** Node.js y Express con módulos ES.
- **Base de datos:** Microsoft SQL Server.
- **Acceso a datos:** paquete `mssql`, conexión y consultas separadas.
- **Control de versiones:** Git y GitHub.

La versión de Angular debe mantenerse en **Angular 19 o superior**, de acuerdo con la consigna de Frontend. La versión efectiva instalada se puede consultar con:

```bash
npx ng version
```

---

## Estructura actual del repositorio

```text
Nexo-Academico/
├── backend/
│   ├── Controllers/       # Controladores backend
│   ├── Repositories/      # Acceso a datos
│   ├── Routers/           # Rutas de la API
│   ├── Services/          # Lógica de negocio
│   ├── database/
│   │   ├── config.js      # Configuración de entorno y SQL Server
│   │   ├── conexion.js    # Pool de conexión a la base de datos
│   │   └── queries.js     # Consultas SQL
│   ├── .env.example
│   ├── index.js           # Punto de entrada del servidor
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Componentes Angular
│   │   │   ├── models/     # Modelos e interfaces
│   │   │   └── services/   # Servicios HTTP y lógica compartida
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── angular.json
│   ├── package.json
│   ├── tsconfig.json
│   └── tsconfig.app.json
├── sql/
│   ├── 01_crear_base_y_datos.sql
│   └── 02_datos_semilla.sql
├── .gitignore
└── README.md
```

Las carpetas `node_modules`, `.angular`, `dist`, `out-tsc` y los archivos `.env` son archivos locales y no deben subirse al repositorio.

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

### Detalle por integrante

#### Yesi — Autenticación, sesión y roles

- Crear `LoginComponent` para la ruta `/login`.
- Incorporar validaciones del formulario.
- Implementar `AuthService` para administrar la sesión y el usuario actual.
- Implementar `RolGuard` para proteger rutas según los roles `ADMIN`, `DOCENTE` y `ALUMNO`.
- Crear las capas de autenticación: router, controller, service y repository.
- Consultar la tabla `usuarios` de SQL Server.
- Implementar:
  - `POST /api/auth/login`
  - `GET /api/auth/perfil`

#### Faus — Gestión de comisiones e inscripciones

- Crear `ComisionesComponent` para `/comisiones`.
- Permitir alta y edición de comisiones.
- Asignar materia, docente, ciclo lectivo y alumnos.
- Administrar los estados:
  - `BORRADOR`
  - `ACTIVA`
  - `CERRADA`
- Crear las capas de comisiones: router, controller, service y repository.
- Implementar como mínimo:
  - `GET /api/comisiones`
  - `POST /api/comisiones`

#### Diego — Planilla docente de asistencia

- Crear `AsistenciaDocenteComponent` para `/asistencia-docente`.
- Seleccionar comisión y fecha.
- Mostrar los alumnos inscriptos.
- Registrar los estados `P`, `A`, `T` y `R`.
- Guardar la planilla en bloque.
- Impedir modificaciones cuando la clase esté cerrada.
- Implementar:
  - `PUT /api/asistencias/planilla`
  - `POST /api/clases/:id/cerrar`

#### Noe — Consulta de asistencia del alumno

- Crear `MisAsistenciasComponent` para `/mis-asistencias`.
- Mostrar las comisiones cursadas.
- Mostrar clases dictadas, presentes, ausencias, tardanzas y retiros.
- Mostrar porcentaje de asistencia y detalle cronológico.
- Implementar el endpoint:
  - `GET /api/asistencias/alumno/:id`
- Resolver el cálculo mediante el servicio y las consultas necesarias al repositorio.

#### Fran — Justificaciones y API de feriados

- Crear `JustificacionesComponent` para `/justificaciones`.
- Permitir seleccionar una ausencia, tardanza o retiro justificable.
- Registrar motivo y comprobante.
- Crear `RevisionJustificacionesComponent` para `/revision-justificaciones`.
- Permitir aprobar o rechazar solicitudes con observaciones.
- Implementar:
  - `POST /api/justificaciones`
  - `PATCH /api/justificaciones/:id/revisar`
- Incorporar `FeriadosService` para consultar la API pública de feriados nacionales:

```text
GET https://api.argentinadatos.com/v1/feriados/{año}
```

La API externa de feriados es una funcionalidad complementaria y no reemplaza el endpoint propio conectado a SQL Server.

---

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

- Node.js compatible con la versión de Angular utilizada.
- npm.
- Angular CLI compatible con el proyecto.
- Microsoft SQL Server.
- SQL Server Management Studio u otra herramienta equivalente.
- Git.

### Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Nexo-Academico
```

### Configurar la base de datos

Ejecutar en SQL Server:

```text
sql/01_crear_base_y_datos.sql
sql/02_datos_semilla.sql
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

## Trabajo colaborativo con Git

Cada integrante debe trabajar en su rama de funcionalidad correspondiente y realizar commits claros y frecuentes.

Flujo sugerido:

```bash
git checkout -b feature/nombre-de-la-funcionalidad
git add .
git commit -m "feat: describe el cambio realizado"
git push -u origin feature/nombre-de-la-funcionalidad
```

Las ramas de trabajo deben integrarse mediante Pull Requests, manteniendo un historial que permita identificar la participación de cada integrante.

Antes de actualizar dependencias o ejecutar migraciones importantes, se recomienda verificar que el repositorio esté limpio:

```bash
git status
git add -A
git commit -m "Punto de control antes de actualizar dependencias"
```

---

## Relación con las consignas

El proyecto contempla los requisitos principales del TP Integrador:

- Frontend desarrollado con Angular.
- Componentes y navegación.
- Consumo de APIs mediante servicios.
- Backend desarrollado con Node.js y Express.
- Arquitectura Router–Controller–Service–Repository.
- Persistencia en SQL Server.
- Endpoints HTTP para las funcionalidades del sistema.
- Trabajo colaborativo mediante Git y GitHub.
- Participación individual mediante componentes, endpoints y ramas de funcionalidad.

Las funcionalidades deben marcarse como implementadas en la documentación únicamente después de ser desarrolladas, probadas y conectadas con la base de datos.
