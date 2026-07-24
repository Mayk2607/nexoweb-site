# WEB-003 — Production Hardening Report
**Nexoweb V2 — nexoweb.mx**
Fecha: 2026-06-27 | Estado: COMPLETADO

---

## Objetivo

Aplicar únicamente las correcciones confirmadas como P0 y limpieza controlada identificadas en el Sprint WEB-002 (Go Live Audit). Sin nuevas funcionalidades, sin cambios de diseño, sin refactors especulativos.

---

## Alcance

| Incluido | Excluido |
|----------|----------|
| Eliminar secretos hardcodeados de docker-compose | Credenciales DB/Supabase en docker-compose (V2.1 backlog) |
| Eliminar archivo muerto `proxy.ts` | Correcciones P2/P3 (contraste, preconnect, CSP) |
| Limpiar variables huérfanas en `.env.local` | Analytics, CMS, Lighthouse tuning |
| Validación build + lint | Cambios de diseño o arquitectura |

---

## Cambios Realizados

### 1. `crm-nexoweb/docker-compose.yml` — Secretos parametrizados

**Problema confirmado (P0-002):** Dos variables de entorno con el mismo secreto de 64 caracteres hardcodeado en texto plano en repositorio Git.

**Cambios:**
```diff
# backend service
- - PUBLIC_LEADS_INGEST_SECRET=<SECRETO ROTADO -- ver WEB-004, valor invalidado y verificado operativamente el 2026-07-24>
+ - PUBLIC_LEADS_INGEST_SECRET=${PUBLIC_LEADS_INGEST_SECRET}

# landing service
- - CRM_INGEST_SECRET=<SECRETO ROTADO -- ver WEB-004, valor invalidado y verificado operativamente el 2026-07-24>
+ - CRM_INGEST_SECRET=${CRM_INGEST_SECRET}
```

**Contexto:** `CRM_INGEST_SECRET` (landing → backend) y `PUBLIC_LEADS_INGEST_SECRET` (backend lo valida) son el mismo secreto compartido. Ambos deben rotarse simultáneamente.

**Procedimiento de rotación en producción:**
```bash
# 1. Generar nuevo secreto
openssl rand -hex 32

# 2. Actualizar en el host VPS (archivo .env o variables de entorno del sistema)
#    Deben coincidir: PUBLIC_LEADS_INGEST_SECRET y CRM_INGEST_SECRET

# 3. Rebuild y restart únicamente de los dos servicios afectados
docker-compose up -d --build backend landing

# 4. Verificar ingest vía formulario de contacto
```

---

### 2. `nexoweb-v2/proxy.ts` — Archivo muerto eliminado

**Problema:** Archivo en raíz del proyecto con código de middleware Next.js nunca ejecutado.

**Evidencia de que nunca se ejecutó:**
- Nombre de archivo incorrecto: debe ser `middleware.ts`, no `proxy.ts`
- Export incorrecto: export nombrado `proxy()`, debe ser `default` o `middleware`
- Cero referencias en todo el codebase (grep confirmado)
- Next.js ignora completamente este archivo

**Acción:** Eliminado sin riesgo de regresión.

---

### 3. `nexoweb-v2/.env.local` — Variables huérfanas eliminadas

**Eliminadas** (cero referencias en codebase, arquitectura Supabase abandonada):
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_0QovZ_...
NEXT_PUBLIC_SUPABASE_URL=https://vijzsdgxwzkxfviacxvy.supabase.co
NEXT_PUBLIC_CRM_URL=http://localhost:3002
```

**Conservadas** (activas en `app/api/contact/route.ts`):
```
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
CRM_API_URL
CRM_INGEST_SECRET
```

---

## Hallazgos Descartados (Falsos Positivos)

### P0-001 — Discrepancia de rutas nginx/rsync

**Auditoría WEB-002 reportó:** `alias /var/www/assets/` en nginx vs target `/var/www/nexoweb-assets/` en rsync — aparente mismatch crítico.

**Investigación WEB-003:** El docker-compose.yml define un volume mount en el servicio nginx:
```yaml
volumes:
  - /var/www/nexoweb-assets:/var/www/assets:ro
```

Este mount es el puente intencional: rsync deposita en `/var/www/nexoweb-assets/` (ruta del host), nginx lee `/var/www/assets/` (ruta del contenedor). Ambas rutas son correctas en su contexto. **No se requirió ningún cambio.**

---

## Riesgos Eliminados

| ID | Riesgo | Severidad |
|----|--------|-----------|
| P0-002 | Secreto compartido landing↔backend expuesto en Git | Crítico → Eliminado |
| — | Archivo con código muerto generando confusión y falsa seguridad | Bajo → Eliminado |
| — | Variables de arquitectura abandonada en entorno de desarrollo | Bajo → Eliminado |

---

## Riesgos Aceptados (No Modificados)

| Riesgo | Justificación |
|--------|---------------|
| `<img>` en servicios/[slug]/page.tsx:153 (lint warning) | Preexistente, fuera de alcance WEB-003. No introduce regresión. |

---

## Riesgos Postergados — Backlog V2.1

### Alta prioridad (completar antes del primer ciclo de facturación)

**docker-compose.yml — Credenciales Supabase/DB hardcodeadas:**
```
DATABASE_URL       postgresql://postgres.voahlrfdwndprdamiyky:vwN0WVD2...
DIRECT_URL         postgresql://postgres.voahlrfdwndprdamiyky:vwN0WVD2...
SUPABASE_SERVICE_ROLE_KEY  sb_secret_Nzl3pVbchaEtw7Iu...
SUPABASE_ANON_KEY  (frontend y backend services)
```
Misma naturaleza que P0-002 pero pertenecen al stack CRM, no al landing. Alcance WEB-003 limitado a nexoweb-v2 y lo estrictamente necesario en docker-compose.

### Media prioridad

| ID | Hallazgo | Tipo |
|----|----------|------|
| P2-001 | 8 elementos con contraste insuficiente WCAG AA | Accesibilidad |
| P2-002 | Falta `<link rel="preconnect">` para images.unsplash.com | Rendimiento |
| P2-003 | Sección Blog ausente de homepage | UX |
| P2-004 | Content-Security-Policy header no configurado en nginx | Seguridad |

### Baja prioridad

| ID | Hallazgo | Tipo |
|----|----------|------|
| P3-001 | apple-touch-icon referencia SVG en lugar de PNG | SEO/iOS |
| P3-002 | `formatCurrency` exportado pero sin consumidores | Deuda técnica |

---

## Evidencias de Validación

### Build de producción
```
▲ Next.js 16.2.4 (Turbopack)
✓ Compiled successfully in 10.2s
✓ TypeScript: 0 errores
✓ Generating static pages (49/49) in 1367ms
```

### Distribución de rutas (49 total)
- Static (○): /, /_not-found, /blog, /contacto, /nosotros, /portafolio, /privacidad, /servicios, /sitemap.xml, /terminos
- SSG (●): /blog/[slug] ×3, /portafolio/[slug] ×2, /servicios/[slug] ×31+
- Dynamic (ƒ): /api/contact, /opengraph-image

### ESLint
```
✖ 1 problem (0 errors, 1 warning)
```
Warning preexistente en servicios/[slug]/page.tsx:153, sin relación con cambios de este sprint.

---

## Archivos Modificados

| Archivo | Acción | Razón |
|---------|--------|-------|
| `crm-nexoweb/docker-compose.yml` | Modificado | Parametrizar 2 secretos hardcodeados |
| `nexoweb-v2/proxy.ts` | Eliminado | Archivo muerto, nunca ejecutado |
| `nexoweb-v2/.env.local` | Modificado | Eliminar 3 variables huérfanas |

**Archivos NO modificados por decisión explícita:**
- `crm-nexoweb/deploy/nginx/conf.d/nexoweb.conf` — P0-001 es falso positivo
- `nexoweb-v2/scripts/sync-assets-to-vps.sh` — correcta en su contexto
- `nexoweb-v2/app/api/contact/route.ts` — lógica de entrega tri-canal correctamente implementada
- `nexoweb-v2/.env.example` — ya estaba limpio

---

## Recomendaciones Para Despliegue

1. **Rotar el secreto compartido** antes de `docker-compose up`. El valor actual (`513f72f3d9...`) estuvo expuesto en Git. Generar uno nuevo con `openssl rand -hex 32` y actualizar en el host VPS como variables de entorno del sistema o en un archivo `.env` junto al `docker-compose.yml`.

2. **Verificar que el archivo `.env` del VPS** contenga las variables ahora parametrizadas:
   ```
   PUBLIC_LEADS_INGEST_SECRET=<nuevo_secreto>
   CRM_INGEST_SECRET=<mismo_nuevo_secreto>
   RESEND_API_KEY=<valor_producción>
   TELEGRAM_BOT_TOKEN=<valor_producción>
   TELEGRAM_CHAT_ID=<valor_producción>
   ```

3. **Smoke test post-deploy:** Enviar un lead de prueba desde el formulario de contacto y verificar recepción en los 3 canales (CRM, email, Telegram).

4. **Programar V2.1** para parametrizar las credenciales Supabase/DB restantes en docker-compose (alta prioridad, aunque no son del landing).

---

## Veredicto Final

**GO** — Con las correcciones de este sprint aplicadas y la rotación del secreto ejecutada antes del despliegue.

El sitio nexoweb.mx está listo para producción. Los riesgos P0 han sido eliminados o documentados como falsos positivos con evidencia. Los riesgos P2/P3 postergados no bloquean el lanzamiento.
