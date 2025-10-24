# API de NovaLMS

La API expone recursos REST bajo el prefijo `/api/v1`. El contrato se documenta con OpenAPI 3.1 y se publica automáticamente en `/api/docs`.

## Autenticación

- **Registro**: `POST /api/v1/auth/register`
- **Inicio de sesión**: `POST /api/v1/auth/login`
- **Refresco de token**: `POST /api/v1/auth/refresh`
- **Cierre de sesión**: `POST /api/v1/auth/logout`

El sistema utiliza cookies `httpOnly` y tokens JWT firmados. La respuesta estándar de error incluye `code`, `message`, `details` y `traceId`.

## Cursos

- `GET /api/v1/courses`
- `POST /api/v1/courses`
- `GET /api/v1/courses/:id`
- `PATCH /api/v1/courses/:id`
- `DELETE /api/v1/courses/:id`

## Salud y observabilidad

- `GET /health/live`
- `GET /health/ready`
- `GET /metrics`

## Convenciones

- **Paginación**: parámetros `page`, `pageSize` (máx. 100), `sort`, `filter`.
- **Formato de fecha**: ISO 8601 UTC.
- **Versionado**: encabezado `X-NovaLMS-Version`.

Los detalles por recurso se ampliarán conforme avance el desarrollo. El SDK se genera en `packages/sdk` mediante `pnpm --filter @novalms/api generate:sdk`.
