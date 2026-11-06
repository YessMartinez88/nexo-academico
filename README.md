# Nexo-Academico

Sistema integral de gestión de asistencia y seguimiento académico para institutos educativos. Permite administrar comisiones, registrar asistencias en bloque, computar porcentajes de presentismo y gestionar solicitudes de justificación con comprobantes probatorios.

Proyecto desarrollado como Trabajo Práctico Integrador para las materias **Desarrollo de Sistemas Web** (Frontend y Backend) de la **Tecnicatura Superior en Desarrollo de Software — IFTS N° 11**.

---

## Integrantes y Reparto de Responsabilidades

| Integrante | Componente Angular (Frontend) | Endpoint Principal (Backend) | Capas Backend Responsables | Rama Asignada |
| :--- | :--- | :--- | :--- | :--- |
| **Integrante 1** | `ComisionesComponent` (`/comisiones`) | `POST /api/comisiones` | `comisiones.routes` / `controller` / `service` / `repository` | `feature/gestion-comisiones` |
| **Integrante 2** | `AsistenciaDocenteComponent` (`/asistencia-docente`) | `PUT /api/asistencias/planilla` | `asistencias.routes` / `controller` / `service` / `repository` | `feature/planilla-asistencia` |
| **Integrante 3** | `MisAsistenciasComponent` (`/mis-asistencias`) | `GET /api/asistencias/alumno/:id` | `asistencias.routes` / `service` (cálculo %) / `repository` | `feature/consulta-asistencias` |
| **Integrante 4** | `JustificacionesComponent` (`/justificaciones`) | `POST /api/justificaciones` | `justificaciones.routes` / `controller` / `service` / `repository` | `feature/solicitud-justificaciones` |
| **Integrante 5** | `RevisionJustificacionesComponent` (`/revision-justificaciones`) | `PATCH /api/justificaciones/:id/revisar` | `justificaciones.service` (transición de estados) + API Feriados | `feature/revision-justificaciones` |

---

## Tecnologías Utilizadas

- **Frontend:** Angular 18, TypeScript, HTML5, CSS3, Angular Router, HttpClient.
- **Backend:** Node.js, Express, TypeScript.
- **Arquitectura Backend:** Router $\rightarrow$ Controller $\rightarrow$ Service $\rightarrow$ Repository.
- **Base de Datos:** Microsoft SQL Server (`mssql`), consultas desacopladas y transacciones atómicas.
- **API Externa:** [ArgentinaDatos - Feriados Nacionales](https://argentinadatos.com/docs/operations/get-feriados) (`GET /v1/feriados/{año}`).
- **Control de Versiones:** Git y GitHub (trabajo colaborativo por ramas y Pull Requests).

---

## Roles y Funcionalidades

### 1. Administración
- Crear, listar y editar comisiones académicas (asignar docente, materias y ciclo lectivo).
- Cambiar estados de comisiones (`BORRADOR`, `ACTIVA`, `CERRADA`).
- Bandeja de revisión: aprobar o rechazar justificaciones de inasistencia cargando observaciones formales.

### 2. Docente
- Consultar comisiones asignadas y listar estudiantes inscriptos.
- Cargar planilla de asistencia por fecha con estados `P` (Presente), `A` (Ausente), `T` (Tarde) o `R` (Retiro).
- Cierre formal de planillas (bloquea modificaciones posteriores).
- Detección de feriados nacionales mediante alerta visual conectada a la API externa.

### 3. Alumno
- Visualizar comisiones en curso con detalle de clases dictadas y porcentaje acumulado de asistencia.
- Consulta de historial de inasistencias.
- Solicitar justificación de ausencias/tardanzas adjuntando motivo y constancia probatoria (hasta 5 MB).
- Seguimiento del estado de la solicitud (`PENDIENTE`, `APROBADA`, `RECHAZADA`).

---

## Reglas de Negocio y Cómputo de Faltas

| Código | Estado | Falta Computada |
| :---: | :--- | :---: |
| **P** | Presente | 0 |
| **A** | Ausente | 1 |
| **AJ** | Ausente Justificado | 1 (Justificada) |
| **T** | Tarde | 0.5 |
| **TJ** | Tarde Justificado | 0.5 (Justificada) |
| **R** | Retiro anticipado | 0.5 |
| **RJ** | Retiro Justificado | 0.5 (Justificada) |

**Fórmula de asistencia:**
$$\text{Porcentaje} = \left( \frac{\text{Clases Dictadas} - \text{Faltas Computadas}}{\text{Clases Dictadas}} \right) \times 100$$
*(Si aún no hay clases dictadas, el porcentaje inicial mostrado es 100%).*

---

## Instalación y Puesta en Marcha

### Prerrequisitos
- Node.js (v18 o superior) y npm
- Angular CLI (`npm install -g @angular/cli`)
- Microsoft SQL Server
- Git

### 1. Clonar el repositorio
```bash
git clone https://github.com/YessMartinez88/nexo-academico.git
cd Nexo-Academico