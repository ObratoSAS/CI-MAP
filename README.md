# NovaLMS

NovaLMS es un LMS moderno inspirado en Moodle 4.x construido exclusivamente con tecnologías JavaScript/TypeScript.

## Estructura

- `apps/api`: API REST modular con Express y Prisma.
- `apps/web`: Frontend SSR con Next.js y TailwindCSS.
- `packages/sdk`: Cliente TypeScript generado desde OpenAPI.
- `packages/ui`: Componentes compartidos.
- `packages/lib`: Utilidades.
- `infra`: Docker Compose y manifiestos de infraestructura.
- `docs`: Documentación funcional y técnica.

## Primeros pasos

```bash
pnpm install
docker compose -f infra/docker-compose.yml up -d
pnpm dev
```

Más información en `docs/README.md`.
