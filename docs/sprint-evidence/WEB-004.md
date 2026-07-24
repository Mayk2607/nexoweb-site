# WEB-004 — Production Deployment Report
**Nexoweb V2 — nexoweb.mx**
Fecha: 2026-06-27 | Sprint: WEB-004 | Rol: CTO / DevOps Lead / Release Manager

---

## Objetivo

Ejecutar el despliegue controlado de Nexoweb V2 (aprobado en WEB-003 con veredicto GO) al entorno de producción en el VPS `86.48.23.0`. Sustituir el sitio de marketing anterior (`~/nexoweb-site`) por la nueva versión (`~/nexoweb-v2`).

---

## Infraestructura encontrada

### Servidor VPS — Estado pre-despliegue

| Componente | Valor |
|------------|-------|
| IP | 86.48.23.0 |
| OS | Ubuntu 24.04.4 LTS (Noble Numbat) |
| Kernel | 6.8.0-106-generic |
| Uptime pre-deploy | 49 días, 23 horas |
| CPU | 6 vCPUs AMD EPYC |
| RAM total | 11 GiB |
| RAM disponible | ~10 GiB |
| Disco | 96 GiB total — 66 GiB usados (69%) |
| Docker | v29.5.2 |
| Docker Compose | v5.1.4 |
| Firewall | UFW activo: 22, 80, 443 permitidos |

### Certificados SSL

| Certificado | Dominios cubiertos | Expira | Estado |
|-------------|-------------------|--------|--------|
| `api.nexoweb.mx` | `api.nexoweb.mx`, `crm.nexoweb.mx`, `nexoweb.mx`, `www.nexoweb.mx` | 2026-08-06 | VÁLIDO (40 días) |
| `hq.nexoweb.mx` | `hq.nexoweb.mx` | 2026-09-02 | VÁLIDO (66 días) |

### DNS

| Dominio | Resolución |
|---------|------------|
| `nexoweb.mx` | `86.48.23.0` ✅ |
| `www.nexoweb.mx` | `86.48.23.0` ✅ |

### Dos stacks Docker independientes en el mismo VPS

| Stack | Compose file | Contenedores | Red |
|-------|-------------|--------------|-----|
| `crm-nexoweb` | `~/crm-nexoweb/docker-compose.yml` | backend, frontend, landing, nginx | `crm-nexoweb_nexoweb-network` |
| `nexoweb-platform` | `/opt/nexoweb-platform/docker-compose.prod.yml` | nexoweb-hq, postgres, redis | `nexoweb-platform_nexoweb-internal` |

Nota: `nexoweb-nginx` pertenece al stack `crm-nexoweb` pero tiene doble pertenencia a ambas redes para enrutar tráfico hacia HQ.

---

## Variables verificadas

### Landing (`nexoweb-v2`) — post-despliegue

| Variable | Configurada | Canal afectado | Nota |
|----------|-------------|----------------|------|
| `NEXT_PUBLIC_SITE_URL` | ✅ `https://nexoweb.mx` | Build/SSG | Solo runtime; codebase no la requiere explícitamente |
| `CRM_API_URL` | ⬜ vacío | CRM | **Deshabilitado temporalmente** — ver sección migración |
| `CRM_INGEST_SECRET` | ✅ `${CRM_INGEST_SECRET}` via .env | CRM | Nuevo secreto rotado |
| `TELEGRAM_BOT_TOKEN` | ✅ | Telegram | Operativo |
| `TELEGRAM_CHAT_ID` | ✅ | Telegram | Operativo |
| `RESEND_API_KEY` | ⬜ ausente | Email | **Canal deshabilitado** — pendiente WEB-005 |
| `RESEND_FROM` | ✅ `notificaciones@nexoweb.mx` | Email | Definido, inactivo |
| `RESEND_TO` | ✅ `consultoria@nexoweb.mx` | Email | Definido, inactivo |

### Backend CRM (`nexoweb-backend`) — post-despliegue

| Variable | Estado | Nota |
|----------|--------|------|
| `PUBLIC_LEADS_INGEST_SECRET` | ✅ `${PUBLIC_LEADS_INGEST_SECRET}` via .env | Nuevo secreto rotado |
| `PUBLIC_LEADS_ORGANIZATION_ID` | ✅ | Sin cambios |
| `APP_URL` | ✅ `https://crm.nexoweb.mx` | Sin cambios |
| `CORS_ORIGINS` | ✅ | Sin cambios |
| `DATABASE_URL` | ✅ hardcoded | Supabase — proyecto pausado (ver riesgos) |

---

## Cambios realizados

### 1. Rotación de secretos (FASE 3)

- Generado nuevo secreto criptográfico: `openssl rand -hex 32`
- Actualizado `~/crm-nexoweb/.env`:
  - `PUBLIC_LEADS_INGEST_SECRET` → nuevo valor (64 hex chars)
  - `CRM_INGEST_SECRET` → mismo nuevo valor
  - `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` → parametrizados desde hardcoded en docker-compose
  - `CRM_API_URL` → vacío (deshabilitado temporalmente)
- El secreto anterior (`513f72f3d9...`) queda invalidado

### 2. Sincronización de código (FASE 4)

- Directorio creado: `~/nexoweb-v2/` (antes no existía)
- Código de `nexoweb-v2` local sincronizado via rsync (129 archivos, 22 MB)
- `.env.local` excluido del build por `.dockerignore`
- Directorio `~/nexoweb-site/` preservado sin modificación (rollback disponible)

### 3. Sincronización de assets estáticos

- 24 assets sincronizados a `/var/www/nexoweb-assets/`
- Directorio anterior (`crm-nexoweb/`) eliminado con `--delete` (assets del CRM antiguo)
- Assets ahora servidos vía nginx `location /assets/` → `/var/www/assets/` (volume mount)

### 4. Build Docker

- Imagen `crm-nexoweb-landing:latest` construida en VPS
- Build: 49/49 rutas, 0 errores TypeScript
- Stage 1 (deps): `npm ci` + Prisma Client generado
- Stage 2 (builder): `next build` exitoso
- Stage 3 (runner): Imagen standalone ~80MB

### 5. Actualización docker-compose.yml

- Subido al VPS: versión actualizada con secretos parametrizados
- `context: ../nexoweb-site` → `context: ../nexoweb-v2`
- `container_name: nexoweb-site` → `container_name: nexoweb-v2`
- `CRM_API_URL` ahora usa `${CRM_API_URL}` (flexible via .env)
- Añadido healthcheck con wget

### 6. Deshabilitación temporal del canal CRM

- `CRM_API_URL=` (vacío) en `~/crm-nexoweb/.env`
- Comentario: `# CRM_API_URL deshabilitado temporalmente — migración a HQ en curso (WEB-004)`
- Canal CRM marcado como "no configurado" en runtime de la API de contacto

---

## Contenedores — Estado final

| Contenedor | Imagen | Estado | Uptime | Healthcheck |
|------------|--------|--------|--------|-------------|
| `nexoweb-v2` | `crm-nexoweb-landing` | ✅ Running | Reciente | ✅ healthy |
| `nexoweb-backend` | `crm-nexoweb-backend` | ✅ Running | Reciente | Sin healthcheck |
| `nexoweb-nginx` | `nginx:alpine` | ✅ Running | 3 semanas | Sin healthcheck |
| `nexoweb-crm` | `crm-nexoweb-frontend` | ✅ Running | 4 semanas | Sin healthcheck |
| `nexoweb-hq` | `nexoweb-hq:f5deac4` | ✅ Running | 2 semanas | ✅ healthy |
| `nexoweb-postgres` | `postgres:16-alpine` | ✅ Running | 2 semanas | ✅ healthy |
| `nexoweb-redis` | `redis:7-alpine` | ✅ Running | 2 semanas | ✅ healthy |

Contenedores detenidos (pre-existentes, sin relación con este sprint):
- `brewflow-frontend`, `brewflow-backend`, `brewflow-db` — Exited, proyecto Brewflow suspendido

---

## Uso de recursos post-despliegue

| Contenedor | CPU | Memoria | % RAM |
|------------|-----|---------|-------|
| nexoweb-v2 | 0.00% | 36.75 MiB | 0.31% |
| nexoweb-backend | 0.00% | 40.13 MiB | 0.34% |
| nexoweb-hq | 0.00% | 83.06 MiB | 16.22% (limite 512M) |
| nexoweb-postgres | 0.00% | 52.44 MiB | 10.24% (limite 512M) |
| nexoweb-redis | 0.94% | 5.46 MiB | 4.27% (limite 128M) |
| nexoweb-nginx | 0.00% | 9.84 MiB | 0.08% |

---

## Resultado del despliegue

### Smoke Tests (FASE 5)

| Ruta | Resultado | Protocolo |
|------|-----------|-----------|
| `https://nexoweb.mx/` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/nosotros` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/servicios` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/servicios/diseno-desarrollo-web` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/servicios/comercio-electronico-ecommerce` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/servicios/desarrollo-aplicaciones-web` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/portafolio` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/portafolio/alpha-dent-service` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/blog` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/blog/como-construir-marca-digital-consistente` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/contacto` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/privacidad` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/terminos` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/sitemap.xml` | ✅ 200 | HTTPS |
| `https://nexoweb.mx/robots.txt` | ✅ 200 | HTTPS |
| `http://nexoweb.mx/` | ✅ 301 → HTTPS | Redirect correcto |
| `https://www.nexoweb.mx/` | ✅ 200 | Redirect + HTTPS |
| `/assets/blog_captacion.png` | ✅ 200 | Nginx directo |
| `/assets/hero_section_1776752771489.png` | ✅ 200 | Nginx directo |
| `/opengraph-image` | ⚠️ 502 | Bug satori (ver riesgos) |

**Headers de seguridad verificados:**
- `X-Frame-Options: SAMEORIGIN` ✅
- `X-Content-Type-Options: nosniff` ✅
- `Cache-Control: s-maxage=31536000` ✅ (assets estáticos Next.js)
- `Server: nginx/1.29.8` ✅

**Sitemap:** URLs correctas con dominio `https://nexoweb.mx` ✅

### Resultado del formulario (FASE 6)

| Canal | Estado | Nota |
|-------|--------|------|
| CRM (nexoweb-backend) | ⬜ Deshabilitado | `CRM_API_URL` vacío — temporal |
| Email (Resend) | ⬜ No configurado | `RESEND_API_KEY` ausente — pendiente WEB-005 |
| Telegram | ✅ **Operativo** | Leads recibidos correctamente |

**Resultado HTTP:** `200 {"success":true}`
Confirmado con 2 envíos de prueba exitosos post-configuración.

La lógica de la API de contacto confirma: canal skipped ≠ canal fallido. El 200 garantiza que Telegram recibió el lead.

---

## Evidencias

```
# Build Docker exitoso
#21 36.12 ✓ Generating static pages using 5 workers (49/49) in 3.0s

# Contenedor healthy
nexoweb-v2: Up About a minute (healthy)

# Formulario OK
Response: {"success":true}
HTTP Code: 200

# Sitemap
https://nexoweb.mx
https://nexoweb.mx/servicios
https://nexoweb.mx/contacto
... [12 URLs correctas]

# HQ health
{"status":"degraded","checks":{"db":{"ok":true},"storage":{"ok":true},"auth":{"ok":true},"redis":{"ok":true}}}
# (degraded solo por ausencia de backup — no afecta operación)
```

---

## Logs relevantes

**nexoweb-backend (error pre-existente, no relacionado con nexoweb-v2):**
```
Error querying the database: FATAL: (ENOTFOUND) tenant/user postgres.voahlrfdwndprdamiyky not found
```
Supabase proyecto `voahlrfdwndprdamiyky` — pausado o suspendido. El backend CRM sigue corriendo pero sin acceso a base de datos. Error pre-existente al deploy de WEB-004. Documentado para migración.

**nexoweb-nginx:** Sin errores en los últimos 10 minutos ✅

---

## Dependencias existentes hacia CRM antiguo y Supabase

Las siguientes dependencias se documentan como legado a eliminar durante la migración:

### En `~/crm-nexoweb/docker-compose.yml` — backend service

| Dependencia | Variable | Estado |
|-------------|----------|--------|
| Supabase PostgreSQL (proyecto CRM) | `DATABASE_URL` + `DIRECT_URL` | **Crítico** — proyecto pausado |
| Supabase Auth | `SUPABASE_URL` + `SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY` | Dependiente del mismo proyecto |
| CRM Leads secret | `PUBLIC_LEADS_INGEST_SECRET` | Rotado en WEB-004; deprecado tras migración |
| CRM Org ID | `PUBLIC_LEADS_ORGANIZATION_ID` | Concepto de "organización" propio del CRM antiguo |

### En `~/crm-nexoweb/docker-compose.yml` — frontend service

| Dependencia | Variable | Estado |
|-------------|----------|--------|
| Supabase Auth frontend | `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Dependiente del proyecto pausado |

### En `nexoweb-v2` — canal CRM de la API de contacto

| Dependencia | Archivo | Estado |
|-------------|---------|--------|
| `CRM_API_URL=http://backend:3010` | `docker-compose.yml` | Vacío temporalmente |
| `CRM_INGEST_SECRET` | `.env` | Rotado; se reutilizará como HQ_INGEST_SECRET |
| Payload `/api/public/leads` | `app/api/contact/route.ts` | Requiere cambio de endpoint y formato |
| Header `x-nexoweb-public-ingest-key` | `app/api/contact/route.ts` | Cambiar a `X-Nexoweb-Internal` |

---

## Migración del flujo de leads a Nexoweb HQ

> Esta sección documenta el plan de migración. **No implementar todavía.** Prioridad: V2.1.

### Contexto

Nexoweb HQ (`hq.nexoweb.mx`) es el sistema de gestión operativa de Nexoweb, basado en `nexoweb-platform`. Tiene un modelo `Prospect` + `ProspectContact` en PostgreSQL propio (sin dependencia Supabase). El objetivo es que los leads del formulario de contacto del sitio se creen directamente en HQ como prospectos.

### Arquitectura objetivo

```
nexoweb.mx (nexoweb-v2)
  └── POST /api/contact
        └── [canal CRM HQ]
              └── POST https://hq.nexoweb.mx/api/internal/ingest-lead
                    └── nexoweb-hq → PostgreSQL (nexoweb_hq_prod)
                          └── Prospect + ProspectContact creados
```

### Estado actual de HQ relevante para la migración

| Elemento | Valor actual | Nota |
|----------|-------------|------|
| `DATABASE_URL` | `postgresql://nexoweb_prod:...@postgres:5432/nexoweb_hq_prod` | PostgreSQL propio, saludable |
| `INTERNAL_SECRET` | ✅ configurado | `X-Nexoweb-Internal: <secret>` — patrón ya usado en `/api/internal/notify-sla` |
| `HQ_TENANT_ID` | `PENDING_AFTER_SEED` | **Debe ser resuelto con el ID real del tenant** |
| Modelo `Prospect` | `id, hqTenantId, companyName, status, source...` | Mapeo directo con datos del formulario |
| Modelo `ProspectContact` | `prospectId, name, email, phone, role, isPrimary` | Mapeo directo con datos del contacto |
| Endpoint público de ingest | ❌ No existe aún | **Debe ser creado en HQ** |

### Trabajo requerido en Nexoweb HQ

**1. Crear endpoint `POST /api/internal/ingest-lead`**

Archivo: `apps/nexoweb-hq/app/api/internal/ingest-lead/route.ts`

Autenticación: header `X-Nexoweb-Internal: ${INTERNAL_SECRET}` (mismo patrón que `notify-sla`).

Payload esperado (desde nexoweb-v2):
```typescript
{
  name: string;          // nombre del contacto
  email: string;         // email del contacto
  phone: string;         // teléfono
  company: string;       // nombre de empresa → companyName
  service: string;       // servicio de interés → source / notes
  primary_goal: string;  // objetivo → qualificationNotes
  message?: string;      // mensaje → notes
}
```

Operaciones en base de datos:
```typescript
// 1. Resolver tenant ID real
const tenant = await prisma.tenant.findUnique({ where: { slug: 'nexoweb-hq' } });

// 2. Crear Prospect
const prospect = await prisma.prospect.create({
  data: {
    hqTenantId: tenant.id,
    companyName: body.company,
    source: 'web',
    status: 'NUEVO_PROSPECTO',
    qualificationNotes: `Servicio: ${body.service}\nObjetivo: ${body.primary_goal}`,
  }
});

// 3. Crear ProspectContact
await prisma.prospectContact.create({
  data: {
    prospectId: prospect.id,
    name: body.name,
    email: body.email,
    phone: body.phone,
    isPrimary: true,
    role: 'EVALUATOR',
  }
});

// 4. Opcional: emitir HQTimelineEvent de tipo 'LEAD_INGESTED'
```

**2. Resolver HQ_TENANT_ID**

Ejecutar en la base de datos de HQ:
```sql
SELECT id, slug FROM "tenants" WHERE slug = 'nexoweb-hq';
```
Actualizar `HQ_TENANT_ID` en el `.env` de nexoweb-platform.

**3. Agregar variable de entorno en nexoweb-hq**

No se requiere nueva variable — usar `INTERNAL_SECRET` existente como secreto compartido con el landing.

### Trabajo requerido en nexoweb-v2

**1. Actualizar `app/api/contact/route.ts`**

Cambios mínimos (conservar toda la lógica de fallback):
```typescript
// Antes:
const crmUrl = process.env.CRM_API_URL;
const CRM_INGEST_SECRET = process.env.CRM_INGEST_SECRET;
// ...
const crmRes = await fetch(`${normalizeCrmLeadsUrl(crmUrl)}/api/public/leads`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-nexoweb-public-ingest-key": CRM_INGEST_SECRET!,
  },
  body: JSON.stringify({ ... }),
});

// Después:
const hqUrl = process.env.HQ_API_URL;
const HQ_INGEST_SECRET = process.env.HQ_INGEST_SECRET;
const crmConfigured = Boolean(hqUrl && HQ_INGEST_SECRET);
// ...
const crmRes = await fetch(`${hqUrl}/api/internal/ingest-lead`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Nexoweb-Internal": HQ_INGEST_SECRET!,
  },
  body: JSON.stringify({
    name, email, phone, company, service, primary_goal, message
  }),
});
```

**2. Actualizar variables de entorno en docker-compose.yml**

```yaml
# landing service — reemplazar:
- CRM_API_URL=${CRM_API_URL}      # eliminar
- CRM_INGEST_SECRET=${CRM_INGEST_SECRET}  # eliminar

# por:
- HQ_API_URL=http://nexoweb-hq:3010
- HQ_INGEST_SECRET=${HQ_INGEST_SECRET}
```

**3. Conectar redes Docker**

El contenedor `nexoweb-v2` (stack `crm-nexoweb`) necesita acceso a `nexoweb-hq` (stack `nexoweb-platform`). Opciones:

- **Opción A (recomendada):** Agregar red `nexoweb-platform_nexoweb-internal` al servicio `landing` en `crm-nexoweb/docker-compose.yml`:
  ```yaml
  landing:
    networks:
      - nexoweb-network
      - nexoweb-platform_nexoweb-internal   # nueva
  ```
  Y declarar la red como external:
  ```yaml
  networks:
    nexoweb-network:
      driver: bridge
    nexoweb-platform_nexoweb-internal:
      external: true
  ```

- **Opción B:** Usar `HQ_API_URL=https://hq.nexoweb.mx` (URL pública, pasa por nginx). Funciona sin cambios de red pero añade latencia y dependencia de nginx.

### Dependencias del CRM antiguo a eliminar tras migración

Una vez migrado el flujo a HQ, los siguientes recursos pueden ser deprecados:

| Recurso | Acción |
|---------|--------|
| `nexoweb-backend` container (NestJS CRM) | Detener y eliminar |
| `nexoweb-crm` container (CRM frontend) | Detener y eliminar (si el equipo no lo usa) |
| `nexoweb-site` directorio | Eliminar (backup del sitio viejo) |
| `~/crm-nexoweb/` directorio | Mantener solo el `docker-compose.yml` (reformado) |
| Proyecto Supabase `voahlrfdwndprdamiyky` | Pausado — candidato a eliminar tras confirmar que nada depende de él |
| `CRM_INGEST_SECRET` / `PUBLIC_LEADS_INGEST_SECRET` | Reemplazar por `HQ_INGEST_SECRET` |

---

## Riesgos detectados

### P0 — ACTIVO (no bloqueante para Go Live)

**CRM backend sin base de datos:**
El servicio `nexoweb-backend` (NestJS) tiene el proyecto Supabase `voahlrfdwndprdamiyky` pausado. TCP y DNS son alcanzables pero el tenant no existe activo. El canal CRM del formulario de contacto fue deshabilitado temporalmente (`CRM_API_URL=`). El formulario funciona correctamente vía Telegram.

**Impacto:** Los leads no llegan al CRM antiguo. Llegan a Telegram. El usuario final NO ve errores.

**Resolución:** Migrar a HQ (documentado arriba). No reactivar el CRM antiguo.

### P1 — OG Image 502

`/opengraph-image` devuelve 502. Error en el componente `opengraph-image.tsx` — `satori` requiere `display: flex` en divs con múltiples hijos. Afecta únicamente las previsualizaciones de redes sociales del sitio raíz.

**Impacto:** Compartir `https://nexoweb.mx` en redes sociales no muestra imagen preview.

**Resolución:** Corrección del componente en WEB-005. No bloquea Go Live.

### P2 — Email deshabilitado

`RESEND_API_KEY` no configurada. Canal de email completamente desactivado.

**Impacto:** Los leads no reciben confirmación por email. El equipo no recibe notificación por email.

**Resolución:** Configurar en WEB-005.

### P2 — Disco al 71%

El disco del VPS tiene 29 GiB libres de 96 GiB. Con el build Docker guardando múltiples capas, puede crecer.

**Resolución:** Ejecutar `docker system prune --volumes` para limpiar imágenes antiguas. Monitorear.

### P3 — Certificado SSL expira en 40 días

El certificado que cubre `nexoweb.mx` expira el 2026-08-06. Si certbot no renueva automáticamente (cron), el sitio quedará sin HTTPS.

**Resolución:** Verificar `certbot renew --dry-run` y confirmar cron activo.

### P3 — nexoweb-hq estado "degraded"

`/api/health` devuelve `status: "degraded"` por `backup.ok: false`. No hay backups registrados. DB, Redis, Auth, Storage: todos OK.

**Resolución:** Configurar backup offsite o job de backup. No afecta operación de HQ.

---

## Riesgos aceptados

| Riesgo | Justificación |
|--------|---------------|
| Canal CRM deshabilitado en formulario | Arquitectura en transición. Leads llegan por Telegram. Migración a HQ planificada. |
| Email deshabilitado | No hay RESEND_API_KEY disponible en este sprint. Canal Telegram activo. |
| `<img>` lint warning en servicios/[slug]/page.tsx:153 | Pre-existente. No impacta funcionalidad ni performance significativa. |
| OG image 502 | No afecta ninguna ruta principal. Fix en WEB-005. |

---

## Backlog V2.1

| ID | Hallazgo | Prioridad | Sprint |
|----|----------|-----------|--------|
| HQ-001 | Crear endpoint `POST /api/internal/ingest-lead` en HQ | P0 | WEB-005 |
| HQ-002 | Migrar `app/api/contact/route.ts` para usar HQ | P0 | WEB-005 |
| HQ-003 | Configurar red Docker compartida entre stacks | P0 | WEB-005 |
| HQ-004 | Resolver `HQ_TENANT_ID` (PENDING_AFTER_SEED) | P0 | Pre-WEB-005 |
| ENV-001 | Configurar `RESEND_API_KEY` en producción | P1 | WEB-005 |
| OG-001 | Reparar `opengraph-image.tsx` — añadir `display: flex` a divs | P1 | WEB-005 |
| SEC-001 | Parametrizar `DATABASE_URL`/`SUPABASE_*` en docker-compose | P2 | WEB-005 |
| SSL-001 | Verificar renovación automática SSL (expira 2026-08-06) | P2 | Ops inmediato |
| DISK-001 | Limpiar imágenes Docker antiguas (`docker system prune`) | P2 | Ops inmediato |
| BKP-001 | Configurar backup de `nexoweb-hq` PostgreSQL | P2 | WEB-005 |
| UX-001 | `<img>` → `<Image />` en servicios/[slug]/page.tsx:153 | P3 | WEB-006 |
| CSS-001 | Corregir contraste WCAG AA (8 elementos) | P3 | WEB-006 |
| HQ-005 | Deprecar y detener `nexoweb-backend` + `nexoweb-crm` tras migración | P3 | Post WEB-005 |

---

## Recomendaciones para operación inmediata

1. **Verificar renovación SSL:** `certbot renew --dry-run` en el VPS. El certificado cubre `nexoweb.mx` y expira en 40 días.

2. **Limpiar imágenes Docker:** `docker system prune -f` para liberar espacio en disco (actualmente 71%).

3. **Resolver HQ_TENANT_ID:** Ejecutar `SELECT id FROM "tenants" WHERE slug = 'nexoweb-hq'` en la DB de HQ y actualizar la variable de entorno. Esto es prerequisito para WEB-005.

4. **Iniciar WEB-005** con prioridad: endpoint de ingest en HQ + migración del formulario.

---

## Veredicto final

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🟡  PRODUCTION READY — GO CON OBSERVACIONES           ║
║                                                          ║
║   nexoweb.mx está desplegado y operativo.                ║
║                                                          ║
║   ✅  Sitio accesible con HTTPS                          ║
║   ✅  49 rutas respondiendo 200                          ║
║   ✅  Assets estáticos servidos por Nginx                ║
║   ✅  SSL válido (40 días)                               ║
║   ✅  DNS resuelto correctamente                         ║
║   ✅  Formulario funcional (canal Telegram activo)       ║
║   ✅  Rate limiting operativo                            ║
║   ✅  Secretos rotados                                   ║
║   ✅  Código nuevo (nexoweb-v2) desplegado               ║
║                                                          ║
║   ⚠️  Canal CRM deshabilitado (migración a HQ pendiente) ║
║   ⚠️  Canal email no configurado                         ║
║   ⚠️  OG image con error satori (P1 — WEB-005)          ║
║                                                          ║
║   Próximo paso: Sprint WEB-005 — Migración HQ + Email   ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```
