# Auditoría de Repositorio nexoweb-v2 y Preparación Técnica para NEXOWEB PRESS

**Versión:** v0.1
**Fecha:** 2026-07-24
**Rol:** Auditor Técnico (solo lectura)
**Alcance:** `nexoweb-v2` (primario) y `nexoweb-site` (reconciliación de duplicado)
**Modo:** Auditoría de solo lectura. Ninguna operación git de escritura fue ejecutada. El único archivo nuevo generado es este documento.

---

## 1. Resumen ejecutivo

El sitio institucional público de NexoWeb (`nexoweb.mx`) **sí existe** y vive en `nexoweb-v2`, en el SSD externo (`/Volumes/DESARROLLO NEXOWEB/DESARROLLOS - ECOSISTEMAS/nexoweb-v2`). La auditoría previa que concluyó "no existe sitio institucional" auditó la ubicación incorrecta.

**Hallazgo central (confirmado de forma independiente):** el repositorio tiene su HEAD (`11314d9`) exactamente a la par de `origin/main` en GitHub — cero commits locales sin subir — pero el **árbol de trabajo tiene 97 cambios sin commitear** (48 borrados, 22 modificados, 27 sin rastrear) que representan el código real que fue desplegado a producción el 27 de junio de 2026. La documentación interna del propio repositorio (`docs/reports/WEB-004-PRODUCTION-DEPLOYMENT.md`) confirma que el despliegue a producción se hizo por **`rsync` directo del árbol de trabajo local al VPS**, no mediante `git pull`/CI. Esto significa que **el estado publicado en `nexoweb.mx` no está capturado en ningún commit, ni local ni en GitHub** — solo existe en esta copia local sin commitear (y en su réplica rsync en el VPS, que es un artefacto de despliegue, no un respaldo de control de versiones).

El duplicado `nexoweb-site` (mismo remoto, mismo HEAD) es una copia **desactualizada** de antes del sprint WEB-003 (contiene el archivo muerto `proxy.ts` que WEB-003 documenta como eliminado, y carece de páginas que sí están live en producción: `/nosotros`, `/contacto`, `/opengraph-image`, `/portafolio`).

Sobre preparación para NEXOWEB PRESS: el sitio es una landing de marketing funcional (arquitectura sólida, 0 errores de TypeScript, 0 errores de ESLint) **sin ningún componente de comercio** — no hay autenticación activa, no hay entidades de datos de producto/orden/cliente, no hay pasarela de pago integrada, no hay entrega digital. Existe un plan documentado (no implementado) para integrar el formulario de contacto con Nexoweb HQ. La recomendación preliminar es resolver primero el riesgo crítico de control de versiones antes de construir cualquier capacidad comercial sobre este repositorio.

---

## 2. Alcance y restricciones

- Auditoría **estrictamente de solo lectura** sobre git: únicamente `status`, `log`, `diff`, `show`, `ls-files`, `ls-remote`, `rev-parse`, `branch`. No se ejecutó `add`, `commit`, `stash`, `checkout`, `reset`, `clean`, `rm`, `merge`, `rebase`, `pull` ni `push` en ningún momento.
- No se instalaron dependencias, no se alteraron lockfiles, no se ejecutaron migraciones, no se levantaron servicios.
- Diagnósticos ejecutados: **solo** `tsc --noEmit` y `eslint` (verificados como no destructivos — no escriben archivos). `next build` **no se ejecutó** porque generaría artefactos no controlados en `.next/`.
- No se leyeron ni imprimieron valores de variables de entorno — solo nombres de claves.
- No se intentó conexión SSH ni acceso al VPS Contabo bajo ninguna circunstancia.

---

## 3. Confirmación de identidad del repo

**HECHO VERIFICADO** — `nexoweb-v2` es el código fuente de `nexoweb.mx`, con evidencia concordante en múltiples archivos independientes:

| Archivo | Evidencia |
|---|---|
| `docker-compose.yml` | `container_name: nexoweb_v2_app`, puerto `3003:3003`, `NEXT_PUBLIC_SITE_URL: ${NEXT_PUBLIC_SITE_URL:-https://nexoweb.mx}` |
| `app/layout.tsx:18` | `metadataBase: new URL("https://nexoweb.mx")` |
| `app/layout.tsx:33-43` | OpenGraph/Twitter: "Nexoweb — Empresa de Soluciones Tecnológicas en Saltillo, Coahuila", `url: "https://nexoweb.mx"` |
| `app/sitemap.ts` (sin rastrear) | `const BASE_URL = "https://nexoweb.mx"` con rutas `/servicios`, `/contacto`, `/blog`, `/nosotros`, `/portafolio`, `/privacidad`, `/terminos` |
| `.env.example` | `NEXT_PUBLIC_SITE_URL=https://nexoweb.mx`, `RESEND_FROM=notificaciones@nexoweb.mx` |
| `PRODUCTION_RELEASE_REPORT.md` (sin rastrear) | "Dominio objetivo: https://nexoweb.mx", "Nexoweb V2 RC1" |
| `docs/reports/WEB-004-PRODUCTION-DEPLOYMENT.md` | Confirma despliegue de este código en `86.48.23.0`, DNS `nexoweb.mx → 86.48.23.0` ✅, smoke tests HTTP 200 sobre `https://nexoweb.mx/*` |

No hay evidencia contradictoria. No se examinó el sitio en vivo desde este entorno (sin acceso de red saliente en el sandbox de auditoría); la comparación se basa en la evidencia documental interna del propio repositorio (sección 6).

---

## 4. Estado git y divergencia con producción

**Ruta auditada:** `/Volumes/DESARROLLO NEXOWEB/DESARROLLOS - ECOSISTEMAS/nexoweb-v2`

| Campo | Valor |
|---|---|
| `git rev-parse HEAD` | `11314d95f1af4f055e652fdeab2a3fbdbc2502ff` |
| Rama actual | `main` |
| `git remote -v` | `origin  https://github.com/Mayk2607/nexoweb-site.git` (fetch/push) |
| `git ls-remote origin` | `11314d95f1af4f055e652fdeab2a3fbdbc2502ff  HEAD` y `refs/heads/main` — **idéntico al HEAD local** |
| `git stash list` | vacío |
| `git tag` | vacío |
| `git branch -a` | `* main`, `remotes/origin/HEAD -> origin/main`, `remotes/origin/main` |

**HECHO VERIFICADO:** el HEAD local está exactamente a la par del remoto — cero commits locales pendientes de push. Esto descarta la hipótesis de que el repo simplemente tiene trabajo commiteado sin subir; el problema es exclusivamente de cambios **sin commitear**.

`git log --oneline -15`:
```
11314d9 final: restore label and complete contrast fixes
38e1481 fix: resolve background color conflict causing 'white on white' invisible text
84b6969 fix: complete contrast and high-visibility for all plan comparison cards and columns
d1b40b5 fix: definitive contrast and design polish for plan comparison
39e61b4 fix: absolute contrast fix for mobile and desktop comparison sections
0e19dd3 fix: final contrast and design consistency for plan comparison grid
c227ebb fix: improve contrast and background colors on mobile comparison cards
49d4d72 fix: make plan comparison section responsive with card layout on mobile
4700fb9 fix: definitive badge positioning with proper spacing
91c5ed8 fix: move badge to the left to avoid overlap
98fa8b6 fix: final badge positioning and spacing in pricing card
38e7581 fix: resolve overlapping badge in pricing card
532b9df fix: resolve plan variables scope in comparison table
9bd5357 style: add monthly prices and clarify comparison table
1ccf957 feat: integration of NEXOWEB EXPRESS plan, pricing professionalization, and CRM cleanup
```

`git show --stat HEAD`: el commit `11314d9` (2026-05-07) solo modificó `components/sections/PlanComparison.tsx` (1 línea). **HECHO VERIFICADO:** todo lo desplegado después de esa fecha (páginas nuevas, Docker, Prisma, documentación de sprints) vive exclusivamente en el árbol de trabajo sin commitear.

**Conteo total de cambios sin commitear: 97**

| Tipo | Cantidad |
|---|---|
| Borrados (`D`) | 48 |
| Modificados (`M`) | 22 |
| Sin rastrear (`??`) | 27 |

Este conteo **coincide exactamente** con la evidencia preliminar del contexto (Knowledge Steward), verificado de forma independiente por esta auditoría.

---

## 5. Naturaleza de los cambios sin commitear

### 5.1 Qué se borró respecto al HEAD (48 archivos `D`)

Confirmado con `git ls-files` que estos archivos **están rastreados en HEAD** (fueron commiteados alguna vez) pero ya no existen en el árbol de trabajo:

- **CRM embebido completo** (16 archivos): `app/crm/page.tsx`, `app/crm/layout.tsx`, `app/crm/clients/**`, `app/crm/leads/**`, `app/crm/projects/**`, `app/crm/quotes/page.tsx`, más `components/crm/BillingManager.tsx`, `ProjectGanttEditor.tsx`, `ProjectScopeEditor.tsx`, `Sidebar.tsx`, `Topbar.tsx`.
- **Login** (2 archivos): `app/login/page.tsx`, `app/login/actions.ts`.
- **Cotización** (2 archivos): `app/cotizacion/[id]/page.tsx`, `PrintButton.tsx`.
- **Capa de datos Supabase**: `lib/supabase.ts`, `lib/supabase/client.ts`, `lib/supabase/server.ts`, `middleware.ts` (autenticación de sesión).
- **Secciones comerciales antiguas**: `components/sections/CrmBanner.tsx`, `CustomProjectBanner.tsx`, `Ecosystem.tsx`, `ExpressCard.tsx`, `Niches.tsx`, `PlanComparison.tsx`, `Pricing.tsx`.
- **Migraciones Supabase y scripts de prueba**: `supabase/migrations/*.sql` (2 archivos), `supabase_update_client_code.sql`, `test-query.js`, `test-update.ts`, `scratch.ts`.
- **4 imágenes** de `public/assets/` (headers de servicios de branding/pagos digitales/hosting/diseño web).
- `lib/contact-intent.ts`, `lib/lead-tier.ts`.

`git log -1 -- app/crm/page.tsx` y `app/login/page.tsx` → último commit que los tocó: `7fa39c3` (2026-04-21, "feat(crm): Finalize billing manager..."). `git log -1 -- middleware.ts` → mismo commit. `git log -1 -- lib/supabase.ts` → `f57cf8b` ("feat: implement backend CRM integration with Supabase and Telegram").

**Hallazgo no documentado (INFERENCIA con evidencia parcial):** el commit `1ccf957` ("...CRM cleanup", 2026-05-06) es posterior a `7fa39c3` (2026-04-21) y por su mensaje podría sugerir que ahí se retiró el CRM del repositorio — pero `git log -1 -- app/crm/page.tsx` demuestra que ese archivo **sigue intacto en HEAD** hasta hoy; `1ccf957` no borró estos archivos del historial. Se revisaron los seis documentos de evidencia de sprint (`docs/sprint-evidence/GIT-001.md`, `WEB-PROD-001.md`, `WEB-002.md`, `WEB-003.md`, `docs/reports/WEB-003-FINAL.md`, `WEB-004.md`) y **ninguno documenta la eliminación de `app/crm/*`, `app/login/*`, `components/crm/*`, `middleware.ts` o las migraciones Supabase** — solo documentan la eliminación de un archivo suelto (`proxy.ts`) y variables huérfanas de `.env.local`. **NO DETERMINADO CON LA EVIDENCIA DISPONIBLE:** quién, cuándo y en qué sesión se realizó esta eliminación masiva de 48 archivos en el árbol de trabajo. Es consistente por inferencia con la decisión arquitectónica documentada en WEB-004 ("el CRM antiguo... fue declarado deprecado"), pero esa decisión documentada es sobre el *backend* NestJS/Supabase (`crm-nexoweb`), un repositorio distinto — no sobre el CRM embebido en `nexoweb-v2` en sí.

### 5.2 Qué se añadió sin rastrear (27 archivos/directorios `??`)

Confirmado con `git ls-files -- <ruta>` (conteo 0 en todos los casos → nunca fueron commiteados):

- **Infraestructura de despliegue:** `Dockerfile`, `.dockerignore`, `docker-compose.yml` — nunca estuvieron en git.
- **Páginas públicas en vivo:** `app/nosotros/`, `app/contacto/`, `app/opengraph-image.tsx`, `app/portafolio/page.tsx`, `app/servicios/page.tsx`, `app/sitemap.ts` — **confirmado sin rastrear**, tal como indicaba la evidencia preliminar.
- **Persistencia:** `prisma/` (esquema completo, nunca commiteado).
- **Documentación de sprints:** `docs/` (7 archivos), `PRODUCTION_RELEASE_REPORT.md`, `revision-comercial.md`, `lighthouse-rc1.json`.
- **Componentes/config nuevos:** `components/sections/Faq.tsx`, `HowWeHelp.tsx`, `Testimonials.tsx`, `config/service-extras.ts`, `config/service-images.ts`, `lib/contact-security.ts`, `lib/db.ts`, `lib/events/`.
- **Assets/branding actualizados:** `public/favicon.svg`, `public/nexoweb-logo.svg`, `public/nexoweb-logo-blanco.svg`, `public/robots.txt`.
- `scripts/` (incluye `sync-assets-to-vps.sh`, referenciado en sección 7).

### 5.3 Qué se modificó (22 archivos `M`)

`app/api/contact/route.ts`, `app/blog/[slug]/page.tsx`, `app/blog/page.tsx`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/portafolio/[slug]/page.tsx`, `app/servicios/[slug]/page.tsx`, `components/layout/Footer.tsx`, `Header.tsx`, `components/sections/About.tsx`, `Blog.tsx`, `Contact.tsx`, `Hero.tsx`, `Portfolio.tsx`, `Process.tsx`, `Services.tsx`, `components/ui/FloatingWhatsApp.tsx`, `config/data.ts`, `next.config.ts`, `package-lock.json`, `package.json`.

---

## 6. Correspondencia con producción y reproducibilidad

**HECHO VERIFICADO (evidencia documental interna, no acceso directo al sitio en vivo):** `docs/reports/WEB-004-PRODUCTION-DEPLOYMENT.md` documenta que el 27 de junio de 2026 se sincronizó el código de `nexoweb-v2` **vía `rsync`** (129 archivos, 22 MB) desde esta copia local al VPS, se construyó la imagen Docker **en el VPS** a partir de ese código rsynced, y se ejecutaron smoke tests HTTP contra `https://nexoweb.mx` que confirmaron `200 OK` en: `/`, `/nosotros`, `/servicios` (+ 3 subrutas), `/portafolio` (+ 1 caso), `/blog` (+ 1 post), `/contacto`, `/privacidad`, `/terminos`, `/sitemap.xml`, `/robots.txt`. `/opengraph-image` devolvió `502` (bug conocido de `satori`, documentado como riesgo P1 `OG-001`).

Estas rutas verificadas como live (`/nosotros`, `/contacto`, `/portafolio`, `/opengraph-image`, `/sitemap.xml`) **coinciden exactamente** con los archivos que esta auditoría confirmó como **sin rastrear en git** (sección 5.2). Esto es evidencia concordante: **producción corresponde al árbol de trabajo, no al HEAD commiteado.**

**Verificación adicional (esta auditoría):** ningún archivo del árbol de trabajo tiene fecha de modificación posterior al 27 de junio de 2026 (`find . -newermt "2026-06-27 12:00:00"` → 0 resultados fuera de `node_modules`/`.next`/`.git`). Esto indica que el árbol de trabajo local **no ha cambiado desde el despliegue documentado** — es plausible que siga reflejando lo publicado, pero esto **no puede confirmarse sin acceso al sitio en vivo o al VPS** (fuera del alcance de este entorno de auditoría). Se marca **NO DETERMINADO** la coincidencia byte-a-byte actual; lo que sí es **HECHO VERIFICADO** es que no hay evidencia de deriva local posterior al despliegue documentado.

### Respuesta explícita: ¿el estado publicado está capturado en algún commit?

**No.** Ni en el HEAD local ni en `origin/main` (que son idénticos entre sí). El commit más reciente (`11314d9`, 2026-05-07) predata por semanas la creación de `Dockerfile`, `docker-compose.yml`, `prisma/`, y las páginas `/nosotros`, `/contacto`, `/portafolio`, `/servicios`, `/sitemap.xml` — todas ellas sin rastrear.

### Evaluación de riesgo

**Severidad: ALTA / CRÍTICA.** La única fuente completa y coherente del código en producción es esta única copia local sin commitear, en un SSD externo. El mecanismo de despliegue documentado (`rsync` manual, no `git pull`/CI) significa que **la copia en el VPS tampoco es un respaldo de control de versiones** — es un artefacto de despliegue que puede ser sobrescrito o perdido sin dejar rastro recuperable vía git. Si este SSD sufre una falla, corrupción o pérdida física antes de que el árbol de trabajo se commitee y suba, la reconstrucción del sitio actual dependería enteramente de poder extraer el código directamente del VPS por SSH — una operación no verificada ni garantizada por esta auditoría. **Fundamento:** ausencia total de un commit intermedio que capture cualquiera de los 97 cambios, combinada con un mecanismo de despliegue que no pasa por git.

---

## 7. Correspondencia con VPS Contabo (límites)

**HECHO VERIFICADO (documental, sin acceso SSH):** `docs/reports/WEB-004-PRODUCTION-DEPLOYMENT.md` y `docs/sprint-evidence/INDEX.md` documentan:

- VPS `86.48.23.0`, Ubuntu 24.04.4 LTS, Docker v29.5.2, Docker Compose v5.1.4.
- Dos stacks Docker independientes: `crm-nexoweb` (backend NestJS + frontend CRM + landing `nexoweb-v2` + nginx) y `nexoweb-platform` (HQ + Postgres + Redis).
- Mecanismo de despliegue: `rsync` de código + `docker build` en el propio VPS (no hay pipeline CI/CD ni `git pull` en el servidor, según lo documentado).
- `scripts/sync-assets-to-vps.sh` (sin rastrear en git) usa `SSH_HOST="${NDS_SSH_HOST:-86.48.23.0}"` para sincronizar assets estáticos — confirma el mismo patrón de despliegue manual vía rsync/SSH.
- Certificado SSL de `nexoweb.mx`: válido al momento del reporte (2026-06-27) hasta **2026-08-06**. Dado que hoy es 2026-07-24, quedan **~13 días** — riesgo operativo documentado como `SSL-001`, cuyo estado actual de renovación **NO DETERMINADO** sin acceso SSH.

**NO DETERMINADO CON LA EVIDENCIA DISPONIBLE:** el commit o snapshot exacto actualmente corriendo en el contenedor del VPS a fecha de hoy (2026-07-24). Confirmarlo requeriría acceso SSH al servidor, explícitamente fuera del alcance autorizado de esta auditoría. Tampoco se determinó si ha habido despliegues posteriores al 27 de junio.

---

## 8. Reconciliación del duplicado nexoweb-site

**Ruta:** `/Volumes/DESARROLLO NEXOWEB/DESARROLLOS - ECOSISTEMAS/nexoweb-site`

| Campo | `nexoweb-site` | `nexoweb-v2` |
|---|---|---|
| `git rev-parse HEAD` | `11314d95f1af4f055e652fdeab2a3fbdbc2502ff` | idéntico |
| `remote -v` | `github.com/Mayk2607/nexoweb-site.git` | idéntico |
| Cambios sin commitear | 74 (48 D, 17 M, 9 `??`) | 97 (48 D, 22 M, 27 `??`) |
| Últimos mtimes de archivos | 24–25 jun 2026 | hasta 27 jun 2026 (`docs/`) |

**HECHO VERIFICADO:** mismo remoto, mismo HEAD exacto — ambas copias parten del mismo punto de git. La diferencia está enteramente en el árbol de trabajo.

`nexoweb-site` **carece** de: `app/nosotros/`, `app/contacto/`, `app/opengraph-image.tsx`, `app/portafolio/page.tsx`, `docs/`, `PRODUCTION_RELEASE_REPORT.md` — es decir, carece exactamente de las rutas que la sección 6 confirmó como live en producción (`200 OK` en el smoke test de WEB-004). `nexoweb-site` sí conserva `??` sin rastrear: `.dockerignore`, `Dockerfile`, `app/servicios/page.tsx`, `app/sitemap.ts`, `docker-compose.yml`, `lib/db.ts`, `prisma/`, `public/robots.txt`, y notablemente **`proxy.ts`**, un archivo que `docs/sprint-evidence/WEB-003.md` y `INDEX.md` documentan explícitamente como "eliminado" de `nexoweb-v2` durante el sprint WEB-003 (por ser código muerto — nunca se ejecuta porque Next.js solo reconoce `middleware.ts`).

**Dictamen (HECHO VERIFICADO):** `nexoweb-site` es una instantánea del árbol de trabajo **anterior al sprint WEB-003** (que retiró `proxy.ts`) y por tanto anterior también a WEB-004 (que añadió `/nosotros`, `/contacto`, `/portafolio`, `/opengraph-image`). Es una copia obsoleta, no la fuente de producción.

---

## 9. Dictamen de autoritatividad y saneamiento recomendado

**Dictamen:** `nexoweb-v2` (SSD externo) debe considerarse la copia **autoritativa** para la evolución futura del sitio. El repositorio en GitHub (`Mayk2607/nexoweb-site.git`) está desactualizado respecto a la realidad de producción en 97 cambios — no refleja ni el CRM embebido retirado, ni las páginas nuevas, ni la infraestructura Docker/Prisma actual. `nexoweb-site` (directorio local) es una copia de respaldo obsoleta, sin evidencia de mantenimiento activo desde el 25 de junio de 2026.

**RECOMENDACIÓN (no ejecutada — requiere aprobación y ejecución manual del usuario):**

1. Revisar los 97 cambios de `nexoweb-v2` uno por uno (especialmente confirmar intencionalidad de los 48 borrados del CRM embebido, dado que no hay documentación de sprint que la respalde) antes de commitear.
2. Verificar que `.gitignore` excluye correctamente `.env.local` y cualquier secreto antes de hacer `git add`.
3. Commitear y subir el estado reconciliado a `origin/main`, para que GitHub vuelva a reflejar producción.
4. Etiquetar o archivar explícitamente `nexoweb-site` (por ejemplo, renombrar a `nexoweb-site-ARCHIVED` o mover fuera de la carpeta de proyectos activos) para prevenir confusión futura — sin eliminarlo hasta confirmar que no se necesita como rollback.
5. Evaluar migrar el mecanismo de despliegue de `rsync` manual a un flujo basado en `git` (pull/CI en el VPS) para que el código desplegado quede siempre trazable a un commit.

---

## 10. Arquitectura

**HECHO VERIFICADO.** Next.js `16.2.4` (App Router), React `19.2.4`, TypeScript `5.x`, Tailwind CSS `4` (vía `@tailwindcss/postcss`), Prisma `5.22.0` (cliente generado pero no conectado — ver sección 14), gestor de paquetes `npm` (`package-lock.json` presente). Build: Docker multi-stage (`deps` → `builder` → `runner`), salida `output: "standalone"` en `next.config.ts`, imagen final ~80MB (según `PRODUCTION_RELEASE_REPORT.md`). Orquestación: `docker-compose.yml` de un solo servicio, expuesto en el puerto `3003`, integrado a una red externa `nexoweb_net` compartida con el stack `crm-nexoweb` (nginx reverse proxy, fuera de este repo).

**Nivel de madurez:** **funcional, con deuda significativa** — el código en sí (build, tipos, lint) está limpio, pero la falta total de trazabilidad en control de versiones (sección 4-6) constituye una deuda operativa crítica que antecede cualquier evaluación de madurez de features.

---

## 11. Rutas, layouts y navegación

**HECHO VERIFICADO** (inventario de `app/`, estado actual del árbol de trabajo):

Rutas públicas activas: `/` (home con secciones ancla), `/blog`, `/blog/[slug]`, `/contacto`, `/nosotros`, `/portafolio`, `/portafolio/[slug]`, `/privacidad`, `/terminos`, `/servicios`, `/servicios/[slug]`, `/sitemap.xml` (`app/sitemap.ts`), `/opengraph-image` (edge), `/api/contact` (API route), `favicon.ico`.

Rutas retiradas del árbol de trabajo (aún en HEAD, ver sección 5.1): `/crm/*` (7 subrutas), `/login`, `/cotizacion/[id]`.

Navegación: `Header.tsx`/`Footer.tsx` (ambos modificados en el árbol de trabajo), `menuItems` centralizado en `config/data.ts`. Patrón mixto: la home usa anclas (`/#portafolio`) mientras coexiste una página dedicada `/portafolio` — **INFERENCIA:** posible inconsistencia de navegación entre scroll-anchor y página propia, no verificada visualmente (sin acceso a navegador en este entorno).

**Lugares naturales para integrar PRESS:** ver sección 20.

---

## 12. Sistema visual y experiencia

**HECHO VERIFICADO.** `app/globals.css` define un set mínimo de tokens vía `@theme inline` (`--color-background`, `--color-foreground`, fuentes Geist) — no es un design system extenso con escalas de color/espaciado documentadas. `components/ui/` contiene **un solo componente genérico** (`FloatingWhatsApp.tsx`); el resto de componentes en `components/sections/` son específicos de cada sección de página, no átomos reutilizables. No se encontró librería de componentes (`shadcn/ui`, Radix, etc.) en `package.json`. **NO DETERMINADO** el estado de responsividad exhaustivo por breakpoint (fuera de proporcionalidad de esta auditoría sin navegador). Accesibilidad: `docs/sprint-evidence/WEB-002.md` documenta 8 elementos con contraste insuficiente WCAG AA (`P2-001`, `CSS-001` en backlog) — **NO DETERMINADO** si fueron corregidos, no aparecen en la lista de "resuelto" de WEB-003/WEB-004.

**Reutilización para PRESS:** limitada — habría que construir componentes de catálogo/producto desde cero; los tokens Tailwind existentes son extensibles pero insuficientes por sí solos.

---

## 13. Autenticación

**HECHO VERIFICADO.** En el HEAD commiteado existía autenticación basada en Supabase (`middleware.ts` usando `@supabase/ssr`, con `app/login/*` y protección de `app/crm/*`) — confirmado leyendo el contenido de `git show HEAD:middleware.ts`. **En el árbol de trabajo actual (el que corresponde a producción) esta autenticación fue eliminada por completo**: no hay `@supabase/ssr` ni `@supabase/supabase-js` en las dependencias actuales de `package.json`, y los archivos correspondientes están borrados (sección 5.1).

**Estado actual: AUSENTE.** No existe ningún mecanismo de sesión, login o protección de rutas en el código que corresponde a producción.

---

## 14. Persistencia y modelo de datos

**HECHO VERIFICADO.** `prisma/schema.prisma` (sin rastrear en git) define únicamente dos modelos: `BlogPost` y `PortfolioCase` — ambos entidades de contenido simple (título, slug, contenido/resultado, imagen), sin relación con comercio. `DATABASE_URL` **no está definida** en `.env.local` (confirmado por ausencia) y aparece comentada en `.env.example` con la nota "reservado para CMS futuro". `lib/db.ts` (sin rastrear) instancia un `PrismaClient`, pero `grep` sobre `app/` no encontró ningún import ni uso de `prisma` o `lib/db` — **el cliente Prisma está scaffolded pero no conectado a ningún runtime activo.**

**Entidades reutilizables para comercio (producto, orden, licencia, descarga, cliente): AUSENTES.**

---

## 15. Contenido e i18n

**HECHO VERIFICADO.** Todo el contenido comercial (servicios, portafolio, blog, FAQs, extras) está hardcodeado en archivos TypeScript: `config/data.ts`, `config/service-extras.ts`, `config/service-images.ts` — no hay MDX, no hay CMS headless, no hay integración con Notion en este repositorio. No se encontró librería de i18n (`next-intl`, `i18next`) en `package.json` — el sitio es monolingüe (español, hardcodeado). SEO técnico: sólido — `app/sitemap.ts` dinámico (deriva rutas de `config/data.ts`), `metadataBase` + OpenGraph + Twitter cards en `app/layout.tsx`, `public/robots.txt`, JSON-LD `LocalBusiness` (referenciado en `PRODUCTION_RELEASE_REPORT.md`), `app/opengraph-image.tsx` (con bug 502 conocido, ver sección 19).

---

## 16. Comercio y pagos

**HECHO VERIFICADO.** No se encontró ninguna pasarela de pago integrada — no hay dependencias de Stripe, MercadoPago, PayPal ni similares en `package.json`, ni código de checkout/carrito/órdenes/cupones/suscripciones en `app/`, `components/` o `lib/`. Las únicas menciones a pasarelas de pago (`config/data.ts:105,115`, `config/service-extras.ts:96,1895`) son **copy comercial describiendo e-commerce como un servicio que NexoWeb ofrece a sus clientes** ("Integramos Stripe, MercadoPago y PayPal como opciones estándar") — no una integración real de este sitio. Se distingue explícitamente esta diferencia por instrucción del alcance. **No se selecciona proveedor** — no aplica.

**Estado: AUSENTE.**

---

## 17. Entrega y almacenamiento

**HECHO VERIFICADO.** No se encontraron SDKs de almacenamiento de objetos (`@aws-sdk/*`, S3, R2, Supabase Storage) en las dependencias actuales. Los assets estáticos (`public/assets/`) se sirven vía volumen de nginx montado desde el host (`/var/www/nexoweb-assets/`, documentado en `WEB-004-PRODUCTION-DEPLOYMENT.md`) — un mecanismo apto para imágenes de marketing, no para entrega controlada de productos digitales (sin URLs firmadas, sin control de acceso, sin manejo de formatos PDF/ZIP).

**Estado: AUSENTE.**

---

## 18. Integración con backend/CRM/HQ

**HECHO VERIFICADO.** `app/api/contact/route.ts` implementa una entrega tri-canal del formulario de contacto:

1. **CRM** — `POST {CRM_API_URL}/api/public/leads` con header `x-nexoweb-public-ingest-key`, apuntando al backend NestJS del stack `crm-nexoweb` (`http://backend:3010` en Docker interno). Según `WEB-004-PRODUCTION-DEPLOYMENT.md`, este canal está **deshabilitado en producción** (`CRM_API_URL` vacío) porque el proyecto Supabase del backend (`voahlrfdwndprdamiyky`) está pausado.
2. **Email** — vía Resend SDK; inactivo porque `RESEND_API_KEY` está ausente en `.env.local`.
3. **Telegram** — único canal activo confirmado en el smoke test de WEB-004.

`docs/reports/WEB-004-PRODUCTION-DEPLOYMENT.md` documenta un **plan de migración no implementado** (explícitamente marcado "No implementar todavía. Prioridad: V2.1") hacia Nexoweb HQ (`hq.nexoweb.mx`, parte del monorepo `nexoweb-platform`): crear un endpoint `POST /api/internal/ingest-lead` en HQ, autenticado con header `X-Nexoweb-Internal`, mapeando el lead a los modelos `Prospect`/`ProspectContact` de HQ. `grep` sobre el código actual confirma que **este plan no está implementado**: no existen referencias a `HQ_API_URL` ni `HQ_INGEST_SECRET` en el código.

**Evaluación de alternativas (sin decidir, por instrucción):**

- **Opción A — PRESS con dominio de datos propio:** menor acoplamiento y lanzamiento más rápido de forma aislada, pero duplica infraestructura (auth, catálogo, órdenes) que el ecosistema podría resolver de forma centralizada.
- **Opción B — PRESS apoyado en HQ/CRM existente:** aprovecha el patrón de autenticación interna ya establecido (`X-Nexoweb-Internal`) y el modelo de datos de HQ, pero introduce una dependencia dura hacia un sistema que a fecha del último reporte (27-jun-2026) reportaba estado `"degraded"` (`backup.ok: false`) y cuya integración de leads con `nexoweb-v2` **todavía no está construida** — es plan, no código.

**NO DETERMINADO CON LA EVIDENCIA DISPONIBLE:** si HQ (`nexoweb-platform`) expone hoy capacidades de catálogo/producto/orden reutilizables para PRESS — auditar eso requeriría examinar ese repositorio, fuera del alcance de esta auditoría sobre `nexoweb-v2`.

---

## 19. Calidad y deuda

**HECHO VERIFICADO (diagnósticos ejecutados, seguros por no escribir archivos):**

- `tsc --noEmit` → **0 errores.**
- `eslint .` → **0 errores, 1 warning** preexistente: `no-img-element` en `app/servicios/[slug]/page.tsx:153` — coincide exactamente con el hallazgo `UX-001` ya documentado y aceptado en `WEB-004-PRODUCTION-DEPLOYMENT.md` ("Riesgos aceptados").
- Se verificó que ambos diagnósticos no alteraron el árbol de trabajo (`git status --short` se mantuvo en 97 líneas antes y después).

**NO ejecutado (por regla de seguridad):** `next build` — generaría artefactos no controlados en `.next/`. El `PRODUCTION_RELEASE_REPORT.md` documenta que al 26-jun-2026 el build pasaba con "49 rutas, 0 errores"; **NO DETERMINADO** si eso sigue siendo cierto hoy sin ejecutar el build. `npm audit` — requeriría red, omitido.

**Código muerto detectado (hallazgo nuevo, no mencionado en la documentación de sprints revisada):** `lib/db.ts` y `prisma/schema.prisma` existen y están completos, pero no tienen ningún consumidor en `app/` — es infraestructura de datos scaffolded pero inactiva.

**Deuda mayor:** los 97 cambios sin commitear (secciones 4-6) constituyen, con diferencia, la deuda técnica más crítica del repositorio — antecede en severidad a cualquier hallazgo de código.

---

## 20. Alternativas de ubicación para PRESS

| Alternativa | Encaje | Complejidad | Aislamiento | Dependencia de backend | Observación |
|---|---|---|---|---|---|
| **a) Subruta `/press`** dentro de `nexoweb-v2` | Reutiliza header/footer/tokens existentes | Baja de integrar, pero requiere construir catálogo/producto desde cero | Ninguno — mismo release, mismo contenedor | Ninguna obligatoria | Acopla el ciclo de release de PRESS al del sitio de marketing |
| **b) Grupo de rutas con layout propio** (`app/(press)/...`) | Similar a (a) con mejor separación de layout | Media | Parcial (código separado, mismo deploy) | Ninguna obligatoria | Sigue compartiendo dominio raíz y contenedor Docker |
| **c) Subdominio `press.nexoweb.mx`** como app Next.js separada | Requiere reconstruir navegación/tokens compartidos (no existe paquete de diseño compartido hoy) | Alta — nueva infra Docker/nginx/DNS/SSL en el VPS | Alto — ciclo de release independiente | Puede integrarse con HQ sin acoplar el release del sitio marketing | Mayor esfuerzo de infraestructura pero menor riesgo de romper el sitio institucional |
| **d) Storefront externo enlazado** (p. ej. plataforma de venta de productos digitales de terceros) | Mínimo esfuerzo de integración (solo un enlace) | Muy baja | Total | Ninguna | Cede control de marca/checkout/datos de cliente a un tercero; no se integra con HQ |

**RECOMENDACIÓN PRELIMINAR (marcada como tal, no vinculante):** dado que hoy no existen auth, comercio ni entrega digital en `nexoweb-v2` (secciones 13, 16, 17), y que el repositorio tiene una deuda crítica de control de versiones sin resolver (secciones 4-6), la ruta de menor riesgo a corto plazo es **(d)** o una versión muy acotada de **(b)** que solo aloje catálogo/landing estático enlazando a un checkout externo — evitando construir infraestructura de pagos/auth desde cero sobre un repositorio cuyo estado de producción aún no está capturado de forma segura en control de versiones.

---

## 21. Nivel de preparación

No promediado — cada dimensión con su propio bloqueador:

| Dimensión | Nivel | Bloqueador principal |
|---|---|---|
| Arquitectura | **NEEDS PREPARATION** | Base Next.js/TS/Docker sólida, pero deuda de higiene git crítica |
| Navegación | **NEEDS PREPARATION** | Estructura de rutas clara; sin patrón de catálogo/producto |
| Diseño | **NEEDS PREPARATION** | Tokens Tailwind mínimos; sin librería de componentes reutilizables |
| Autenticación | **MAJOR REFACTORING** | Ausente; el único precedente (Supabase) fue retirado deliberadamente |
| Datos | **MAJOR REFACTORING** | Sin entidades de comercio; Prisma scaffolded sin conexión |
| Contenido | **READY** (estático simple) / **NEEDS PREPARATION** (si se requiere catálogo dinámico) | Patrón `config/data.ts` ya probado en producción |
| Comercio | **MAJOR REFACTORING** | Inexistente |
| Pagos | **MAJOR REFACTORING** | Inexistente; sin selección de proveedor (fuera de alcance) |
| Entrega digital | **MAJOR REFACTORING** | Inexistente |
| Integración backend/CRM/HQ | **NEEDS PREPARATION** | Patrón de integración con HQ ya documentado/planeado, no implementado |
| Operación (control de versiones/despliegue) | **MAJOR REFACTORING — bloqueador crítico** | Estado de producción no capturado en git; despliegue manual vía rsync |

---

## 22. Backlog de alto nivel

**Bloqueadores**

| Objetivo | Dependencia | Prioridad | Riesgo si se omite |
|---|---|---|---|
| Reconciliar y commitear los 97 cambios del árbol de trabajo | Revisión manual de cada borrado (especialmente CRM embebido, sin documentación de respaldo) | Alta | Pérdida irrecuperable del código de producción si falla el SSD local |
| Confirmar/formalizar el mecanismo de despliegue (rsync manual → pipeline trazable) | — | Alta | Despliegues no auditables, imposibles de reproducir |
| Archivar o clarificar el destino de `nexoweb-site` | Decisión del usuario | Baja | Confusión futura sobre cuál copia es la real |

**Habilitadores**

| Objetivo | Dependencia | Prioridad | Riesgo si se omite |
|---|---|---|---|
| Decidir Opción A vs B de integración de datos para PRESS (sección 18) | Auditoría de capacidades actuales de HQ (fuera de este alcance) | Alta | Reconstrucción de infraestructura duplicada o acoplamiento prematuro a un sistema no listo |
| Si se opta por B: implementar `/api/internal/ingest-lead` en HQ y resolver `HQ_TENANT_ID` | Ya documentado como pendiente en WEB-004 | Media | El formulario de contacto actual permanece dependiente de un CRM deprecado |
| Resolver el canal de contacto actual (RESEND_API_KEY o migración a HQ) | — | Media | Deuda operativa preexistente que PRESS heredaría si se construye sobre el mismo sitio |

**Capacidades comerciales** (una vez decidido el enfoque de datos)

| Objetivo | Dependencia | Prioridad | Riesgo si se omite |
|---|---|---|---|
| Modelo de datos de producto/orden/cliente/licencia | Decisión A vs B | Alta | Sin esto no hay comercio posible |
| Selección e integración de pasarela de pago | Fuera de alcance de esta auditoría | Alta | — |
| Mecanismo de entrega digital (almacenamiento + control de acceso) | Modelo de datos | Media | Imposible entregar productos digitales de forma segura |
| Auth de clientes (si PRESS requiere área privada de descargas) | Decisión A vs B | Media | Sin esto no hay control de acceso a contenido comprado |

**Mejoras** (ya documentadas en sprints previos, backlog V2.1 de `WEB-004`)

| Objetivo | Prioridad | Riesgo si se omite |
|---|---|---|
| Reparar `opengraph-image` (502, bug `satori`) | P1 (`OG-001`) | Previews rotas al compartir en redes sociales |
| Configurar `RESEND_API_KEY` | P2 (`ENV-001`) | Canal de email de leads permanece inactivo |
| Corregir 8 issues de contraste WCAG AA | P3 (`CSS-001`) | Deuda de accesibilidad heredada por cualquier página nueva |
| Verificar renovación automática del certificado SSL (expira 2026-08-06, ~13 días desde hoy) | Urgente (`SSL-001`) | Caída de HTTPS en `nexoweb.mx` si `certbot` no renueva |

---

## 23. Riesgos y NO DETERMINADO

**Riesgo crítico:** producción no capturada en ningún commit (sección 6).
**Riesgo alto:** eliminación no documentada de 48 archivos (CRM embebido, auth, migraciones) sin registro de sprint que la respalde (sección 5.1).
**Riesgo temporal:** certificado SSL de `nexoweb.mx` expira en ~13 días desde la fecha de esta auditoría; estado de renovación no verificable sin SSH.

**Áreas NO examinadas o parciales:**
- Estado real del sitio en vivo `nexoweb.mx` — no se accedió a él desde este entorno; toda correspondencia con producción se basa en documentación interna del repo.
- Contenido exacto desplegado en el VPS a la fecha de hoy — requiere SSH, fuera de alcance.
- Auditoría de vulnerabilidades de dependencias (`npm audit`) — requiere red, omitida.
- Resultado de `next build` actual — omitido por generar artefactos no controlados.
- Capacidades actuales de `nexoweb-platform`/HQ para servir de backend de PRESS — repositorio fuera de este alcance.
- Verificación visual/responsive del sistema de diseño — sin navegador disponible en este entorno.
- Autoría y fecha exacta de la eliminación del CRM embebido en el árbol de trabajo.

---

## 24. Recomendación preliminar

1. **Inmediato:** tratar la reconciliación de git (sección 9) como prioridad máxima, antes de iniciar cualquier trabajo de PRESS — es un riesgo de pérdida de datos, no solo de higiene.
2. **Antes de construir PRESS:** decidir explícitamente Opción A vs B de integración de datos (sección 18), ya que determina si se construye infraestructura de comercio nueva o se depende de HQ.
3. **Para el lanzamiento inicial de PRESS:** dado el estado actual (sin auth, sin comercio, sin entrega digital), considerar la alternativa de menor riesgo — (d) storefront externo enlazado, o una subruta (b) muy acotada sin checkout propio — mientras se resuelven los bloqueadores de las secciones 21-22.

---

## 25. Autoverificación

- Todo hallazgo marcado **HECHO VERIFICADO** cita el archivo, ruta o comando/salida específico que lo respalda.
- Las inferencias (p. ej., relación entre la decisión arquitectónica de WEB-004 y la eliminación del CRM embebido) están explícitamente marcadas como **INFERENCIA**, no como hecho.
- Los puntos sin evidencia suficiente están marcados **NO DETERMINADO CON LA EVIDENCIA DISPONIBLE** y listados consolidados en la sección 23, junto con lo que se necesitaría para resolverlos (típicamente: acceso SSH al VPS, acceso de red al sitio en vivo, o auditoría del repositorio `nexoweb-platform`).

---

## 26. Evidencias consultadas

- `git rev-parse HEAD`, `git remote -v`, `git ls-remote origin`, `git log --oneline -15`, `git status --short`, `git stash list`, `git tag`, `git branch -a` (ambos repos).
- `git ls-files -- <ruta>` sobre 14 rutas clave para determinar estado rastreado/sin rastrear.
- `git log -1 --oneline -- <archivo>` sobre `app/crm/page.tsx`, `app/login/page.tsx`, `components/crm/Sidebar.tsx`, `middleware.ts`, `lib/supabase.ts`.
- `git show --stat HEAD`, `git show HEAD:middleware.ts`.
- Lectura completa: `docker-compose.yml`, `Dockerfile`, `next.config.ts`, `.env.example`, `app/layout.tsx` (extracto), `app/sitemap.ts`, `package.json`, `prisma/schema.prisma`, `lib/db.ts`, `app/api/contact/route.ts`, `README.md`.
- Lectura completa: `docs/sprint-evidence/GIT-001.md`, `INDEX.md`, `WEB-002.md`; `docs/reports/WEB-004-PRODUCTION-DEPLOYMENT.md`; extracto de `PRODUCTION_RELEASE_REPORT.md`.
- Diagnósticos ejecutados: `node_modules/.bin/tsc --noEmit`, `node_modules/.bin/eslint .`.
- Búsquedas dirigidas (`grep`) por: referencias a `nexoweb.mx`/dominio, `86.48.23.0`/Contabo, pasarelas de pago, SDKs de almacenamiento de objetos, librerías de i18n, librerías de autenticación, variables de entorno (solo nombres).
- Comparación de fechas de modificación de archivos (`find -newermt`, `stat`) entre `nexoweb-v2` y `nexoweb-site`.

---

## 27. Estado del repositorio al finalizar

- `git status --short` en `nexoweb-v2`: **97 líneas antes y después de la auditoría** (idéntico) — ninguno de los 97 cambios preexistentes fue alterado, revertido, stasheado ni commiteado.
- `git status --short` en `nexoweb-site`: **74 líneas**, sin ninguna acción tomada sobre este directorio (solo lectura).
- Ningún archivo de código o configuración fue modificado.
- No se generaron artefactos no controlados (`tsc --noEmit` y `eslint` no escriben archivos; se verificó el conteo de `git status` antes/después de ejecutarlos).
- No se instaló ninguna dependencia, no se hizo push, no se expuso ningún valor de secreto (solo nombres de variables fueron leídos, nunca sus valores).
- **Único archivo creado por esta auditoría:** `docs/reports/AUDITORIA_nexoweb-v2_ESTADO_Y_PREPARACION_PRESS_v0.1.md` (este documento).

---

## Cierre obligatorio

**(A)** Repositorio/copia auditados: `nexoweb-v2` (primario) en `/Volumes/DESARROLLO NEXOWEB/DESARROLLOS - ECOSISTEMAS/nexoweb-v2`; `nexoweb-site` (reconciliación) en la misma ubicación del SSD.

**(B)** Rama `main` en ambos. `git status --short` inicial y final de `nexoweb-v2`: **97 líneas** (48 D, 22 M, 27 `??`), sin cambios entre inicio y fin de la auditoría. `nexoweb-site`: **74 líneas** (48 D, 17 M, 9 `??`), sin tocar.

**(C)** Archivo creado: `docs/reports/AUDITORIA_nexoweb-v2_ESTADO_Y_PREPARACION_PRESS_v0.1.md`.

**(D)** Diagnósticos ejecutados: `tsc --noEmit` (0 errores), `eslint .` (0 errores, 1 warning conocido). Omitidos: `next build` (generaría artefactos no controlados), `npm audit` (requiere red).

**(E)** Identidad `nexoweb-v2` ↔ `nexoweb.mx`: **confirmada** con evidencia concordante en `docker-compose.yml`, `app/layout.tsx`, `app/sitemap.ts`, `.env.example`, `PRODUCTION_RELEASE_REPORT.md` y el reporte de despliegue `WEB-004`.

**(F)** Producción corresponde al **árbol de trabajo, no al HEAD commiteado**. El estado publicado **no está capturado en ningún commit**, ni local ni en GitHub — riesgo clasificado como CRÍTICO.

**(G)** `nexoweb-v2` es la copia autoritativa; `nexoweb-site` es una instantánea obsoleta (anterior al sprint WEB-003), preservada sin mantenimiento activo desde el 25-jun-2026.

**(H)** Preparación global para PRESS: la arquitectura base es sólida (**NEEDS PREPARATION**), pero auth, datos de comercio, pagos y entrega digital están **ausentes (MAJOR REFACTORING)**; el bloqueador operativo más severo es la falta de control de versiones del propio sitio, previo a cualquier trabajo de PRESS.

**(I)** Alternativas de ubicación evaluadas: subruta `/press`, grupo de rutas con layout propio, subdominio `press.nexoweb.mx`, storefront externo enlazado — ver matriz comparativa en sección 20.

**(J)** Recomendación preliminar: resolver primero el riesgo de control de versiones; decidir explícitamente el modelo de integración de datos (dominio propio vs. HQ) antes de construir; considerar la alternativa de menor riesgo (storefront externo o subruta muy acotada) para un primer lanzamiento de PRESS.

**(K)** Se confirma que **no se commiteó, stasheó, revirtió ni modificó** ningún cambio preexistente; no se instaló nada; no se hizo push; no se expusieron valores de secretos (solo nombres de variables).

**(L)** Lista exacta de archivos creados o modificados por esta auditoría: **únicamente** `docs/reports/AUDITORIA_nexoweb-v2_ESTADO_Y_PREPARACION_PRESS_v0.1.md`.
