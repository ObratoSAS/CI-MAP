# Arquitectura de NovaLMS

## Visión general

NovaLMS se estructura como un monorepo gestionado con pnpm workspaces. El sistema está dividido en aplicaciones y paquetes compartidos:

- `apps/api`: API REST construida con Express + TypeScript, con módulos pensados para evolucionar hacia NestJS.
- `apps/web`: Frontend SSR con Next.js (App Router) orientado a accesibilidad e internacionalización.
- `packages/sdk`: Cliente TypeScript generado desde el contrato OpenAPI de la API.
- `packages/ui`: Biblioteca de componentes compartidos basada en TailwindCSS y shadcn/ui.
- `packages/lib`: Utilidades compartidas (configuración, helpers de seguridad y validaciones).

Los servicios auxiliares (PostgreSQL, Redis, MinIO, OpenSearch) se orquestan con Docker Compose en `infra/docker-compose.yml`.

## Backend

- **Runtime**: Node.js 20
- **Framework**: Express modular con validaciones mediante Zod. La estructura permite migrar a NestJS manteniendo los contratos públicos.
- **Persistencia**: Prisma ORM con PostgreSQL. Actualmente incluye la migración inicial con entidades fundamentales (`User`, `Role`, `Course`, `Section`, `Activity`).
- **Mensajería**: BullMQ (Redis) para colas de trabajo y envío de notificaciones.
- **Observabilidad**: Pino para logs, métricas Prometheus y trazas OpenTelemetry integradas mediante middlewares.
- **Seguridad**: JWT firmados con JWKS rotables, Argon2id para hash de contraseñas, sanitización de entrada y políticas CSP documentadas.

## Frontend

- **Framework**: Next.js 14 con App Router y renderizado híbrido (SSR/ISR).
- **Estado**: TanStack Query para consumo de la API.
- **Formularios**: React Hook Form + Zod.
- **Estilos**: TailwindCSS + CSS Modules. Temas claro/oscuro usando variables CSS.
- **i18n**: `next-intl` con locales español/inglés.
- **Accesibilidad**: Componentes con soporte WAI-ARIA, navegación por teclado y contraste AA.

## Infraestructura

- **Docker**: `infra/docker-compose.yml` define los servicios y redes necesarias para desarrollo local.
- **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`) ejecuta lint, pruebas, cobertura y construcción de imágenes Docker.
- **Seguridad**: Dependabot, CodeQL y políticas documentadas en `SECURITY.md`.

## Roadmap

La hoja de ruta detallada (funcional y técnica) se mantiene en `docs/DECISIONES.md`. El foco de las siguientes iteraciones es:

1. Completar el dominio académico (inscripciones, calificaciones, cuestionarios avanzados).
2. Implementar mensajería en tiempo real y notificaciones multi-canal.
3. Incorporar plugins temáticos y analítica avanzada.
