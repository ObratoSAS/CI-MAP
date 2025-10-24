# Guía de contribución

## Requisitos previos

- Node.js 20
- pnpm 8+
- Docker y Docker Compose

## Flujo de trabajo

1. Crear un fork del repositorio.
2. Clonar el fork y ejecutar `pnpm install`.
3. Levantar dependencias con `docker compose -f infra/docker-compose.yml up -d`.
4. Ejecutar `pnpm lint` y `pnpm test` antes de abrir un Pull Request.
5. Asegurar cobertura ≥80%.
6. Seguir el estándar de commits convencionales.

## Estilo de código

- ESLint + Prettier automáticos.
- Formatear con `pnpm format`.
- Respetar accesibilidad e i18n en el frontend.

## Reporte de vulnerabilidades

No abrir issues públicos. Enviar un correo a `security@novalms.dev`.
