# Proyecto Final - Sistemas Operativos

## Integrantes

* Jhoan Hurtado Marin – 202459472
* Juan Stevan Cruz – 202459437

## Descripción

Proyecto académico desarrollado para la asignatura Sistemas Operativos.

El proyecto implementa una plataforma de monitoreo y pruebas de estrés utilizando:

* PostgreSQL
* Docker
* PgAdmin
* Next.js
* PyTorch
* Jupyter Notebook

La solución permite:

* Ejecutar consultas de alta carga sobre PostgreSQL.
* Monitorear CPU y memoria RAM en tiempo real.
* Generar tráfico concurrente mediante HTTP Flood.
* Registrar eventos en base de datos.
* Analizar contención de bloqueos (Lock Contention).
* Ejecutar cargas de trabajo de Inteligencia Artificial para evaluar el comportamiento del sistema operativo bajo estrés.

## Estructura del repositorio

```text
docs/
├── Informe_Proyecto_Ospt1.pdf
├── Informe_Proyecto_Ospt2.pdf
├── Informe_MiniProyecto_SO(JC).pdf
└── Mini-proyecto SO.pdf

notebook_ia/
└── training_ai_model.ipynb

src/
├── app/
├── database/
├── lib/
└── archivos fuente del dashboard
```

## Tecnologías utilizadas

* Docker
* PostgreSQL
* PgAdmin
* Next.js
* React
* TypeScript
* PyTorch
* Python
* Linux Ubuntu (WSL)

## Funcionalidades implementadas

### Parte 1

* Dashboard de monitoreo.
* Consultas de carga sobre PostgreSQL.
* Medición de tiempos de respuesta.
* Monitoreo de CPU y RAM.

### Parte 2

* HTTP Flood.
* Registro de eventos en logs_carga.
* Simulación de Lock Contention.
* Análisis mediante pg_stat_activity.
* Entrenamiento de modelo IA para generación de carga.

## Evidencias

Las evidencias de ejecución se encuentran documentadas en los informes PDF ubicados en la carpeta docs.

## Asignatura

Sistemas Operativos
Universidad del Valle – Sede Tuluá
2026-1
