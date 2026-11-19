# Refinamiento del panel y rendimiento — 18 de noviembre de 2026

El incremento refina el panel agrícola existente en modo Operate: conserva nombre, logotipo, Manrope, rutas, permisos y reglas de negocio. La dirección aprobada consta en `docs/design/PANEL_OPERATIVO_2026-11-18.md`. El acceso fotográfico conserva sus decisiones y valores; img2three y el 3D aplazado quedan fuera del trabajo. No se añadieron imágenes a la aplicación ni bibliotecas visuales.

## Cambios entregados

- **Shell y estilos compartidos:** navegación por tareas, ruta activa, acceso al contenido y controles con foco visible. Roles operativos acotados al panel para fondo, superficie, texto, divisores, controles y acción en claro/oscuro. Menú lateral móvil, controles del shell y botones con áreas de acción mínimas de 44 px, tablas con cifras tabulares, profundidad tonal y respeto por movimiento reducido. La barra de preparación offline recibe estilo compartido sin cambiar su lógica.
- **Resumen:** filtros de fechas, lote y campaña con etiquetas vinculadas; indicadores y actividad basados en la API. Consulta, error y vacío se expresan por separado; carga/error muestran guiones y mensajes en vez de aparentar ceros de producción. Hay reintento y acciones para preparar catálogos o registrar la primera cosecha.
- **Catálogos y teclado:** índice con accesos descriptivos. Menú y diálogos de catálogo gestionan entrada, contención y restauración del foco, además de Escape cuando la operación permite cerrar. Campañas muestra error HTTP o de conexión y reintento, sin confundirlo con un catálogo vacío.
- **Perfil y formularios:** secciones ajustadas a pantallas estrechas, etiquetas de campos y filtros, placeholders opacos con el rol de texto secundario. La foto se elige mediante botón nativo activable con teclado y el resultado se anuncia en una región de estado.

Los archivos principales son `app/dashboard/layout.tsx`, `app/dashboard/page.tsx`, `app/dashboard/workspace.css`, `app/dashboard/perfil/page.tsx`, `app/dashboard/catalogos/page.tsx`, `app/dashboard/catalogos/campanias/page.tsx` y `app/ui/OfflineReadiness.tsx`. Otros formularios y tablas del panel reciben los estilos compartidos y las mejoras de etiquetas/foco de este incremento.

## Trabajo de React/Next y dependencias

`lib/hooks/useTema.ts` aporta un único `TemaProvider` al panel: shell y perfil comparten estado y sincronización, evitando montar sincronizadores duplicados. `lib/hooks/useClasificacion.ts` memoriza el actor a partir de dependencias primitivas de identidad y rol. El índice de catálogos se sirve como componente de servidor. `lib/hooks/useDashboardStats.ts` cancela la petición anterior y comprueba la señal antes de aplicar resultados, errores o fin de carga. `lib/hooks/useDialogFocus.ts` centraliza la gestión de teclado de los diálogos revisados.

Next pasó de 16.4.0 a 16.4.6 y DOMPurify de 3.4.16 a 3.4.18 por alertas publicadas, con su archivo de dependencias fijadas actualizado. No se añadieron bibliotecas visuales. Estos cambios reducen trabajo duplicado y previenen respuestas obsoletas; no se midieron porcentajes de velocidad, Lighthouse ni reducción de bundle.

El resultado de `npm audit --omit=dev` queda en `prisma/backups/panel-dependency-audit-final.json`: **14 alertas, 9 altas, 2 moderadas, 3 bajas y ninguna crítica**; Next y DOMPurify ya no aparecen señalados. Sigue pendiente revisar y mantener la cadena de dependencias PWA restante. Este incremento no acredita seguridad completa ni preparación para producción.

## Verificación y evidencia

| Comprobación | Resultado registrado | Evidencia |
| --- | --- | --- |
| Compilación Next 16.4.6 | Salida 0 | `prisma/backups/panel-build.log` |
| Lint | Salida 0 | `prisma/backups/panel-lint.log` |
| Tipos | Salida 0 | `prisma/backups/panel-types.log` |
| Suite final con navegador | 80/80, sin fallos; 51.075 s | `prisma/backups/panel-e2e.log` |
| Escenarios de interfaz integrados | Incluidos en la suite | `tests/panel-ui-cases.cjs` |
| Verificación del navegador | 0 errores de página | `prisma/backups/browser-qa/panel-20261118/verificacion.json` |
| Contraste de tokens | Ocho combinaciones medidas en claro/oscuro | `prisma/backups/panel-contraste-20261118.json` |

Hay **23 capturas PNG válidas**, con datos sintéticos, en `prisma/backups/browser-qa/panel-20261118/`. `fallo.png` es un diagnóstico y se excluye de la evidencia visual de entrega. La revisión abarca escritorio y anchos de 390, 375 y 844 px, temas claro/oscuro, menú y diálogo con teclado/restauración de foco, foto con Enter y anuncio, secciones de perfil y límites de fechas en móvil, recarga offline real, movimiento reducido y vacío obtenido con filtros de 2099 sin añadir fixtures.

La verificación incluye errores HTTP 503 y de red en campañas con reintento. El contraste computado del placeholder fue **5.989751541329352** en claro y **8.5045766146525** en oscuro. Al navegar al perfil después de la carga inicial del tema se registró **un GET a `/api/perfil`**. Las ocho combinaciones del archivo de contraste son medidas de tokens: no equivalen a una auditoría WCAG completa.

Una ejecución previa terminó inesperadamente en un proceso nativo de pruebas; se conserva en `prisma/backups/panel-e2e-native-exit.log`. La causa no está determinada por esa evidencia. La última ejecución completa pasó 80/80; el incidente previo no se presenta como una prueba aprobada.

La revisión completa solicitó cuatro correcciones: error de carga de campañas, adaptación móvil de fechas/perfil, contraste de placeholder y foto con teclado. El último dictamen registra **cuatro resueltas, ninguna regresión observada, sin pendientes de esos hallazgos y disposición ship**. Ese dictamen se limita a las cuatro correcciones; no certifica toda la aplicación.

## Sistema documentado y límites

`DESIGN.md` conserva los tokens y decisiones del acceso y añade los roles reales del panel extraídos de `app/dashboard/workspace.css`. Los tokens normativos permanecen en su frontmatter; `.impeccable/design.json` sincroniza metadatos, escalas tonales, movimiento, puntos de adaptación, narrativa y diez muestras autónomas de componentes, incluidas cuatro operativas. No se reemplaza la identidad existente.

El detector previo, `prisma/backups/panel-detector-20261118.json`, emitió 19 avisos frente a un documento que describía solo autenticación. La ampliación registra el ámbito operativo real; no convierte excepciones heredadas o defectos en reglas. El detector no se repitió y no se declara que los avisos hayan quedado eliminados.

No hubo despliegue ni migraciones o alteraciones de la base de desarrollo; las pruebas usan una base temporal. Quedan fuera de alcance dispositivos Android/iOS físicos, actualización de PWA entre versiones, infraestructura, SMTP y backups externos, además del 3D. El cambio de nombre del Excel observado y la carpeta `codex-skills-starter/` son ajenos a este incremento y se conservaron.
