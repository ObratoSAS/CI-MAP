# Checklist de accesibilidad

- [x] Navegación por teclado: botones, enlaces, tabs, formularios y modales tienen `focus-visible` y son operables con teclado.
- [x] Roles y atributos: diálogos (`role="dialog"`), drawer (`aria-modal="true"`), breadcrumb (`aria-label`).
- [x] Contraste: combinación light/dark con tokens diseñados para cumplir WCAG 2.1 AA.
- [x] Etiquetas asociadas: formularios con `label` y `htmlFor`, mensajes de error descriptivos.
- [x] Internacionalización: textos accesibles traducidos en `es` y `en`.
- [ ] Validación automática: pendiente integrar Playwright + axe para auditorías continuas (prioridad próxima iteración).
