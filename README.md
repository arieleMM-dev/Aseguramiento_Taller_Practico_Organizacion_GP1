# Taller práctico de organización con Finca JIRAH

Aplicación académica del Perfil Básico de ISO/IEC 29110. Fecha de referencia: 19/11/2026. Autores: Ariel Esteban Morillo Mosquera (GP/AN/PR) y Justin Joshua Villarroel Barreno (LT/DIS/ET). Cliente académico: David Alexander Pilaguano Chisaguano. 

## Abrir la entrega

- `entrega/Informe_Taller.pdf`: guía completa, con todos los productos y reflexión breve.
- `informe/main.tex`: fuente principal. `informe/secciones/` conserva cada producto; los archivos numerados directamente bajo `informe/` permiten compilar entregables independientes.
- `entrega/01_*.pdf` a `09_*.pdf`: productos separados.
- `evidencias/06_horas_retrabajo/Registro_horas.xlsx`: detalle y resumen con fórmulas.
Autoevaluación y reflexión están incluidas.
- `incremento/`: componente nuevo y pruebas aisladas; `fuentes_proyecto/` contiene copias seleccionadas del proyecto actual y un manifiesto SHA-256. No contiene toda la aplicación.


## Plazo y presupuesto completos propuestos

El cliente real no fijó plazo ni presupuesto. La simulación propone **16 semanas, del 19/11/2026 al 11/03/2027**, y **USD 18 000**, dentro del rango recordado de USD 15 000–20 000. Se justifican 1080 horas-persona a USD 15/h (USD 16 200), servicios USD 600 y reserva USD 1200. No son datos aprobados por el cliente ni costos históricos comprobados. El Excel incorpora una hoja `Proyecto completo` con cálculos, fechas, servicios y riesgos. Las 20.5 h del taller no se confunden con las 1080 h estimadas del sistema completo.

SC01 y RT01 suman 3.5 h académicas y USD 52.50 a ese pronóstico: 1083.5 h, costo previsto USD 16 852.50 y reserva restante USD 1147.50. No se declaran horas ni gastos reales de toda la finca.

## Naturaleza de las evidencias

Reales: copias del código, transpilación de la función actual, adaptador construido, ejecución final 13/13, historial 9/10 → 10/10 → 13/13 y nueva ejecución de la suite de origen 79/79. El fallo del primer borrador se introdujo intencionalmente en laboratorio y no se atribuye al programa original.

Simulados: acuerdos y decisiones del cliente, sesiones S1/S2, esfuerzo de 20.5 horas-persona y retrabajo 1 h (4.88 % incluyendo CL; 5.41 % sin CL). Plan inicial 17 h + SC01 2.5 h + RT01 1 h. No se inventan firmas; David debe revisar y confirmar las decisiones representadas. No se afirma haber realizado la exposición oral. Cubrir la consigna no equivale a 100 % de cobertura de código, certificación ni garantía de calificación.

El caso sigue siendo la finca; el incremento demostrable se acota al cálculo del cuadre. No se trasladan cifras, presupuesto, equipo o resultados de TurnoSalud. El alcance no incluye entregar una nueva aplicación web ni desplegar la finca. El grupo de dos desarrolladores y cliente externo sigue la plantilla proporcionada; el docente debe admitirlo frente a la conformación de 3–4 estudiantes de la consigna.

## Reproducir las pruebas

Con Node.js instalado, sin instalar paquetes:

```powershell
cd incremento
node --test --test-reporter=tap tests/cuadre.test.cjs
```

O ejecutar `scripts/Reproducir.ps1`, que genera otra carpeta de resultados sin sobrescribir los originales. Los ensayos de borrador y v1.0 están conservados; no ejecutar el borrador esperando 100 % de éxito.


