# WEB-PROD-001 — Production Readiness Assessment
**Proyecto:** Nexoweb V2 — nexoweb.mx
**Fecha:** 2026-06 (sesión anterior a WEB-002)
**Rol:** Principal Software Architect / Auditor
**Modo:** Exclusivamente lectura — sin modificar código, sin instalar dependencias, sin ejecutar builds externos

---

## Objetivo

Realizar una evaluación de preparación para producción del sitio Nexoweb V2 en 5 fases. Determinar si el código y la configuración están listos para un despliegue controlado.

---

## Estado inicial

- **Repositorio:** `/Volumes/DESARROLLO NEXOWEB/DESARROLLOS - ECOSISTEMAS/nexoweb-v2/`
- **Estado del código:** Desarrollo finalizado, pendiente de auditoría pre-producción
- **Sitio activo en producción:** No (la versión anterior `nexoweb-site` estaba en VPS)

---

## Stack auditado

| Componente | Versión |
|------------|---------|
| Next.js | 16.2.4 |
| React | 19.2.4 |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| Prisma | 5.22.0 (declarado, no activo) |
| Resend | 6.12.2 |
| Lucide React | 1.8.0 |
| Docker output | standalone |

---

## Arquitectura identificada

- **App Router** de Next.js 16
- **SSG** para rutas de servicios, blog y portafolio
- **API Route dinámica** para formulario de contacto (`/api/contact`)
- **Entrega tri-canal:** CRM (`/api/public/leads`) + Email (Resend) + Telegram
- **Docker standalone:** imagen autónoma con `server.js`
- **Nginx como reverse proxy:** definido en `crm-nexoweb/deploy/nginx/conf.d/nexoweb.conf`

---

## Fase 1 — Inventario de rutas

**Total de rutas identificadas:** 49

| Tipo | Descripción |
|------|-------------|
| Static (○) | `/`, `/_not-found`, `/blog`, `/contacto`, `/nosotros`, `/portafolio`, `/privacidad`, `/servicios`, `/sitemap.xml`, `/terminos` |
| SSG (●) | `/blog/[slug]` ×3, `/portafolio/[slug]` ×2, `/servicios/[slug]` ×31+ |
| Dynamic (ƒ) | `/api/contact`, `/opengraph-image` |

---

## Fase 2 — Auditoría SEO

**Hallazgos:**

| Elemento | Estado | Detalle |
|----------|--------|---------|
| `sitemap.xml` | ✅ | Generado dinámicamente con rutas correctas |
| `robots.txt` | ✅ | `Allow: /` con referencia a sitemap |
| Meta tags | ✅ | Configurados en `layout.tsx` |
| Open Graph | ⚠️ | `opengraph-image.tsx` usa edge runtime |
| `apple-touch-icon` | ⚠️ | Referencia a SVG en lugar de PNG (P3) |
| Canonical URLs | ⬜ | Depende de `NEXT_PUBLIC_SITE_URL` en runtime |

---

## Fase 3 — Auditoría de seguridad

**Hallazgos críticos:**

| ID | Hallazgo | Severidad |
|----|----------|-----------|
| P0-001 | Aparente discrepancia nginx `/var/www/assets/` vs rsync `/var/www/nexoweb-assets/` | P0 (luego confirmado falso positivo en WEB-003) |
| P0-002 | Dos secretos hardcodeados en `crm-nexoweb/docker-compose.yml` | P0 — REAL |
| P0-003 | Lógica de entrega tri-canal del formulario — revisión requerida | P0 (luego confirmado correcto en WEB-003) |

**Variables de entorno auditadas:**

Archivo `.env.local` analizado:
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_0QovZ_...  ← huérfana
NEXT_PUBLIC_SUPABASE_URL=https://vijzsdgxwzkxfviacxvy.supabase.co  ← huérfana
TELEGRAM_BOT_TOKEN=...  ← activa
TELEGRAM_CHAT_ID=...  ← activa
NEXT_PUBLIC_CRM_URL=http://localhost:3002  ← huérfana
CRM_API_URL=http://localhost:3002  ← activa
CRM_INGEST_SECRET=dev_ingest_key_2026  ← activa
```

Archivo `.env.example` analizado:
- Contiene: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `CRM_API_URL`, `CRM_INGEST_SECRET`, `DATABASE_URL` (comentado)
- NO contiene variables huérfanas de Supabase ✅

---

## Fase 4 — Auditoría de rendimiento y accesibilidad

**Hallazgos:**

| ID | Hallazgo | Severidad |
|----|----------|-----------|
| P2-001 | 8 elementos con contraste insuficiente (WCAG AA) | P2 |
| P2-002 | Falta `<link rel="preconnect">` para `images.unsplash.com` | P2 |
| P2-003 | Sección Blog ausente de homepage | P2 |
| P3-001 | `apple-touch-icon` referencia SVG en lugar de PNG | P3 |
| P3-002 | `formatCurrency` exportado sin consumidores (deuda técnica) | P3 |

---

## Fase 5 — Revisión de configuración Docker y nginx

**Hallazgos:**

- `Dockerfile` — multistage build correcto (deps → builder → runner)
- `next.config.ts` — `output: 'standalone'` configurado ✅
- `HEALTHCHECK` — configurado en Dockerfile ✅
- Nginx config — `location /assets/` con `alias /var/www/assets/` — inicialmente flagged como P0, resuelto como falso positivo en WEB-003

**Archivo `proxy.ts` identificado:**
- Existía en raíz del proyecto
- Nombre incorrecto (debe ser `middleware.ts`)
- Export incorrecto (debe ser `default` o `middleware`)
- Nunca ejecutado por Next.js
- Flagged para eliminación en WEB-003

---

## Lógica de entrega del formulario de contacto

```typescript
// app/api/contact/route.ts — flujo verificado

const crmConfigured = Boolean(crmUrl && CRM_INGEST_SECRET);
const emailConfigured = Boolean(resend);
const telegramConfigured = Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID);
const anyConfigured = crmConfigured || emailConfigured || telegramConfigured;

const crmOk = !crmConfigured || channels.crm;
const emailOk = !emailConfigured || channels.email;
const telegramOk = !telegramConfigured || channels.telegram;
const deliveryOk = crmOk && emailOk && telegramOk;

// Si anyConfigured && !deliveryOk → 502 "Escríbenos por WhatsApp"
// Si !anyConfigured → 503 "Servicio temporalmente no disponible"
// Si todos los canales configurados OK → 200 { success: true }
```

**Matriz de comportamiento verificada:**

| CRM | Email | Telegram | Resultado |
|-----|-------|----------|-----------|
| ✅ configurado + OK | ✅ | ✅ | 200 success |
| ✅ configurado + FAIL | ✅ | ✅ | 502 |
| no configurado | ✅ | ✅ | 200 (CRM omitido) |
| no configurado | no configurado | no configurado | 503 |

---

## Archivos modificados

**Ninguno.** Este sprint fue exclusivamente de lectura y auditoría.

---

## Veredicto

**🟡 LISTO CON OBSERVACIONES**

El código está técnicamente preparado para producción. Se identificaron 2 bloqueadores reales (P0-002: secretos hardcodeados), 1 falso positivo (P0-001), 4 hallazgos P2 y 2 hallazgos P3. El sitio puede desplegarse una vez aplicados los fixes P0.

Aprobado para avanzar a WEB-002 (Go Live Audit completo).
