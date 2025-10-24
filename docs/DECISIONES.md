# Decisiones y Limitaciones

Este documento recoge las decisiones arquitectónicas clave y las limitaciones actuales del proyecto. Cada ítem incluye el estado y los próximos pasos.

## Estado general

La iteración inicial se centra en establecer la infraestructura del monorepo, la API base y los lineamientos de calidad. Las funcionalidades equivalentes a Moodle se implementarán en iteraciones sucesivas siguiendo el roadmap.

## Backend

- **Framework**: Se adopta Express con modularización inspirada en NestJS para acelerar la configuración inicial. Está planificado migrar a NestJS cuando el dominio esté completo.
- **Persistencia**: Prisma con PostgreSQL. Actualmente solo se ha modelado un subconjunto del esquema (`User`, `Role`, `Course`, `Section`, `Activity`, `Session`).
- **Autenticación**: Implementada autenticación básica con JWT y Argon2. Falta soporte OIDC, 2FA, políticas ABAC, gestión de sesiones múltiples y auditoría avanzada. Se prioriza su desarrollo en la siguiente iteración.
- **Colas**: Configurado BullMQ pero sin trabajos complejos. La cola de notificaciones y el procesamiento de eventos SCORM se implementarán al construir el sistema de mensajería y seguimiento.
- **Observabilidad**: Middleware de logging y métricas básicos. Falta exportación OpenTelemetry completa y paneles preconfigurados.

## Frontend

- **Next.js**: Configurado proyecto base con App Router, TailwindCSS y next-intl (es/en). Pendiente completar páginas para todas las funcionalidades (dashboard, cursos, actividades, calificaciones, mensajería, administración).
- **UI**: Biblioteca inicial en `@novalms/ui` con componentes accesibles. Se continuará ampliando con formularios, tablas, modales e iconografía.
- **Accesibilidad**: Se han definido pautas y linters, pero es necesario ejecutar auditorías manuales (axe) en cada nueva página.

## Integraciones

- **Almacenamiento**: Se definieron interfaces para MinIO y presigned URLs. La subida real de archivos, antivirus y versionado de archivos aún no se implementan.
- **Búsqueda**: Cliente de OpenSearch planificado. Falta indexado de cursos, usuarios y actividades.
- **Tiempo real**: Socket.io reservado. Los canales de cursos y notificaciones en vivo se implementarán junto con mensajería y foros.

## Cumplimiento

- **GDPR**: Se documentó la estrategia de consentimiento y exportación. Las APIs se desarrollarán cuando se implemente la gestión de datos personales.

## CI/CD

- `ci.yml` ejecuta lint, pruebas y build. `release.yml` incluye un pipeline con `semantic-release`, que requerirá configurar tokens (`GITHUB_TOKEN`, `NPM_TOKEN`) y la definición de reglas de versionado antes de activarse. `codeql.yml` proporciona análisis estático.

## Plan de acción

1. Completar el modelo de datos y migraciones Prisma para todas las entidades definidas en los requisitos.
2. Ampliar la API con rutas de cursos, inscripciones, actividades, calificaciones, mensajería y reportes.
3. Implementar el flujo completo de autenticación avanzada (OAuth/OIDC, 2FA, recuperación de contraseña) y mecanismos ABAC.
4. Desarrollar la UI de dashboard, catálogo y curso con datos reales consumiendo el SDK.
5. Integrar pruebas e2e (Playwright) y asegurar cobertura ≥80%.
6. Configurar workflows adicionales (release automatizado con semantic-release, monitoreo de cobertura) y plantillas de issues/PRs con checklist accesibilidad.
7. Implementar observabilidad completa (OpenTelemetry + Prometheus) y paneles base.
