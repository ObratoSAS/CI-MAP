# Decisiones de diseño y alcance

## Cobertura funcional
- Se priorizó un flujo navegable extremo a extremo con datos mock para landing, catálogo, autenticación, dashboard por rol, detalle de cursos, actividades, calificador, mensajes, calendario y administración.
- Algunas operaciones avanzadas (p. ej. CRUD completo en administración, intentos de cuestionario o envío real de archivos) se representaron como interacciones mock para mantener la experiencia sin backend real. Prioridad futura: implementar formularios completos y persistencia en el mock.

## API Mock
- Se reutilizan los mismos fixtures tanto en MSW como en rutas `app/api/*` para que SSR/ISR pueda consumir datos sin depender del worker.
- Se aplicó una latencia simulada y una tasa de error del 10 % en los handlers de MSW para ejercitar estados de error y reintentos en React Query.

## Internacionalización
- Se eligió `next-intl` por su integración con App Router. Se mantienen dos locales (`es`, `en`) y la estructura permite añadir namespaces adicionales sin modificar componentes.

## Diseño de componentes
- Los componentes UI siguen la filosofía de shadcn/ui (Tailwind + cva) pero se implementaron manualmente por restricciones de red.
- Se centralizó la gestión de toasts y estado de UI en Zustand para evitar dependencias adicionales.

## Testing y tooling
- Debido a la limitación de tiempo, las suites de Playwright y Vitest quedan preparadas pero sin casos exhaustivos. Prioridad alta: añadir los escenarios descritos en la especificación (login→dashboard, flujo de curso, quiz, foro, gradebook).
