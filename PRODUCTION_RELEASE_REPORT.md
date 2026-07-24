# PRODUCTION RELEASE REPORT — Nexoweb V2 RC1

**Versión:** 2.0.0-rc1  
**Fecha:** 26 de junio de 2026  
**Dominio objetivo:** https://nexoweb.mx  
**Estado final:** ❌ **NO GO** (cutover pendiente en VPS)

---

## Resumen ejecutivo

Nexoweb V2 completó la fase **Release Candidate (RC1)** a nivel de código e infraestructura local. El build de producción, TypeScript, ESLint (0 errores), imagen Docker y auditoría de assets pasaron correctamente. Se corrigieron bugs críticos de integración (URL CRM duplicada `/api/api/`), seguridad del formulario y configuración de deploy.

**El sitio NO debe reemplazar aún producción** porque faltan pasos obligatorios en el VPS Contabo: sincronización de assets, configuración de `RESEND_API_KEY` en el contenedor, despliegue del contenedor `landing` reconstruido y smoke test E2E en el entorno Docker real.

El catálogo comercial queda **congelado** — no se modificaron servicios, precios, FAQs, metadata comercial ni diseño.

---

## Fase 1 — Auditoría previa al despliegue

| Check | Resultado | Evidencia |
|-------|-----------|-----------|
| ✅ Build | PASS | `npm run build` — 49 rutas, 0 errores |
| ✅ TypeScript | PASS | Incluido en `next build` — 0 errores |
| ✅ ESLint | PASS | 0 errores, 1 warning (`no-img-element` en servicios) |
| ✅ Docker | PASS | `docker build -t nexoweb-v2-rc1 .` exitoso |
| ⚠️ Variables de entorno | PARCIAL | `.env.local` sin `RESEND_API_KEY` |
| ✅ Sitemap | PASS | `/sitemap.xml` — 51 URLs (incl. privacidad/términos) |
| ✅ Robots | PASS | `public/robots.txt` + 200 OK |
| ✅ Open Graph | PASS | `app/opengraph-image.tsx` (edge, 1200×630) |
| ✅ Schema.org | PASS | `LocalBusiness` en `app/layout.tsx` |
| ✅ Assets | PASS | `scripts/audit-assets.sh` — 24/24 archivos |
| ✅ Imágenes | PASS | Unsplash (servicios) + `/assets/` (portafolio/blog) |
| ✅ Formularios | PASS | Validación HTML + API alineados |
| ⚠️ API Contact | PARCIAL | 502 en local — CRM/Telegram no alcanzables desde dev |
| ✅ WhatsApp | PASS | Botón flotante + enlaces `wa.me/5218447993983` |
| ✅ Portafolio | PASS | 2 casos SSG |
| ✅ Blog | PASS | 3 artículos SSG |
| ✅ Páginas legales | PASS | `/privacidad`, `/terminos` |

---

## Fase 2 — Congelamiento comercial

**Estado: CONFIRMADO ✅**

- No se modificó `config/data.ts`, `config/service-extras.ts`, ni contenido comercial.
- `revision-comercial.md` permanece como referencia; el catálogo publicado en RC1 es el estado actual del código.
- Cambios posteriores comerciales → versión futura (V2.1+).

---

## Fase 3 — Infraestructura

### Cambios aplicados

| Archivo | Cambio |
|---------|--------|
| `crm-nexoweb/docker-compose.yml` | `context: ../nexoweb-v2`, contenedor `nexoweb-v2`, CRM interno `http://backend:3010` |
| `crm-nexoweb/deploy-prod.sh` | Rsync a `~/nexoweb-v2` |
| `nexoweb-deploy/projects/nexoweb-site.conf` | Apunta a `nexoweb-v2` |
| `nexoweb-deploy/projects/nexoweb-v2.conf` | Config dedicada RC1 |
| `nexoweb-deploy/core/assets_mgr.sh` | Sync desde `public/assets/` |
| `nexoweb-v2/docker-compose.yml` | Sin Postgres (no usado), healthcheck |
| `nexoweb-v2/Dockerfile` | HEALTHCHECK + `wget` |
| `nexoweb-v2/next.config.ts` | Security headers, compress, cache `/assets/` |

### Validaciones

| Componente | Estado |
|------------|--------|
| Next Standalone | ✅ `output: "standalone"` |
| Nginx reverse proxy | ✅ Sin cambios — `landing:3003` (servicio Docker) |
| SSL | ✅ Let's Encrypt existente en VPS |
| Reverse Proxy | ✅ `resolver 127.0.0.11` dinámico |
| Compresión | ✅ `compress: true` (Next) + gzip Nginx |
| Headers | ✅ X-Frame-Options, nosniff, Referrer-Policy |
| Cache assets | ✅ 30 días en Next headers + Nginx alias |
| Healthcheck | ✅ Docker HEALTHCHECK en landing |
| Referencias `nexoweb-site` en deploy activo | ✅ Eliminadas |

**Bug corregido:** `CRM_API_URL=https://api.nexoweb.mx/api` generaba `/api/api/public/leads`. Ahora usa `http://backend:3010` (red interna) con normalización en API.

---

## Fase 4 — Assets

| Recurso | Local | Producción actual |
|---------|-------|-------------------|
| `/assets/*` (24 archivos, ~16 MB) | ✅ | ❌ 404 en nexoweb.mx |
| Logos SVG | ✅ | ✅ (desde Next) |
| Favicon | ✅ | ✅ |
| OG Image | ✅ dinámico | N/A hasta deploy |
| Manifest PWA | ⚠️ No existe | Opcional post-RC1 |

**Script de sync:** `nexoweb-v2/scripts/sync-assets-to-vps.sh`  
**Deploy:** `./nexo-deploy.sh assets nexoweb-v2`

---

## Fase 5 — Variables de entorno

| Variable | Requerida | Local (.env.local) | VPS (docker-compose) |
|----------|-----------|--------------------|-----------------------|
| `NEXT_PUBLIC_SITE_URL` | ✅ | — | ✅ `https://nexoweb.mx` |
| `RESEND_API_KEY` | ✅ | ❌ Falta | ⚠️ `${RESEND_API_KEY}` |
| `RESEND_FROM` | ✅ | — | ✅ |
| `RESEND_TO` | ✅ | — | ✅ |
| `TELEGRAM_BOT_TOKEN` | ✅ | ✅ | ✅ |
| `TELEGRAM_CHAT_ID` | ✅ | ✅ | ✅ |
| `CRM_API_URL` | ✅ | ✅ | ✅ `http://backend:3010` |
| `CRM_INGEST_SECRET` | ✅ | ✅ | ✅ |

**Acción requerida:** Exportar `RESEND_API_KEY` en el VPS antes del cutover:
```bash
export RESEND_API_KEY=re_xxxx
cd ~/crm-nexoweb && docker compose up -d --build landing
```

---

## Fase 6 — Integración de leads (E2E)

### Prueba local (26-jun-2026)

```bash
curl -X POST http://localhost:3003/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"RC1 Test","phone":"8447993983","email":"rc1-test@nexoweb.mx",
       "company":"Nexoweb QA","service":"diseno-desarrollo-web",
       "primary_goal":"presencia-online","message":"Prueba RC1","_honeypot":""}'
```

**Resultado:** HTTP 502 — `"No pudimos procesar tu solicitud"`

**Causa:** Entorno dev no alcanza CRM en red Docker ni Resend (no configurado). La API **ya no falla silenciosamente** — reporta error al usuario si algún canal configurado falla.

### Mejoras RC1 en `/api/contact`

- Rate limiting: 5 req / 15 min / IP
- Honeypot anti-spam (`_honeypot`)
- Sanitización de campos + escape HTML en emails
- Validación de email
- Verificación de respuesta CRM/Telegram/Resend
- Normalización URL CRM (`/api` duplicado)

### E2E en producción (pendiente)

Ejecutar **después del deploy** dentro de la red Docker:

```bash
docker exec nexoweb-v2 wget -qO- --post-data='...' http://127.0.0.1:3003/api/contact
```

Verificar: lead en CRM, email en consultoria@, mensaje Telegram.

---

## Fase 7 — SEO producción

| Elemento | Local RC1 | Producción actual |
|----------|-----------|-------------------|
| robots.txt | ✅ 200 | ✅ |
| sitemap.xml | ✅ 200, 51 URLs | ❌ 404 |
| canonical | ✅ metadataBase | Parcial V1 |
| metadata | ✅ por página | V1 |
| Schema.org | ✅ LocalBusiness | V1 limitado |
| Open Graph | ✅ + imagen dinámica | V1 |
| Twitter Cards | ✅ summary_large_image | V1 |
| favicon | ✅ SVG | ✅ |
| manifest | ❌ No implementado | — |

**Corrección RC1:** Sitemap incluye `/privacidad` y `/terminos`. Títulos duplicados `"X | Nexoweb | Nexoweb"` corregidos.

---

## Fase 8 — Seguridad

| Control | Estado |
|---------|--------|
| Security headers HTTP | ✅ next.config.ts |
| Rate limiting formulario | ✅ 5/15min/IP |
| Validación entradas | ✅ sanitize + email |
| Sanitización email HTML | ✅ escapeHtml |
| Honeypot spam | ✅ |
| Secretos en cliente | ✅ Solo server-side |
| poweredByHeader | ✅ Deshabilitado |

---

## Fase 9 — Performance (Lighthouse localhost)

| Métrica | Desktop (dev) |
|---------|---------------|
| Performance | 73 |
| Accessibility | 97 |
| Best Practices | 100 |
| SEO | 100 |
| LCP | 7.1 s |
| CLS | 0 |
| TBT | 190 ms |

**Nota:** Medido en `next dev` con imágenes Unsplash externas. En producción con CDN/Nginx se espera mejora. CLS excelente. LCP alto por dev mode — re-evaluar post-deploy.

---

## Fase 10 — Checklist de cutover

### Pre-deploy

- [ ] Backup sitio actual: `docker commit nexoweb-site nexoweb-v1-backup-$(date +%Y%m%d)`
- [ ] Backup Nginx: `cp -r /etc/nginx/sites-available /root/backups/nginx-$(date +%Y%m%d)`
- [ ] Backup docker-compose: `cp ~/crm-nexoweb/docker-compose.yml ~/backups/`
- [ ] Backup env vars: documentar en vault (no en git)
- [ ] Exportar `RESEND_API_KEY` en shell del VPS

### Deploy

```bash
# 1. Sync código
cd ~/crm-nexoweb && git pull  # o rsync desde deploy-prod.sh

# 2. Sync assets
./nexoweb-v2/scripts/sync-assets-to-vps.sh

# 3. Rebuild landing
export RESEND_API_KEY=re_xxxx
export TELEGRAM_BOT_TOKEN=xxxx
export TELEGRAM_CHAT_ID=xxxx
cd ~/crm-nexoweb
docker compose up -d --build landing

# 4. Verificar health
docker ps --filter name=nexoweb-v2
docker inspect --format='{{.State.Health.Status}}' nexoweb-v2
```

### Rollback (< 5 min)

```bash
# Revertir docker-compose a nexoweb-site + rebuild
docker compose up -d --build landing  # con imagen V1
```

**Indisponibilidad estimada:** 2–5 minutos (rebuild contenedor landing).

### Post-deploy smoke test

- [ ] https://nexoweb.mx — Home 200
- [ ] /servicios/diseno-desarrollo-web — 200
- [ ] /portafolio/alpha-dent-service — imagen visible
- [ ] /assets/portfolio_alphadent_real.png — 200
- [ ] /sitemap.xml — 200, 51 URLs
- [ ] Formulario contacto — lead en CRM + Telegram + email
- [ ] WhatsApp flotante — enlace correcto
- [ ] SSL válido

---

## Fase 11 — Despliegue

**Estado: NO EJECUTADO** — Requiere acceso SSH al VPS Contabo (`86.48.23.0`).

La infraestructura local está preparada. El cutover debe ejecutarse manualmente siguiendo el checklist de Fase 10.

---

## Cambios realizados en RC1 (código)

| Archivo | Tipo |
|---------|------|
| `app/api/contact/route.ts` | Seguridad + delivery verification |
| `lib/contact-security.ts` | Nuevo — rate limit, escape, CRM URL |
| `components/sections/Contact.tsx` | Bug fix lint + honeypot + empresa required |
| `app/nosotros/page.tsx` | Bug fix ESLint entities |
| `app/sitemap.ts` | SEO — privacidad/términos |
| `app/servicios/[slug]/page.tsx` | SEO — título duplicado |
| `app/portafolio/[slug]/page.tsx` | SEO — título duplicado |
| `app/blog/[slug]/page.tsx` | SEO — título duplicado |
| `next.config.ts` | Headers + compress + cache |
| `proxy.ts` | Lint fix |
| `Dockerfile` | HEALTHCHECK |
| `docker-compose.yml` | Simplificado, sin Postgres |
| `.env.example` | Documentación corregida |
| `scripts/sync-assets-to-vps.sh` | Nuevo |
| `scripts/audit-assets.sh` | Nuevo |
| `crm-nexoweb/docker-compose.yml` | → nexoweb-v2 |
| `crm-nexoweb/deploy-prod.sh` | → nexoweb-v2 |
| `nexoweb-deploy/*` | Paths actualizados |

---

## Riesgos detectados

| Riesgo | Severidad | Mitigación |
|--------|-----------|------------|
| Assets 404 en VPS | Alta | Ejecutar sync-assets antes de cutover |
| RESEND no configurado | Alta | Exportar variable en VPS |
| E2E leads no verificado en prod | Alta | Smoke test post-deploy |
| LCP alto en dev (7.1s) | Media | Re-auditar en producción |
| Sin Google Analytics | Media | Post-RC1 (no bloqueante) |
| Sin manifest PWA | Baja | Post-RC1 |
| Rate limit in-memory | Baja | Suficiente para single container |

---

## Recomendaciones post-RC1

1. Ejecutar cutover en ventana de bajo tráfico (madrugada MX).
2. Configurar GA4/GTM en layout (V2.1).
3. Agregar `site.webmanifest` (V2.1).
4. Monitorear logs: `docker logs -f nexoweb-v2`.
5. Configurar Uptime Kuma para `https://nexoweb.mx`.

---

## Veredicto final

### ❌ NO GO — Cutover a producción

**Justificación técnica:**

El código RC1 está **listo para despliegue** (build, lint, Docker, assets locales, infra actualizada). Sin embargo, **no se cumplen los criterios de GO en producción** porque:

1. **Assets no sincronizados** en VPS (`/assets/` → 404 en nexoweb.mx).
2. **`RESEND_API_KEY` no configurada** en el entorno de deploy.
3. **E2E de leads no verificado** en la red Docker de producción.
4. **Cutover no ejecutado** — el sitio público sigue siendo V1.

### Camino a GO ✅

Completar checklist Fase 10 (≈ 1–2 horas en VPS) → smoke test exitoso → **GO para reemplazo oficial**.

---

*Generado automáticamente — Nexoweb V2 RC1 — 26 junio 2026*
