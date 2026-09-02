## Qué cambia

<!-- Descripción breve. Si es un componente nuevo, nómbralo. -->

## Tipo

- [ ] `feat` — componente o funcionalidad nueva
- [ ] `fix` — corrección
- [ ] `chore` / `docs` / `refactor`

## Definition of Done (componentes)

- [ ] `src/lib/components/<Nombre>/{<Nombre>.vue,index.ts,<Nombre>.spec.ts}`
- [ ] Props tipadas (`withDefaults`), clases `gmz-<kebab>`, tema desde `tokens.css`
- [ ] Tests: render + props + eventos + accesibilidad, en verde
- [ ] Exportado en `src/lib/index.ts` y registrado en `install()`
- [ ] Sección en `src/App.vue`
- [ ] Tablas props/eventos/slots en `README.md`
- [ ] Changeset añadido (`npm run changeset`)
- [ ] `npm run check` en verde
- [ ] Rama `feat/component-<kebab>` + commits convencionales
