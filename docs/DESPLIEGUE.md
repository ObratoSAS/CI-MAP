# Guía de despliegue

## Requisitos

- Docker 24+
- Docker Compose V2
- PNPM 8+
- Node.js 20

## Variables de entorno

Duplicar `.env.example` en `.env` y completar los secretos:

```
POSTGRES_URL=
REDIS_URL=
MINIO_ENDPOINT=
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=
JWT_PRIVATE_KEY=
JWT_PUBLIC_KEY=
SMTP_URL=
OPENSEARCH_URL=
```

## Desarrollo local

```bash
pnpm install
docker compose -f infra/docker-compose.yml up -d
pnpm --filter @novalms/api prisma:migrate
pnpm --filter @novalms/api prisma:seed
pnpm dev
```

La API estará disponible en `http://localhost:3001` y el frontend en `http://localhost:3000`.

## Producción (Docker Compose)

1. Crear un archivo `.env.production` con variables seguras.
2. Construir imágenes:
   ```bash
   docker compose -f infra/docker-compose.yml build
   docker compose -f infra/docker-compose.yml up -d
   ```
3. Ejecutar migraciones y seeding.
4. Configurar backups automáticos de PostgreSQL y MinIO.
5. Configurar certificados TLS (traefik o nginx).

## Opciones gestionadas

- **Railway/Render**: desplegar API y frontend como servicios Node.js, utilizar PostgreSQL administrado y Redis/Upstash.
- **Fly.io**: empaquetar contenedores y desplegar con volúmenes persistentes.
- **Supabase**: como backend de base de datos y autenticación adicional si se requiere.

## CI/CD

El workflow `ci.yml` compila y prueba el proyecto. Se recomienda integrar `release.yml` con `semantic-release` para versionado automático y despliegue continuo.
