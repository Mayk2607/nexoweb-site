# Sprint Evidence — Índice Oficial
**Proyecto:** Nexoweb V2 — nexoweb.mx
**Generado:** 2026-06-27
**Fuente:** Sesión de trabajo Claude Code (CTO-level engineering session)
**Propósito:** Fuente oficial de verdad documental para ChatGPT, Claude Web, NotebookLM y Nexoweb Academy

---

## Descripción

Esta carpeta contiene la evidencia técnica verificable de todos los sprints ejecutados durante la fase de producción del sitio `nexoweb.mx`. Cada archivo documenta hechos observados, comandos ejecutados, resultados reales y decisiones tomadas — sin resúmenes ni reinterpretaciones.

---

## Sprints documentados

| Archivo | Sprint | Proyecto | Tipo | Veredicto |
|---------|--------|----------|------|-----------|
| [GIT-001.md](GIT-001.md) | GIT-001 | nexoweb-platform | Auditoría de repositorio | COMPLETADO |
| [WEB-PROD-001.md](WEB-PROD-001.md) | WEB-PROD-001 | nexoweb-v2 | Production Readiness Assessment (5 fases) | 🟡 LISTO CON OBSERVACIONES |
| [WEB-002.md](WEB-002.md) | WEB-002 | nexoweb-v2 | Go Live Audit — clasificación P0-P3 | 🟡 APTO CON OBSERVACIONES |
| [WEB-003.md](WEB-003.md) | WEB-003 | nexoweb-v2 | Production Hardening — fixes P0 + limpieza | ✅ GO |
| [WEB-004.md](WEB-004.md) | WEB-004 | nexoweb-v2 | Production Deployment — cutover VPS | 🟡 GO CON OBSERVACIONES |

---

## Cronología de ejecución

```
GIT-001          → Auditoría repositorio nexoweb-platform (Jun 11, 2026)
WEB-PROD-001     → Assessment de nexoweb-v2 (5 fases, solo lectura)
WEB-002          → Go Live Audit completo (15 hallazgos P0-P3, sin código)
WEB-003          → Production Hardening (3 archivos, build 49/49 rutas)
WEB-004          → Despliegue a producción VPS 86.48.23.0 (Jun 27, 2026)
DOC-INFRA-001    → Preservación de evidencia técnica (Jun 27, 2026)
```

---

## Hechos clave preservados en esta evidencia

### Secreto hardcodeado rotado (WEB-003/WEB-004)

- Valor previo: `<SECRETO ROTADO -- ver WEB-004, valor invalidado y verificado operativamente el 2026-07-24>`
- Variables afectadas: `PUBLIC_LEADS_INGEST_SECRET` (backend) y `CRM_INGEST_SECRET` (landing)
- Acción: parametrizados con `${...}` en docker-compose.yml, rotados en WEB-004

### Archivos modificados durante WEB-003

| Archivo | Acción |
|---------|--------|
| `crm-nexoweb/docker-compose.yml` | Parametrizar 2 secretos hardcodeados |
| `nexoweb-v2/proxy.ts` | Eliminado (archivo muerto, nunca ejecutado) |
| `nexoweb-v2/.env.local` | Eliminadas 3 variables huérfanas de arquitectura Supabase abandonada |

### Archivos modificados/creados durante WEB-004 (VPS)

| Acción | Detalle |
|--------|---------|
| Creado `~/nexoweb-v2/` en VPS | 129 archivos, 22 MB |
| Sincronizados assets | 24 archivos en `/var/www/nexoweb-assets/` |
| Actualizado `~/crm-nexoweb/docker-compose.yml` | Context, container_name, secretos, CRM_API_URL |
| Actualizado `~/crm-nexoweb/.env` | Nuevo secreto + Telegram vars + CRM_API_URL vacío |
| Build Docker en VPS | `crm-nexoweb-landing:latest` — 49/49 rutas |

### Estado del VPS post-despliegue (Jun 27, 2026)

| Dato | Valor |
|------|-------|
| IP | 86.48.23.0 |
| OS | Ubuntu 24.04.4 LTS |
| Docker | v29.5.2 |
| Contenedor landing | `nexoweb-v2` (healthy) |
| SSL nexoweb.mx | Válido hasta 2026-08-06 |
| SSL hq.nexoweb.mx | Válido hasta 2026-09-02 |
| Disco | 96 GiB — 69% usado |
| Canal activo formulario | Telegram |

### Decisión arquitectónica (WEB-004)

El CRM antiguo (NestJS + Supabase `voahlrfdwndprdamiyky`) fue declarado **deprecado**. El proyecto Supabase está pausado. La arquitectura objetivo es: leads del formulario → Nexoweb HQ (PostgreSQL propio).

Plan de migración documentado en WEB-004.md, sección "Migración del flujo de leads a Nexoweb HQ".

---

## Hallazgos P0 clasificados en esta sesión

| ID | Hallazgo | Resultado |
|----|----------|-----------|
| P0-001 | Discrepancia nginx/rsync en paths de assets | FALSO POSITIVO — volume mount Docker resuelve |
| P0-002 | Secretos hardcodeados en docker-compose.yml | REAL — corregido en WEB-003, rotado en WEB-004 |
| P0-003 | Lógica tri-canal del formulario | FALSO POSITIVO — implementación correcta verificada |

---

## Nota sobre sprints DEV-001 / DEV-002

Los sprints DEV-001 y DEV-002, si existieron, corresponden a sesiones de desarrollo anteriores a la ventana de contexto de esta sesión. No hay evidencia técnica verificable en este registro. Si esos sprints fueron ejecutados, sus artefactos deben buscarse en el historial de conversaciones previas.

---

## Uso como fuente de verdad documental

Esta carpeta está preparada para ser consumida por:

- **ChatGPT / Claude Web:** Subir archivos `.md` individualmente o como ZIP para análisis contextual
- **NotebookLM:** Cargar como fuentes de un notebook de proyecto
- **Nexoweb Academy:** Usar como material de caso de estudio real de ingeniería de producción
- **Auditorías futuras:** Referencia baseline para comparar estado del sistema en sprints posteriores

Los archivos no contienen secretos activos. Los tokens y claves referenciados fueron rotados en WEB-004.
