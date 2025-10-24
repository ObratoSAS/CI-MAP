# Aurora LMS Frontend

Aurora LMS is a Moodle-inspired learning management system frontend built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui principles and an extensive mock API powered by MSW. The project delivers a full navigation experience across landing, catalog, authentication, dashboard, course, gradebook, messaging, calendar and administration areas.

## Requisitos

- Node.js 18+
- pnpm (recomendado)

## Scripts

```bash
pnpm install       # instala dependencias
pnpm dev           # arranca Next.js con la API mock
pnpm build         # genera el build de producción
pnpm start         # inicia el servidor en modo producción
pnpm lint          # ejecuta ESLint
pnpm test          # Vitest + Testing Library
pnpm e2e           # Playwright con MSW
pnpm storybook     # abre Storybook
```

La inicialización de MSW se realiza automáticamente en el cliente cuando `pnpm dev` está en ejecución.

## Arquitectura principal

```
src/
  app/                  # Rutas App Router (i18n por segmento)
  components/
    domain/             # Componentes de dominio (dashboard, cursos, etc.)
    layout/             # Proveedores y navegación global
    ui/                 # Primitivas del design system
  hooks/                # Hooks compartidos (sesión, permisos)
  lib/
    api/                # Clientes y claves React Query
    auth/               # Utilidades de sesión mock
    i18n/               # Configuración next-intl
    store/              # Zustand stores (UI, toasts)
  mocks/                # Fixtures y handlers MSW
  messages/             # Traducciones es/en por namespace
  styles/               # Tailwind + tokens
  types/                # Modelos compartidos
```

## Internacionalización

Se utiliza `next-intl` con detección en middleware. Todas las cadenas visibles están localizadas en `src/messages/{locale}` y se agrupan por dominio (`auth`, `courses`, `dashboard`, etc.).

## Accesibilidad

- Componentes con foco visible (`focus-ring`)
- Navegación por teclado y roles ARIA en modales, cajones y navegación
- Verificaciones automatizadas previstas con Playwright + axe

Consulta `docs/ACCESIBILIDAD.md` para más detalles.

## Mock API

- Handlers MSW en `src/mocks/handlers`
- Fixtures con usuarios, cursos, actividades, calificaciones, mensajes y eventos de calendario
- Rutas App Router (`app/api/*`) exponen los mismos datos para SSR/ISR

## Pruebas y Storybook

- Vitest + Testing Library (`pnpm test`)
- Playwright con escenarios críticos (`pnpm e2e`)
- Storybook con componentes UI claves (`pnpm storybook`)

## Decisiones

Las suposiciones y futuras mejoras están documentadas en `docs/DECISIONES.md`.
